import React from 'react';
import image3 from '../assets/Images/event.jpg';
import { NavLink } from 'react-router-dom';

const Eventcard = ({ eventName, pathName }) => {
  return (
    <div className="xl:w-1/5 md:w-1/2 p-2 w-full">
      <NavLink to={pathName}>
        <div className="bg-opacity-40 p-2 rounded-lg shadow-md">
          <img className="h-40 rounded w-full object-cover object-center mb-6" src={image3} alt="content" />
          <h3 className="text-black font-extrabold text-sm pb-2">{eventName}</h3>
        </div>
      </NavLink>
    </div>
  );
}

export default Eventcard;
