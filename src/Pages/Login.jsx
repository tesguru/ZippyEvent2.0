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
      }, 10000);
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

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-16">
          <a href="#"><img src={image4} alt="logo" className="w-10 inline-block" /></a>
          <h4 className="text-gray-800 text-base font-semibold mt-6">Create Account</h4>
        </div>

        <form>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">First Name</label>
              <input name="name" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
              <input name="lname" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name" />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
              <input name="email" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Mobile No.</label>
              <input name="number" type="number" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter mobile number" />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input name="password" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <input name="cpassword" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter confirm password" />
            </div>z
            <div>
              <label htmlFor="haveZippyAccount" className="text-gray-800 text-sm mb-2 block">Do you have an account with Zippyworld?</label>
              <select id="haveZippyAccount" name="question_choice" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" onChange={handleChoiceChange}>
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
                <input type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" name="walletNumber" id="wallet_number" maxLength="11" onChange={handleInputChange} />
                <input type="text" name="account_number" hidden id="account_number" />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">ZippyWorld Account Name<code>*</code></label>
                <input type="text" readOnly className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" name="accountName" id="account_name" value={accountName?.result?.user_detail[0]?.names || ''} />
              </div>
            </div>
          )}

          {userChoice !== 'yes' && userChoice !== '' && (
            <div className="grid sm:grid-cols-2 gap-8 mt-8" id="noAccountDiv">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">BVN<code>*</code></label>
                <input type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" name="bvn" id="bvn" maxLength="11" onChange={handleInputChange} />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Zippyworld Account Pin<code>*</code></label>
                <input type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" maxLength="4" name="accountPin" id="account_pin" onChange={handleInputChange} />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Select a Security Question<code>*</code></label>
                <select name="securityQuestion" id="security_question" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" onChange={handleInputChange}>
                  <option value="">...select</option>
                  {securityQuestion && securityQuestion.result.map((question) => (
                    <option key={question.id} value={question.id}>{question.question}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Security Answer<code>*</code></label>
                <input type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" name="securityAnswer" id="security_answer" onChange={handleInputChange} />
              </div>
            </div>
          )}

          <div className="mt-12">
            <button type="button" className="py-3.5 px-7 text-sm font-semibold tracking-wide bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all">Register Now</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
