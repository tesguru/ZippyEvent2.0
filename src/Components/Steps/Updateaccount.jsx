import React, { useState } from 'react';
import Form from '../Form';
import { useSelector, useDispatch } from 'react-redux';
import { updateAccount } from '../../data/local/reducers/Miscellaneousslicereducer'; // Ensure the import path is correct

const Updateaccount = () => {
    const loginProfile = useSelector((state) => state.auth.loginProfile);
    const dispatch = useDispatch();

    // Initialize state with form values from loginProfile
    const [formValues, setFormValues] = useState({
        firstname: loginProfile?.result?.firstname || '',
        lastname: loginProfile?.result?.lastname || '',
        phonenumber: loginProfile?.result?.phonenumber || '',
        password: '',
    });

    // Handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Handle form submission
    const submitFormHandler = (event) => {
        event.preventDefault();
        
        // Dispatch the updateAccount action with the form values
        dispatch(updateAccount(formValues));
        
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-zippy">Update Account</h2>
            <form onSubmit={submitFormHandler}>
                <div className='grid gap-3 grid-cols-12'>
                    <div className='col-span-6'>
                        <Form
                            FormName='firstname'
                            LabelName='First Name'
                            formValue={formValues.firstname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Form
                            FormName='lastname'
                            LabelName='Last Name'
                            formValue={formValues.lastname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Form
                            FormName='phonenumber'
                            LabelName='Phone Number'
                            formValue={formValues.phonenumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Form
                            FormName='password'
                            LabelName='Password'
                            formValue={formValues.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='text-end mt-4'>
                    <button
                        type="submit"
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                        Update Account
                    </button>
                </div>
            </form>
        </div>
    );
};


export default Updateaccount;
