import React from 'react'

const Form = ({ LabelName, FormName, FormType, placeholderName, formValue, onChange}) => {
  return (
    <>
       <label className="block tracking-wide text-black text-sm font-extrabold mb-4" htmlFor="grid-first-name">
       {LabelName}
     </label>
     <input value={formValue} onChange={onChange} type={FormType} name={FormName} className={`abg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all`} required placeholder={placeholderName} />
    </>
  )
}

export default Form
