import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { createEvent } from '../data/local/reducers/Authorizationreducer';

const CreateEvent = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
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
      event_image: null,
      start_date: "",
      end_date: "",
      payment: false,
      general_payment: undefined,
      general_amount: undefined,
      categories: [{
        category_name: "",
   category_amount: undefined,
   }],
      subsection: "",
      sections: [{
        sectionName: "",
        eventName: "",
        eventDate: "",
        eventTime: "",
      }],
      questions:[{     
        question: "",
        question_type: "",
        option: "",
        question_required: ""
      }]
    },
    mode: 'onChange',
    resolver: yupResolver(getValidationSchema(page)),
  });

  const onSubmit = async (data) => {
    console.log(data);
    // setFormData({ ...formData, ...data });
    if (page === steps.length) {
      // Final API submission
      try {
        const formDataToSubmit = new FormData();
      
        formDataToSubmit.append('event_start_date', data.start_date);
        formDataToSubmit.append('event_end_date', data.end_date);
        formDataToSubmit.append('event_name', data.event_name);
        formDataToSubmit.append('event_image_url', data.event_image);
        formDataToSubmit.append('event_description', data.event_description);
        formDataToSubmit.append('individual_account', data.individual_account);
        formDataToSubmit.append('access_code', "No");
        formDataToSubmit.append('general_payment', data.general_payment ? "yes" : "no");
        formDataToSubmit.append('event_category', data.event_category ? 'yes' : 'no');
        formDataToSubmit.append('payment', data.payment ? 'yes' : 'no');
        formDataToSubmit.append('sub_event_choice', data.sub_event_choice);
        formDataToSubmit.append('has_sub_event', data.subsection ? 'yes' : 'no');
        formDataToSubmit.append('has_payment', data.payment ? 'yes' : 'no');
        formDataToSubmit.append('event_image', data.event_image[0]);
        formDataToSubmit.append('event_id', eventId);
        formDataToSubmit.append('username', 'current_username'); // Replace with actual username
      
        if (data.general_payment === 'yes') {
          formDataToSubmit.append('general_payment_amount', data.general_payment_amount);
        } else {
          data.categories.forEach((category, index) => {
            formDataToSubmit.append(`category_name[${index}]`, category.name);
            formDataToSubmit.append(`category_amount[${index}]`, category.amount);
          });
        }
      
        if (data.sections) {
          data.sections.forEach((section, index) => {
            formDataToSubmit.append(`event_category_name[${index}]`, section.eventName);
            formDataToSubmit.append(`event_category_date[${index}]`, section.eventDate);
            formDataToSubmit.append(`event_category_time[${index}]`, section.eventTime);
            formDataToSubmit.append(`event_category_description[${index}]`, section.message);
          });
        }
      
        data.questions.forEach((question, index) => {
          formDataToSubmit.append(`question[${index}]`, question.question);
          formDataToSubmit.append(`question_list`, question.question);
          formDataToSubmit.append(`question_type[${index}]`, question?.question_type ?? "");
          formDataToSubmit.append(`question_required[${index}]`, question.question_required ? 'yes' : 'no');
          if (question.question_type === "single_choice" || question.question_type === "multiple_choice") {
            formDataToSubmit.append(`option[${index}]`, question.option.join('|'));
          }
        });
      
        dispatch(createEvent(formDataToSubmit));
      } catch (error) {
        console.error('Error creating event', error);
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
