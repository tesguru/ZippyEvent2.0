import React from 'react'
import image4 from '../assets/Images/zippylogo.png'
import * as Yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup'
import { validationSchema } from '../Utils/Validation';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from '../data/local/reducers/Authorizationreducer';
import { useDispatch, useSelector } from "react-redux";
import Spinnerloader from '../Components/Spinnerloader';
import image1 from '../assets/Images/macrotel.png'


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const {register, handleSubmit, formState:{errors}} = useForm({resolver : yupResolver(validationSchema)});
  const loginSubmit = async(data) =>{
     if (errors.email) {
      toast.error(errors.email.message);
    } else {
      console.log(data);
    }
    const { payload } = await dispatch(login(data));
    if(payload.status_code === '0'){
      navigate("/dashboard");
    }
   
  }
  return (
    <>
<div className="">
<Spinnerloader open={auth.loading} />
      <div className="grid lg:grid-cols-2 gap-4 max-lg:gap-12 bg-gradient-to-r from-zippy to-blue-400 min-h-[160px] px-8 py-12 h-[320px]">
        <div>
        <a className="flex items-center text-white no-underline hover:no-underline font-extrabold text-1xl lg:text-4xl" href="#"> 
			<img src={image4} className=" h-12 " /><p className='ml-2 text-md'>ZippyEvents</p>
			</a>
			
          <div className="max-w-lg mt-16 max-lg:hidden">
            <h3 className="text-2xl font-bold text-white">Sign in</h3>
            <p className="text-sm mt-4 text-white">Embark on a seamless journey as you sign in to your account. Unlock a realm of opportunities and possibilities that await you.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:px-6 px-4 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto">
          <form onSubmit={handleSubmit(loginSubmit)} >
            <div className="mb-8">
              <h3 className="text-3xl font-extrabold text-gray-800">Sign in</h3>
            </div>
            <div className="sm:flex justify-end sm:items-start space-x-4 mb-8">
              <NavLink to={'/'}>
  <button
    type="button"
    className="flex items-center py-2.5 px-4 text-sm font-semibold rounded-md text-blue-500 bg-blue-100 hover:bg-blue-200 focus:outline-none"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
    Back
  </button>
  </NavLink>
</div>

            <div>
              <label className="text-black font-bold text-md mb-2 block">Email Address</label>
              <div className="relative flex items-center">
                <input name="email" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"  placeholder="name@company.com"  {...register("email")}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000" />
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000" />
                </svg>
       
              </div>
              <p className='text-red-500'>{errors.email?.message}</p>
            </div>
            <div className="mt-4">
              <label className="text-black font-bold text-md mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input name="password" type="password" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password"  {...register("password")}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000" />
                </svg>
              </div>
              <p className='text-red-500'>{errors.password?.message}</p>
            </div>
            <div className="mt-4 text-right">
          
            </div>

            <div className="mt-8">
              <button type="submit" className="w-full text-xl shadow-xl py-3 px-6 text-sm font-extrabold rounded-md text-white bg-zippy focus:outline-none">
                Log in
              </button>
            </div>
            <p className="text-sm mt-8 text-center text-gray-800">Don't have an account <NavLink to={'/register'}><a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></NavLink></p>
          </form>
        </div>
      </div>
      
      <div className="container p-5 mx-auto text-center mt-[320px] font-extrabold  flex items-center justify-center ">
<p className='pr-3'>Powered by </p> <img className='pr-1' width='23px' src={image1}/><p className='2px'>Macrotel </p>

                </div>
    </div>

   



    </>
  )
}

export default Login
