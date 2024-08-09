import React, { useCallback } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import Form from '../Form';

const Eventquestion = ({ methods }) => {
  const {
    control,
    watch,
    setValue,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'question_list',
  });

  const addNewQuestion = useCallback(
    () => {
      append({
        question: '',
        question_type: '',
        option: [{ value: '' }],
        question_required: false,
      });
    },
    [append]
  );

  const removeQuestion = (Idx) => {
    remove(Idx);
  };

  return (
    <div>
      <div className='grid grid-cols-12 gap-6'>
        {fields.map((question, index) => (
          <React.Fragment key={question.id}>
            <div className='col-span-8'>
              <Controller
                name={`question_list.${index}.question`}
                control={control}
                render={({ field }) => (
                  <Form
                    {...field}
                    FormType='text'
                    LabelName='Questions'
                    placeholderName='Enter Question'
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
                name={`question_list.${index}.question_type`}
                control={control}
                render={({ field }) => (
                  <>
                    <label
                      htmlFor={`select_${question.id}`}
                      className='block mb-2 text-sm font-extrabold text-black'
                    >
                      Select an option
                    </label>
                    <select
                      {...field}
                      id={`select_${question.id}`}
                      name='question_choice'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-zippy focus:border-zippy block w-full p-2.5'
                    >
                      <option defaultValue>Choose a type</option>
                      <option value='Text'>Text</option>
                      <option value='Singlechoice'>Single Choice</option>
                      <option value='Multiplechoice'>Multiple Choice</option>
                      <option value='Fileupload'>File Upload</option>
                    </select>
                  </>
                )}
              />
            </div>
            {['Singlechoice', 'Multiplechoice'].includes(
              watch(`question_list.${index}.question_type`)
            ) && (
              <div className='col-span-12'>
                <div className='grid grid-cols-12 gap-4'>
                  <Controller
                    name={`question_list.${index}.option`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          htmlFor={`option_${question.id}`}
                          className='block mb-2 text-sm font-extrabold text-black col-span-12'
                        >
                          Options
                        </label>
                        {(Array.isArray(field.value) ? field.value : []).map(
                          (option, optIndex) => (
                            <div
                              key={optIndex}
                              className='col-span-12 flex items-center mb-2'
                            >
                              <Form
                                FormType='text'
                                LabelName={`Option ${optIndex + 1}`}
                                placeholderName='Enter option'
                                formValue={option.value}
                                onChange={(event) => {
                                  const updatedOptions = [...field.value];
                                  updatedOptions[optIndex].value =
                                    event.target.value;
                                  setValue(
                                    `question_list.${index}.option`,
                                    updatedOptions
                                  );
                                }}
                              />
                              <div className='flex items-center ml-2'>
                                <button
                                  type='button'
                                  onClick={() => {
                                    const updatedOptions = [...field.value];
                                    updatedOptions.splice(optIndex, 1);
                                    setValue(
                                      `question_list.${index}.option`,
                                      updatedOptions
                                    );
                                  }}
                                  className='px-2 py-1 bg-red-500 text-sm text-white rounded-lg mr-2'
                                >
                                  Remove
                                </button>
                                <button
                                  type='button'
                                  onClick={() => {
                                    const updatedOptions = [
                                      ...(Array.isArray(field.value)
                                        ? field.value
                                        : []),
                                      { value: '' },
                                    ];
                                    setValue(
                                      `question_list.${index}.option`,
                                      updatedOptions
                                    );
                                  }}
                                  className='px-2 py-1 bg-blue-500 text-sm text-white rounded-lg'
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          )
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
            )}
            <div className='col-span-12 flex justify-between mt-4'>
              <button
                type='button'
                onClick={() => removeQuestion(index)}
                className='px-4 py-2 bg-red-500 text-sm text-white rounded-lg'
              >
                Remove Question
              </button>
              <button
                type='button'
                onClick={() => addNewQuestion()}
                className='px-4 py-2 bg-blue-500 text-sm text-white rounded-lg'
              >
                Add Question
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Eventquestion;
