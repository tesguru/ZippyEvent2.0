import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebarlinks = ({ children, Navname, pathname, onClick }) => {
  return (
    <NavLink
      to={pathname}
      className={({ isActive }) =>
        `flex items-center justify-start rounded-xl w-[80%] ml-2 pt-1 ${
          isActive ? ' bg-zippy text-white' : 'text-black'
        }`
      }
      onClick={onClick}  // Add the onClick handler here
    >
      <li className="relative px-6 py-3 ml-4">
        <span className="inline-flex items-center w-full text-sm font-extrabold transition-colors duration-150 hover:text-gray-800 ">
          {children}
          <span className="ml-4 font-extrabold ">{Navname}</span>
        </span>
      </li>
    </NavLink>
  );
};

export default Sidebarlinks;
