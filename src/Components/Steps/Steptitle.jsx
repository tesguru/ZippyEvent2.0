import React from 'react';

const Steptitle = ({ pageTitle, pageNumber, currentStep }) => {
  const isActive = currentStep === pageNumber;

  return (
    <li className={`flex items-center ${isActive ? 'text-green-300' : 'text-white'}`}>
      <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${isActive ? 'border-blue-600 dark:border-blue-500' : 'border-green-600'}`}>
        {pageNumber}
      </span>
      {pageTitle}
      <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 9 4-4-4-4M1 9l4-4-4-4" />
      </svg>
    </li>
  );
};

export default Steptitle;
