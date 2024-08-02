import React, { useState, useEffect } from 'react';
import image4 from '../assets/Images/zippylogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { getSecurityQuestions, getAccountName } from '../data/local/reducers/Miscellaneousslicereducer';

const Register = () => {
  const dispatch = useDispatch();
  const securityQuestion = useSelector((state) => state.misc.miscellaneousdata?.securityQuestion);
  const accountName = useSelector((state) => state.misc.miscellaneousdata?.accountName);

  useEffect(() => {
    dispatch(getSecurityQuestions());
  }, [dispatch]);

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    accountName: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form State:', formState);
  };

  useEffect(() => {
    if (accountName) {
      setFormState(prevState => ({
        ...prevState,
        accountName: accountName.names || ''
      }));
    }
  }, [accountName]);

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-16">
          <a href="#"><img src={image4} alt="logo" className="w-10 inline-block" /></a>
          <h4 className="text-gray-800 text-base font-semibold mt-6">Create Account</h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">First Name</label>
              <input name="firstName" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" value={formState.firstName} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
              <input name="lastName" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name" value={formState.lastName} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
              <input name="email" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" value={formState.email} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Mobile No.</label>
              <input name="mobileNumber" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter mobile number" value={formState.mobileNumber} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input name="password" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" value={formState.password} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <input name="confirmPassword" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter confirm password" value={formState.confirmPassword} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="haveZippyAccount" className="text-gray-800 text-sm mb-2 block">Do you have an account with Zippyworld?</label>
              <select id="haveZippyAccount" name="question_choice" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" onChange={handleChoiceChange} value={userChoice}>
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
                <label className="text-gray-800 text-sm mb-2 block">Zippyworld Wallet Number<code>*</code></label>
                <input type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" name="walletNumber" id="wallet_number" maxLength="11" onChange={handleInputChange} value={formState.walletNumber} />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">ZippyWorld Account Name<code>*</code></label>
                <input type="text" readOnly className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" name="accountName" id="account_name" value={formState.accountName} />
              </div>
            </div>
          )}

          {userChoice !== 'yes' && userChoice !== '' && (
            <div className="grid sm:grid-cols-2 gap-8 mt-8" id="noAccountDiv">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">BVN<code>*</code></label>
                <input type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" name="bvn" id="bvn" maxLength="11" onChange={handleInputChange} value={formState.bvn} />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Zippyworld Account Pin<code>*</code></label>
                <input type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" maxLength="4" name="accountPin" id="account_pin" onChange={handleInputChange} value={formState.accountPin} />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Select a Security Question<code>*</code></label>
                <select name="securityQuestion" id="security_question" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" onChange={handleInputChange} value={formState.securityQuestion}>
                  <option value="">...select</option>
                  {securityQuestion && securityQuestion.result.map((question) => (
                    <option key={question.id} value={question.id}>{question.question}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Answer</label>
                <input type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" name="securityAnswer" id="security_answer" placeholder="Enter Answer" onChange={handleInputChange} value={formState.securityAnswer} />
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-8 mt-8">
            <div>
              <button type="submit" className="bg-green-700 py-4 w-full text-white text-sm rounded-md hover:bg-green-600 transition-all" id="submitBtn">Submit</button>
            </div>
            <div>
              <button type="reset" className="bg-red-700 py-4 w-full text-white text-sm rounded-md hover:bg-red-600 transition-all" id="cancelBtn">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

















