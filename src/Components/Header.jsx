import React from 'react';
import { useSelector } from 'react-redux';
import image1 from '../assets/Images/lalal.jpg'

const Header = () => {
  const loginProfile = useSelector((state) => state.auth.loginProfile);
 

  return (
    <>
      <div className="z-10 py-4 bg-white shadow-md ">
      
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-black dark:text-purple-300">
            { /* Mobile hamburger */ }
            <button className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"  aria-label="Menu">
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            { /* Search input */ }
            <div className="flex justify-center flex-1 lg:mr-32">
              {/* <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                <div className="absolute inset-y-0 flex items-center pl-2">
                  <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600  dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input" type="text" placeholder="Search for projects" aria-label="Search" />
              </div> */}
            </div>
            <ul className="flex items-center flex-shrink-0 space-x-6">
              { /* Theme toggler */ }
              <li className="flex">
                <button className="rounded-md focus:outline-none focus:shadow-outline-purple" aria-label="Toggle color mode">
                  <template  />
                  <template  />
                </button>
              </li>
              { /* Notifications menu */ }
              <li className="relative">
                <button className="relative align-middle text-zippy font-extrabold rounded-md focus:outline-none focus:shadow-outline-purple"  aria-label="Notifications" aria-haspopup="true">
               Welcome, {loginProfile?.result?.firstname || 'Guest'}
                 
                </button>
                <template />
              </li>
              { /* Profile menu */ }
              <li className="relative">
                <button className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none" aria-label="Account" aria-haspopup="true">
                  <img className="object-cover w-8 h-8 rounded-full" src={image1} alt="" aria-hidden="true" />
                </button>
                <template />
              </li>
            </ul>
          </div>
        </div>
    </>
  )
}

export default Header