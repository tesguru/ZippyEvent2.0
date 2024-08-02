import React, { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import Form from '../Form';
import { useFieldArray } from 'react-hook-form';
import { useEffectOnce } from '../../hooks/use-effectonce';

const Eventsubsection = ({methods}) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const addNewSection = useCallback(
    (value) => {
      append(value);
    },
    [append]
  );

  const removeSection = (Idx) => {
    remove(Idx);
  };

  const DEFAULT_SECTION_VALUE = {
    message: "",
    eventName: "",
    eventDate: "",
    eventTime: "",
  }

  const subsection = watch('subsection');

  // useEffectOnce(() => {
  //   addNewSection(DEFAULT_SECTION_VALUE)
  // })

  return (
    <>
      <div>
        <p className='pb-2 font-extrabold'>Is Your Event Having Sub Section</p>
        <div className="flex gap-2 items-center mb-4">
        <Controller
          name="subsection"
          control={control}
          render={({ field }) => (
            <div className="flex gap-2 items-center mb-4">
              <input
                 id="subsection-yes"
                type="radio"
                value={true}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
              />
              <label htmlFor="subsection-yes" className="ms-2 text-sm font-medium text-gray-900">Yes</label>
              <div>
            <input
              id="subsection-no"
              type="radio"
              value={false}
              name="subsection"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={field.value === false}
              onChange={() => field.onChange(false)}
            />
            <label htmlFor="subsection-no" className="ms-2 text-sm font-medium text-gray-900">No</label>
          </div>
            </div>
          )}
        />
        </div>

        {subsection && (
          <>
            {fields.map((section, index) => (
              <div key={index}>
                <div>
                <Controller
            name={`sections.${index}.eventName`}
            control={control}
            render={({ field }) => (
              <Form
                {...field}
                FormType="text"
                LabelName="Event Name"
                placeholderName="Enter Event Name"
                formValue={field.value}
                
                onChange={(event) => {
                  field.onChange(event);
                }}
              />
            )}
          />
                </div>
                <div className='grid gap-6 grid-cols-2'>
                  <div>
                  <Controller
            name={`sections.${index}.eventDate`}
            control={control}
            render={({ field }) => (
              <Form
                {...field}
                FormType="date"
                LabelName="Event Date"
                placeholderName="Enter Event Date"
                formValue={field.value}
                
                onChange={(event) => {
                  field.onChange(event);
                }}
              />
            )}
            />
                  </div>
                  <div>
                  <Controller
            name={`sections.${index}.eventTime`}
            control={control}
            render={({ field }) => (
              <Form
                {...field}
                FormType="time"
                LabelName="Event Time"
                placeholderName="Enter Event Time"
                formValue={field.value}
                
                onChange={(event) => {
                  field.onChange(event);
                }}
              />
            )}
            />
                  </div>
                </div>
                <div className='mt-3'>
                <Controller
            name={`sections.${index}.message`}
            control={control}
            render={({ field }) => (
              <><label htmlFor={`message${index}`} name='eventDescription' className="block mb-3 text-sm font-extrabold text-black">Event Description</label><textarea
                {...field}
                id={`message${index}`}
                rows={4}
                className="block p-2.5 w-full text-sm mb-6 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
                onChange={(event) => {
                  field.onChange(event);
                } } /></>
            )}
            />
                 
                </div>
                <button
              type="button"
              onClick={() => removeSection(index)}
              className="mt-4 px-4 py-2 bg-green-300 text-sm text-white rounded-lg"
            >
              Remove
            </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addNewSection(DEFAULT_SECTION_VALUE)}
              className="mt-4 px-4 py-2 bg-green-300 text-sm text-white rounded-lg"
            >
              Add More
            </button>
           
          </>
        )}
      </div>
    </>
  );
};

export default Eventsubsection;
