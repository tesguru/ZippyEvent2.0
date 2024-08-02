import React, { useCallback } from 'react'
import { Controller } from 'react-hook-form';
import Form from '../Form';
import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';

const Eventquestion = ({methods}) => {
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
    name: "questions",
  });

  const addNewQuestion = useCallback(
    (value) => {
      append(value);
    },
    [append]
  );

  const removeQuestion = (Idx) => {
    remove(Idx);
  };

  const DEFAULT_QUESTION_VALUE = {
    question: "",
    question_type: "",
    option: "",
    question_required: false,
  }

  return (
    <div>
      <div className='grid grid-cols-12 gap-6'>
        {fields.map((question, index) => (
          <React.Fragment key={question.id}>
            <div className='col-span-8'>
            <Controller
            name={`questions.${index}.question`}
            control={control}
            render={({ field }) => (
              <Form
                {...field}
                FormType="text"
                LabelName=""
                placeholderName="Enter Question"
                formValue={field.value}
                
                onChange={(event) => {
                  field.onChange(event);
                }}
              />
            )}
          />
            </div>
            <div className='col-span-4 mt-2'>
            <Controller
            name={`questions.${index}.option`}
            control={control}
            render={({ field }) => (
              <><label
                htmlFor={`select_${question.id}`}
                className='block mb-2 text-sm font-extrabold text-black'
              >
                Select an option
              </label><select
              {...field}
                id={`select_${question.id}`}
                name='question_choice'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-zippy focus:border-zippy block w-full p-2.5'
              >
                  <option defaultValue>Choose a country</option>
                  <option value='Text'>Text</option>
                  <option value='Singlechoice'>Single Choice</option>
                  <option value='Multiplechoice'>Multiple Choice</option>
                  <option value='Fileupload'>File Upload</option>
                </select></>
            )}
          />
          
            </div>
            <button type="button" onClick={() => removeQuestion(index)}
              className="mt-4 px-4 py-2 bg-green-300 text-sm text-white rounded-lg"
            >
              Remove
            </button>
          </React.Fragment>
        ))}
      </div>
      <button
        className='mt-4 bg-blue-500 text-sm text-white p-2 rounded'
        onClick={() => addNewQuestion(DEFAULT_QUESTION_VALUE)}
      >
        Add Question
      </button>
    </div>
  );
}

export default Eventquestion