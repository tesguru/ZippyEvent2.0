
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import Layout from '../Components/Layout';
import Eventdetails from '../Components/Steps/Eventdetails';
import Eventpayment from '../Components/Steps/Eventpayment';
import Eventquestion from '../Components/Steps/Eventquestion';
import Steptitle from '../Components/Steps/Steptitle';
import Eventsubsection from '../Components/Steps/Eventsubsection';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { login } from '../data/local/reducers/Authorizationreducer';
import {eventDetailsSchema, eventPaymentSchema, eventSubsectionSchema, eventQuestionSchema } from '../Utils/Validation';
import { createEvent } from '../data/local/reducers/Miscellaneousslicereducer';
import { showErrorToast, showSuccessToast } from '../Utils/api-utils';
import { apiClient, axiosInstance } from '../data/remote/clients/Apiclient';
import Spinnerloader from '../Components/Spinnerloader';
import { NavLink, useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const dispatch = useDispatch();
  const [loading, isloading] = useState(false)
  const navigate = useNavigate();
  const loginProfile = useSelector((state) => state.auth.loginProfile);
  const [page, setPage] = useState(1);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Return empty string if invalid date
    
    // Format the date to "Month Day, Year" format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  const [formData, setFormData] = useState({
    event_name: "",
    start_date: "",
    end_date: "",
    payment: "",
    general_payment: "",
    category_name: [],
    category_amount: [],
    event_image: null,
    event_category_name: [],
    event_category_date: [],
    event_category_time: [],
    event_category_description: [],
    question: [],
    question_type: [],
    option: [],
    question_required: []
  });
  const [eventId, setEventId] = useState(`ZW${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`);
  const getValidationSchema = (activeStep) => {
    switch (activeStep) {
      case 1:
        return eventDetailsSchema;
      case 2:
        return eventPaymentSchema;
      case 3:
        return eventSubsectionSchema;

      case 4:
        return eventQuestionSchema;
      default:
        return Yup.object();
    }
  };
  const steps = [
    "Event Details",
    "Event Payment",
    "Event Subsection",
    "Event Questions"
  ];
  const methods = useForm({
    defaultValues: {
      event_name: "",
      event_description: "",
      event_image: "",
      start_date: "",
      end_date: "",
      payment: false,
      general_payment: undefined,
      general_amount:"",
      categories: [{
        category_name: "1000",
        category_amount: "2000",
      }],
      subsection: "",
      sections: [
        {
          sectionName: "",
          eventName: "",
          eventDate: "",
          eventTime: "",
        }
      ],
      question_list: [
        {     
          question_id: "",
          question: "",
          option: [{ value: '' }],
          question_required: false
        }
      ]
    },
    mode: 'onChange',
    resolver: yupResolver(getValidationSchema(page)),
  });

  const onSubmit = async (data) => {
    console.log(data);

    if (page === steps.length) {
      try {
        isloading(true);
        const formDataToSubmit = new FormData();
  
        // Format the start and end dates
       // Format the start and end dates
const formattedStartDate = formatDate(data.start_date);
const formattedEndDate = formatDate(data.end_date);

formDataToSubmit.append('event_start_date', formattedStartDate);
formDataToSubmit.append('event_end_date', formattedEndDate);
formDataToSubmit.append('event_description', data.event_description);
formDataToSubmit.append('event_image_url', data.event_image || '');
formDataToSubmit.append('event_name', data.event_name);
formDataToSubmit.append('has_sub_event', data.has_sub_event ? 'yes' : 'no');
formDataToSubmit.append('sub_event_choice', data.sub_event_choice || '');
formDataToSubmit.append('has_payment', data.has_payment ? 'yes' : 'no');
formDataToSubmit.append('general_payment', data.general_payment ? 'yes' : 'no');
formDataToSubmit.append('general_payment_amount', data.general_payment_amount || '');
formDataToSubmit.append('access_code', "Nil");
formDataToSubmit.append('event_id', eventId);

// Handling questions
data.question_list.forEach((question, index) => {
  formDataToSubmit.append(`question_list[${index}][question_id]`, question.question_id);
  formDataToSubmit.append(`question_list[${index}][question]`, question.question);
  formDataToSubmit.append(`question_list[${index}][is_required]`, question.is_required ? 'yes' : 'no');
  question.option.forEach((opt, optIndex) => {
    formDataToSubmit.append(`question_list[${index}][option][${optIndex}]`, opt);
  });
});

// Handling event payment categories
data.categories.forEach((payment, index) => {
  formDataToSubmit.append(`event_payment[${index}][category_name]`, payment.category_name);
  formDataToSubmit.append(`event_payment[${index}][category_amount]`, payment.category_amount);
});


// Handling sub-events
data.sections.forEach((subEvent, index) => {
  formDataToSubmit.append(`sub_event[${index}][sub_event_name]`, subEvent.sub_event_name);
  formDataToSubmit.append(`sub_event[${index}][sub_event_description]`, subEvent.sub_event_description);
  formDataToSubmit.append(`sub_event[${index}][sub_event_date]`, formatDate(subEvent.sub_event_date));
  formDataToSubmit.append(`sub_event[${index}][sub_event_time]`, subEvent.sub_event_time || '');
});

// Additional fields
formDataToSubmit.append('username', loginProfile?.result?.username);

  
        console.log(formDataToSubmit);
  
        // Convert FormData to object for debugging
        const formDataToObject = (formData) => {
          const obj = {};
          for (let [key, value] of formData.entries()) {
            obj[key] = value;
          }
          return obj;
        };
        
        // Example usage
        const formDataObject = formDataToObject(formDataToSubmit);
        console.log(formDataObject);
      const response = await axiosInstance.post('zippy_event/create_event', formDataToSubmit);

   

    // If response is successful
    const result = await response.data
    if (result.status_code === '0') {
        showSuccessToast('Account updated successfully');
     navigate('/events');
    } else if (result.status_code === '1') {
        if (result.result) {
            // Extract all error messages from the result object
            const errorMessages = Object.values(result.result);
            // Display only the first error message
            const firstErrorMessage = errorMessages[0] || result.message;
            showErrorToast(firstErrorMessage);
        } else {
            // Display the general error message if no specific result errors
            showErrorToast(result.message || 'Account update failed');
        }
      }
     
      } catch (error) {
        console.error('Error creating event', error);
      }
      finally{
        isloading(false);
      }
      
    } else {
      setPage(page + 1);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return <Eventdetails formData={formData} setFormData={setFormData} methods={methods} />;
      case 2:
        return <Eventpayment formData={formData} setFormData={setFormData} methods={methods} />;
      case 3:
        return <Eventsubsection formData={formData} setFormData={setFormData} methods={methods} />;
      case 4:
        return <Eventquestion formData={formData} setFormData={setFormData} methods={methods} />;
      default:
        return <Eventdetails formData={formData} setFormData={setFormData} methods={methods} />;
    }
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  console.log(methods.formState.errors)

  return (
    <Layout>
      <Spinnerloader open={loading} />
      <div className="mx-auto block w-[96%] mt-3 px-3 rounded-lg bg-gray-100 p-6 shadow-4">
        <h4 className='pb-2 text-2xl text-black font-extrabold'>Create Events</h4>
        <h6 className="text-xl font-semibold italic mb-6">Complete the form to create an event</h6>
        <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center mb-9 bg-zippy text-white border border-gray-200 rounded-lg shadow-sm sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
          {steps.map((step, index) => (
            <Steptitle
              key={index}
              pageNumber={index + 1}
              pageTitle={step}
              currentStep={page}
            />
          ))}
        </ol>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {renderStepContent(page)}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              disabled={page === 1}
              onClick={handlePrev}
              className={`px-4 py-2 bg-gray-500 text-white rounded-2xl ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Previous
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-zippy text-white rounded-2xl`}
            >
              {page === steps.length ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateEvent;

