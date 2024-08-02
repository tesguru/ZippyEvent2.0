import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Form";

const PersonalInfo = () => {
  const navigate = useNavigate();
 



  return (
   
      <form  className="flex flex-col">
        <div className="grid  grid-cols-2  gap-3  relative">
          <div>
         <Form FormType={'text'} FormName={'Name'} LabelName={'Name'} ></Form>
         </div>
         <div> <Form FormType={'text'} FormName={'Name'} LabelName={'Last Name'} ></Form></div>
         <div> <Form FormType={'text'} FormName={'Name'} LabelName={'Gender'} ></Form></div>
         <div> <Form FormType={'text'} FormName={'Name'} LabelName={'Phone Number'} ></Form></div>
      
        </div>
        <div className="flex justify-end items-end py-[2px] mt-[120px] sm:mt-[26px]">
          <button
            className="bg-zippy text-white border-0 rounded-md px-2 py-2 transition-all duration-300 hover:opacity-75"
            type="sumbit"
          >
            Next Step
          </button>
        </div>
      </form>
 
  );
};

export default PersonalInfo;
