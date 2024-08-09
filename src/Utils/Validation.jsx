import * as Yup from "yup";
import { phoneRegExp } from "./api-utils";

 export const validationSchema = Yup.object().shape({
    // phonenumber: Yup.string().matches(
    //   phoneRegExp.phoneRegExp,
    //   "Phone number is not valid"
    // ),
    email:Yup.string().required(),
    password: Yup.string()
      .required()
      .min(4, "Must be exactly 4 digits")
    
  });

  //Create Event Validation
//
  export const createEventStep1ValidationSchema = Yup.object().shape({
    event_name: Yup.string().required('Event name is required'),
    event_image: Yup.string().required('Event image is required'),
    start_date: Yup.string().required('Event start date is required'),
    end_date: Yup.string().required('Event end date is required'),
    event_description: Yup.string().required('Event description is required')

 
  });


  //Update Account Validation Schema

  export const accountValidationSchema = Yup.object().shape({
    first_name:Yup.string().required('First Name is required'),
    last_name:Yup.string().required('Last Name is required'),
    password:Yup.string().required('Password is required'),
    phonenumber:Yup.string().required(' Phone Number is required'),
  });





  export const eventDetailsSchema = Yup.object().shape({
    event_name: Yup.string().required('Event name is required'),
    event_image: Yup.string().required('Event image is required'),
    event_description: Yup.string().required('Event description is required'),
    start_date: Yup.date().required('Start date is required').nullable(),
    end_date: Yup.date().required('End date is required').nullable(),
  });

  // export const eventPaymentSchema = Yup.object().shape({
  //   payment: Yup.boolean().required('Payment is required'),
  //   general_payment: Yup.boolean().required('General payment is required'),
  //   category_amount: Yup.string().required('Category amount is required'),
  // });

  export const eventPaymentSchema = Yup.object().shape({
    payment: Yup.boolean().required('Event Payment is required'),
    general_payment: Yup.boolean().when('eventPayment', {
      is: true,
      then: Yup.boolean().required('General Payment is required'),
    }),
    categories: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Category Name is required'),
        amount: Yup.number().required('Category Amount is required')
      })
    ).when('general_payment', {
      is: false,
      then: schema => schema.min(1, 'At least one category is required'),
      otherwise: schema => schema.optional(),
  }),
  });


  
  export const eventQuestionSchema = Yup.object().shape({
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required('Question is required'),
    // question_type: Yup.string().required('Question type is required'),
    option: Yup.string().required('Option is required'),
    // question_required: Yup.boolean().required('Question required is required'),
      })
    ),
  });
  
  export const eventSubsectionSchema = Yup.object().shape({
    subsection: Yup.boolean().required('Event Subsection selection is required'),
    sections: Yup.array().of(
      Yup.object().shape({
        message: Yup.string().required('Message is required'),
        eventDate: Yup.date().required('Date is required').nullable(),
        eventTime: Yup.string().required('Time is required'),
        eventName: Yup.string().required('Name is required'),
      })
    ).when('subsection', {
      is: true,
      then: schema => schema.min(1, 'At least one section is required'),
      otherwise: schema => schema.optional(),
  }),
  });
  