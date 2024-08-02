import React from 'react'
import image4 from '../assets/Images/zippylogo.png'
import Sidebarlinks from './Sidebarlinks'
import image3 from '../assets/Images/Play Store.svg'
import image2 from '../assets/Images/App Store.svg';

const Mobilesidebar = () => {
  return (
    <>
     <div className="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white md:hidden">
       <div className="py-4  ">
        <a href="#" className="flex items-center mb-6 text-2xl text-blue-700 font-extrabold justify-center ">
      <img src={image4} className=" h-12 " /><p className='ml-2 text-md'>ZippyEvents</p> 
      </a>
          <ul className="mt-6">
            <Sidebarlinks Navname={'Dashboard'}>
            <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            </Sidebarlinks>           
          </ul>
          <ul>
          <Sidebarlinks Navname={'MyEvents'}>
                <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                </Sidebarlinks>  
                <Sidebarlinks Navname={'Response'}>
                <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                </Sidebarlinks>  
           
          <Sidebarlinks Navname={'Payment'}>
                <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                </Sidebarlinks>    
            <li className="relative px-6 py-4">
              
                <span className="ml-3">Settings</span>
            
            </li>
            <Sidebarlinks Navname={'Profile'}>
                <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                </Sidebarlinks>  
        
            <Sidebarlinks Navname={'Sign Out'}>
                <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                </Sidebarlinks>  
           
          </ul>
          <div className="px-6 my-6">
            
            <div className=" w-full px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yancolour border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
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

export default Mobilesidebar