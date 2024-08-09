import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import Form from '../Form';

const Eventpayment = ({ formData, setFormData, methods }) => {

  const { control, watch, reset, getValues } = methods;


  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });
  

  const eventPayment = watch('payment');
  const generalPayment = watch('general_payment');

  useEffect(() => {
if(generalPayment === false && getValues("general_amount")){
  reset({...getValues(), general_amount: undefined})
} else if(generalPayment === true && getValues("general_amount") && getValues("general_amount")){
 console.log(); 
}
  }, []);

  
  const addNewCategory = useCallback(
    (value) => {
      append(value);
    },
    [append]
  );

  const removeCategory = (Idx) => {
    remove(Idx);
  };

  const DEFAULT_CATEGORY_VALUE = {
    category_name: "",
    category_amount: "",
  }

  
  return (
    <>
    <div>
    <label className='pb-2 font-extrabold'>Is Your Event Having Payment</label>
        <Controller
          name="payment"
          control={control}
          render={({ field }) => (
            <div className="flex gap-2 items-center mb-4">
              <input
                    id="payment-yes"
                type="radio"
                value={true}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
              />
              <label htmlFor="payment-yes" className="ms-2 text-sm font-medium text-gray-900">Yes</label>
              <input
                 id="payment-no"
                type="radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                value={false}
                checked={field.value === false}
                onChange={() => field.onChange(false)}
              />
         <label htmlFor="payment-no" className="ms-2 text-sm font-medium text-gray-900">No</label>
            </div>
          )}
        />
      </div>

      {eventPayment && (
        <div>
            
          <label className='pb-2 font-extrabold'>Is Your Event Having General Payment</label>
          <Controller
            name="general_payment"
            control={control}
            render={({ field }) => (
              <div className="flex gap-2 items-center mb-4">
                <input
                  id="general-payment-yes"
                  type="radio"
                  value={true}
                  checked={field.value === true}
                  onChange={() => field.onChange(true)}
                />
 <label htmlFor="general-payment-yes" className="ms-2 text-sm font-medium text-gray-900">Yes</label>
                <input
                  id="general-payment-no"
                  type="radio"
                  value={false}
                  checked={field.value === false}
                  onChange={() => field.onChange(false)}
                />
            <label htmlFor="general-payment-no" className="ms-2 text-sm font-medium text-gray-900">No</label>
              </div>
            )}
          />
        </div>
      )}

{generalPayment && (
        <div className="w-full">
           <label className="block tracking-wide text-black text-sm font-extrabold mb-4" htmlFor="general_amount">General Amount</label>
          <Controller
            name="general_amount"
            id="general_amount"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-zippy rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            control={control}
            render={({ field }) => (
              <input type="text" {...field} />
            )}
          />
        </div>
      )}

{!generalPayment && generalPayment !== undefined && eventPayment && (
  <>
    {fields.map((category, index) => (
      <React.Fragment key={index}>
        <div className="grid gap-6 grid-cols-2">
          <div>
          <label
            className="block tracking-wide text-black text-sm font-extrabold mb-4"
            htmlFor={`category-name-${index}`}
          >
            Category Name 
          </label>
          <Controller
            name={`categories.${index}.name`}
            control={control}
            render={({ field }) => (
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-zippy rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id={`category-name-${index}`}
                type="text"
                {...field}
              />
            )}
          />
          </div>
          <div>
          <label
            className="block tracking-wide text-black text-sm font-extrabold mb-4"
            htmlFor={`category-amount-${index}`}
          >
            Category Amount
          </label>
          <Controller
            name={`categories.${index}.amount`}
            control={control}
            render={({ field }) => (
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-zippy rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id={`category-amount-${index}`}
                type="text"
                {...field}
              />
            )}
          />
        </div>
        </div>
        <div className="flex justify-between"> <button
      type="button"
      onClick={() => addNewCategory(DEFAULT_CATEGORY_VALUE)}
      className="mt-4 px-4 py-2 bg-green-600 text-sm text-white rounded-lg"
    >
      Add More
    </button>
        <button
          type="button"
          onClick={() => removeCategory(index)}
          className="mt-4 px-4 py-2 bg-red-300 text-sm text-white rounded-lg"
        >
          Remove
        </button>
        </div>
      </React.Fragment>
    ))}
   
  </>
)}


    </>
  );
};

export default Eventpayment;

