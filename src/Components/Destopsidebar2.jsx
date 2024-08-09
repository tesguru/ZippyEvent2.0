import React from 'react'
import image4 from '../assets/Images/zippylogo.png'
import Sidebarlinks from './Sidebarlinks'
import image3 from '../assets/Images/Play Store.svg'
import image2 from '../assets/Images/App Store.svg';
import { logout } from '../data/local/reducers/Authorizationreducer';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Destopsidebar = ({}) => {
  const dispatch = useDispatch();

  const handleLogout = () =>{
    dispatch(logout);
  }
  return (
    <>
     <div className="z-20 hidden w-64 overflow-y-auto bg-white  md:block flex-shrink-0">
       <div className="py-4  ">
        <a href="#" className="flex items-center mb-6 text-2xl text-zippy font-extrabold justify-center ">
      <img src={image4} className=" h-12 " /><p className='ml-2 text-md'>ZippyEvents</p> 
      </a>
          <div className="px-6 my-6">
            
            <div className=" w-full px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yancolour border border-transparent rounded-lg  focus:outline-none focus:shadow-outline-purple">
           <p className='text-black font-extrabold pb-5'>Download ZippyWorld:</p>
           <div className='flex justify-between items-center pb-5'>
				<img src={image2} className="h-8 " />
				<img src={image3} className="h-8" /> 
        </div>  
            </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default Destopsidebar
