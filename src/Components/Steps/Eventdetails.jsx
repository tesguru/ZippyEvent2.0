import React, { useEffect } from 'react';
import Form from '../Form';
import { Controller } from 'react-hook-form';

const Eventdetails = ({ formData, setFormData, methods }) => {
  const { control,  formState: { errors }  } = methods;
 
  return (
    <>
      <div className='grid gap-6 grid-cols-2'>
        <div>
          <Controller
            name="event_name"
            control={control}
            defaultValue={formData.event_name}
            render={({ field }) => (
              <Form
                {...field}
                FormName="event_name"
                FormType="text"
                LabelName="Event Name"
                placeholderName="Enter Event Name"
                formValue={field.value}
                
                onChange={(event) => {
                  field.onChange(event);
                  setFormData({ ...formData, event_name: event.target.value });
                }}
              />
            )}
          />
 {errors.event_name && <span className='text-red-400'>{errors.event_name.message}</span>}
        </div>

        <div>
          <Controller
            name="event_image"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form
                {...field}
                FormName="event_image"
                FormType="file"
                LabelName="Event Image"
              />
            )}
          />
        </div>
      </div>

      <div className='grid gap-6 grid-cols-2'>
        <div>
          <Controller
            name="start_date"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form
                {...field}
                FormName="start_date"
                formValue={field.value}
                FormType="date"
                LabelName="Event Start Date"
              />
            )}
          />
           {errors.start_date && <span className='text-red-400'>{errors.start_date.message}</span>}
        </div>
        <div>
          <Controller
            name="end_date"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form
                {...field}
                FormName="end_date"
                formValue={field.value}
                FormType="date"
                LabelName="Event End Date"
              />
            )}
          />
           {errors.end_date && <span className='text-red-400'>{errors.end_date.message}</span>}
        </div>
      </div>

      <div className='mt-3'>
        <label htmlFor="event_description" className="block mb-3 text-sm font-extrabold text-black">Event Description</label>
        <Controller
          name="event_description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              {...field}
              id="event_description"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
            />
           
          )}
          
        />
         {errors.description && <span className='text-red-400'>{errors.event_description.message}</span>}
      </div>
    </>
  );
};

export default Eventdetails;
