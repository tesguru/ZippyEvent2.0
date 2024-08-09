import React, { useState, useEffect } from 'react';
import image4 from '../assets/Images/zippylogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { getSecurityQuestions, getAccountName, getBusinessAccount } from '../data/local/reducers/Miscellaneousslicereducer';
import { showErrorToast, showSuccessToast } from '../Utils/api-utils';
import { createAccount } from '../data/local/reducers/Authorizationreducer';
import { createUserAccount } from '../data/remote/services/FetchApi';
import image2 from '../assets/Images/App Store.svg';
import image3 from '../assets/Images/Play Store.svg'
import Spinnerloader from '../Components/Spinnerloader';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
  const [loading, isloading] = useState(false)
  const dispatch = useDispatch();
  const securityQuestion = useSelector((state) => state.misc.miscellaneousdata?.securityQuestion);
  const accountName = useSelector((state) => state.misc.miscellaneousdata?.accountName);
  const businessAccount = useSelector((state) => state.misc.miscellaneousdata?.businessAccount);
  
  useEffect(() => {
    dispatch(getSecurityQuestions());
  }, [dispatch]);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    userChoice: '',
    password: '',
    gender: '',
    accountName: '',
    accountNumber: '',
    walletNumber: '',
    bvn: '',
    accountPin: '',
    securityQuestion: '',
    securityAnswer: ''
  });

  const [userChoice, setUserChoice] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (formState.walletNumber) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const newTimeoutId = setTimeout(() => {
        dispatch(getAccountName(formState.walletNumber));
      }, 500);
      setTimeoutId(newTimeoutId);
    }
  }, [formState.walletNumber, dispatch]);

  const handleChoiceChange = (e) => {
    setUserChoice(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const fullName = `${formState.firstName} ${formState.lastName}`.substring(0, 21);
    let accountNumber = '';
    let accountName = '';
    let walletNumber = formState.mobileNumber;
  
    if (formState.userChoice === 'no') {
      const accountDetailsData = {
        firstname: formState.firstName,
        lastname: formState.lastName,
        phonenumber: formState.mobileNumber,
        email: formState.email,
        bvn: formState.bvn,
        pin: formState.accountPin,
        secure_id: formState.securityQuestion,
        answer: formState.securityAnswer
      };
  
      try {
        dispatch(getBusinessAccount);
  
        if (businessAccount.status_code === '0') {
          const checkUserDetails = await getAccountName(formState.mobileNumber);
          const zippyAccountNumber = checkUserDetails.user_detail[0].account_no;
  
          if (zippyAccountNumber !== formState.mobileNumber) {
            accountNumber = zippyAccountNumber;
            accountName = checkUserDetails.user_detail[0].names;
          } else {
            accountNumber = 'NAV';
            accountName = checkUserDetails.user_detail[0].names;
          }
        } else {
          showErrorToast(businessAccount.message);
          return;
        }
      } catch (err) {
        showErrorToast('Network Error, Contact Admin');
        return;
      }
    } else {
      accountNumber = formState.accountNumber;
      accountName = formState.accountName;
      walletNumber = formState.walletNumber;
  
      if (!accountNumber) {
        showErrorToast('Invalid Zippy Wallet Number');
        return;
      }
    }
  
    const data = {
      firstname: formState.firstName,
      lastname: formState.lastName,
      gender: formState.gender,
      phonenumber: formState.mobileNumber,
      email: formState.email,
      zippyAccountNumber: accountNumber,
      zippyAccountName: accountName,
      zippyWalletNumber: walletNumber,
      password: formState.password
    };
  
    try {
      isloading(true);
      const response = await fetch('https://eventapi.zippyworld.app/zippy_event/user_account_creation', {
          method: 'POST',
          
          headers: {
              'Content-Type': 'application/json',
              'x-api-key': '20230098',
          },
          body: JSON.stringify(data),
      });

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
          navigate('/login');
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
 finally {
  isloading(false);
}
};


  useEffect(() => {
    if (accountName) {
      setFormState(prevState => ({
        ...prevState,
        accountName: accountName.user_detail[0].names || '',
         accountNumber: accountName.user_detail[0].account_no || ''
      }));
    }
  }, [accountName]);
console.log(accountName)
  return (
    <>
<Spinnerloader open={loading} />
      <div className="max-w-4xl mx-auto p-6">
      <div className="text-center bg-gradient-to-r from-zippy to-blue-400  sm:px-6 p-6">
      <a className="flex justify-center items-center text-white no-underline hover:no-underline font-extrabold text-1xl lg:text-4xl" href="#"> 
			<img src={image4} className=" h-12 " /><p className='ml-2 text-md '>ZippyEvents</p>
			</a>
   
      </div>

        <form className='max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-m' onSubmit={handleSubmit}>
         
          <div className="grid md:grid-cols-2 gap-8">
          <button type="button" className="w-full px-6 py-3 flex items-center justify-center  text-sm tracking-wider font-semibold border-none outline-none ">
        You already have an account, <NavLink to={'/login'}><a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Sign in</a></NavLink>
        </button>
            <button type="button" className="w-full px-6 py-3 flex items-center justify-center rounded-md text-gray-800 text-sm tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200">
            <img src={image2} className="h-12 pr-4"/>
            <img src={image3} className="h-12 pr-4"/>
            </button>
           
          </div>

          <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
           
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-800 text-sm mb-2 block font-extrabold">First Name</label>
              <input required name="firstName" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" value={formState.firstName} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block font-extrabold">Last Name</label>
              <input required name="lastName" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name" value={formState.lastName} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block font-extrabold">Email Address</label>
              <input name="email" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" value={formState.email} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block font-extrabold">Mobile No.</label>
              <input required name="mobileNumber" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter mobile number" value={formState.mobileNumber} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block font-extrabold">Password</label>
              <input required name="password" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" value={formState.password} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block font-extrabold">Gender</label>
              <input required name="gender" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter confirm password" value={formState.gender} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="haveZippyAccount" className="text-gray-800 text-sm mb-2 block font-extrabold">Do you have an account with Zippyworld?</label>
              <select id="haveZippyAccount" name="question_choice" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" onChange={handleChoiceChange} value={formState.userChoice}>
                <option value="">...select</option>
                <option value="no">No, I don't Have</option>
                <option value="yes">Yes, I have a Zippyworld Account</option>
                <option value="no_other">I have a Zippyworld Account, but I want another Account for Zippy Event</option>
              </select>
            </div>
          </div>         
          {userChoice === 'yes' && (
            <div className="grid sm:grid-cols-2 gap-8 mt-8" id="account_div">
              <div>
                <label className="text-gray-800 text-sm mb-2 block font-extrabold">Zippyworld Wallet Number<code>*</code></label>
                <input required type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" name="walletNumber" id="wallet_number" maxLength="11" onChange={handleInputChange} value={formState.walletNumber} />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block font-extrabold">ZippyWorld Account Name<code>*</code></label>
                <input type="text" readOnly className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" name="accountName" id="account_name" value={formState.accountName} />
                <input hidden type="text" readOnly className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" name="accountName" id="account_name" value={formState.accountNumber} />
              </div>
            </div>
          )}
          {userChoice !== 'yes' && userChoice !== '' && (
            <div className="grid sm:grid-cols-2 gap-8 mt-8" id="noAccountDiv">
              <div>
                <label className="text-gray-800 text-sm mb-2 block font-extrabold">BVN<code>*</code></label>
                <input required type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" name="bvn" id="bvn" maxLength="11" onChange={handleInputChange} value={formState.bvn} />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block font-extrabold">Zippyworld Account Pin<code>*</code></label>
                <input required type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" maxLength="4" name="accountPin" id="account_pin" onChange={handleInputChange} value={formState.accountPin} />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block font-extrabold">Select a Security Question<code>*</code></label>
                <select name="securityQuestion" id="security_question" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" onChange={handleInputChange} value={formState.securityQuestion}>
                  <option value="">...select</option>
                  {securityQuestion && securityQuestion.result.map((question) => (
                    <option key={question.id} value={question.id}>{question.question}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block font-extrabold">Answer</label>
                <input required type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" name="securityAnswer" id="security_answer" placeholder="Enter Answer" onChange={handleInputChange} value={formState.securityAnswer} />
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-1 gap-8 mt-8">
            <div>
              <button type="submit" className="bg-zippy py-4 w-full text-md text-white text-sm rounded-md hover:bg-zippy-600 font-extrabold transition-all" id="submitBtn">Submit</button>
            </div>
        
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;



















