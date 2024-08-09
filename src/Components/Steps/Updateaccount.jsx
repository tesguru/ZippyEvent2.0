import React, { useState } from 'react';
import Form from '../Form';
import { useSelector, useDispatch } from 'react-redux';
import { updateAccount } from '../../data/local/reducers/Miscellaneousslicereducer'; // Ensure the import path is correct
import { UpdateAccountFetchApi } from '../../data/remote/services/FetchApi';
import { showSuccessToast, showErrorToast } from '../../Utils/api-utils'; // Ensure these are imported correctly

const Updateaccount = () => {
    const loginProfile = useSelector((state) => state.auth.loginProfile);
    const dispatch = useDispatch();

    // Initialize state with form values from loginProfile
    const [formValues, setFormValues] = useState({
        firstname: loginProfile?.result?.firstname || '',
        lastname: loginProfile?.result?.lastname || '',
        phonenumber: loginProfile?.result?.phonenumber || '',
        email: loginProfile?.result?.email || '',
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
    const submitFormHandler = async (event) => {
        event.preventDefault();
        
        // Dispatch the updateAccount action with the form values
      
        try {
            const response = await fetch('https://eventapi.zippyworld.app/zippy_event/update_account', {
                method: 'POST',
                
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '20230098',
                },
                body: JSON.stringify(formValues),
            });
      console.log(response);
            // Check if response.ok to handle HTTP errors
            if (!response.ok) {
                // Get the error details
                const errorDetails = await response.json();
                
                if (response.status === 400) {
                    // Handle 400 Bad Request error specifically
                    if (errorDetails.status_code === '1' && errorDetails.result) {
                        // Extract all error messages from the result object
                        const errorMessages = Object.values(errorDetails.result);
                        // Display only the first error message
                        const firstErrorMessage = errorMessages[0] || errorDetails.message;
                        showErrorToast(firstErrorMessage);
                    } else {
                        // Display the general error message if no specific result errors
                        showErrorToast(errorDetails.message || 'Bad Request');
                    }
                } else {
                    // Handle other status codes or general HTTP errors
                    showErrorToast('An unexpected error occurred');
                }
                return;
            }
      
            // If response is successful
            const result = await response.json();
            if (result.status_code === '0') {
                showSuccessToast('Account updated successfully');
            } else if (result.status_code === '1') {
                if (result.result) {
                    // Extract all error messages from the result object
                    const errorMessages = Object.values(result.result);
                    // Display only the first error message
                    const firstErrorMessage = errorMessages[0] || result.message;
                    showErrorToast(firstErrorMessage);
                } else {
                    // Display the general error message if no specific result errors
                    showErrorToast(result.message || 'Account update failed');
                }
            }
        } catch (error) {
            showErrorToast('Network Error, Contact Admin');
        }
    }

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
