import React from 'react'
import image1 from '../assets/Images/event_image.jpg'
import image2 from '../assets/Images/App Store.svg';
import image3 from '../assets/Images/Play Store.svg'
import image4 from '../assets/Images/zippylogo.png'
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <>
      <div className="h-screen   bg-right bg-cover" style={{}}>
	{ /*Nav*/ }
	<div className="w-full container mx-auto p-6 pb-0 ">
			
		<div className="w-full flex items-center justify-between">
			<a className="flex items-center text-zippy no-underline hover:no-underline font-extrabold text-2xl lg:text-4xl" href="#"> 
			<img src={image4} className=" h-12 " /><p className='ml-2 text-md'>ZippyEvents</p>
			</a>
			
			<div className="flex w-1/2 justify-end content-center">		
				
			<Link to="/login">
      <button
        type="button"
        className="text-white text-2xl bg-zippy font-medium rounded-xl text-xl px-5 py-2.5 text-center me-2 mb-2"
      >
        Host Event
      </button>
    </Link>
        
			</div>
			
		</div>

	</div>

	{ /*Main*/ }
	<div className="container  px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
		
		{ /*Left Col*/ }
		<div className="flex flex-col w-full xl:w-2/5 justify-center pl-7 lg:items-start overflow-y-hidden">
			<h1 className="my-4 text-3xl md:text-5xl text-blue-900 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">We're here to make your event experience seamless and memorable. </h1>
			<p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">Join us and be part of something special</p>
		
			<p className="text-blue-400 font-bold pb-8 lg:pb-6 text-center md:text-left fade-in">Download  ZippyWorld:</p>
			<div className="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
				<img src={image2} className="h-12 pr-4 bounce-top-icons" />
				<img src={image3} className="h-12 bounce-top-icons" />
			</div>

		</div>
		
		{ /*Right Col*/ }
		<div className="w-full xl:w-3/5  overflow-y-hidden">
			<img className="w-[100%] mx-auto lg:mr-0 slide-in-bottom" src={image1} />
		</div>
		
		{ /*Footer*/ }
		<div className="w-full text-sm text-center md:text-left fade-in">
			<a className="text-gray-500 no-underline hover:no-underline" href="#">  Copyright © 2024</a>
		</div>
		
	</div>
	

</div>
    </>
  )
}

export default index
