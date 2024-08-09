import React from 'react';

const Form = ({ LabelName, FormName, formValue, onChange, FormType }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={FormName}>
                {LabelName}
            </label>
            <input
                id={FormName}
                name={FormName}
                value={formValue}
                type={FormType}
                onChange={onChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder={LabelName}
            />
        </div>
    );
};



export default Form;
