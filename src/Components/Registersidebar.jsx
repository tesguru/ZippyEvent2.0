import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { data } from "../data/data";

const Registersidebar = ({children}) => {
  return (
    <div className=" bg-[#EBF8FF] h-screen flex justify-center items-center select-none">
    <div className="bg-white sm:w-[60rem] h-[35rem] mt-[100px] sm:mt-0 rounded-xl shadow-xl  flex flex-col sm:flex sm:flex-row gap-10">
    <aside className="absolute top-0 left-0 right-[100%] sm:relative bg-mobile sm:bg-zippy sm:bg-cover bg-no-repeat w-[100%] h-[100%] pt-8 sm:pl-8 sm:basis-[30%] sm:rounded-lg flex items-start justify-center sm:flex-col sm:justify-start">
      {data.map((item, idx) => {
        return (
          <div
            key={idx}
            className="flex items-center space-x-4 leading-4 sm:mb-10"
          >
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#000" : "hsl(229, 24%, 87%)",
                background: isActive ? "hsl(228, 100%, 84%)" : "transparent",
                border: isActive ? "none" : "2px solid hsl(229, 24%, 87%)",
                fontWeight: "500",
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              })}
              to={item.linkTo}
            >
              {item.id}
            </NavLink>
            <div>
              <p className="hidden sm:block uppercase text-white text-[14px]">
                {item.step}
              </p>
              <p className="hidden sm:block uppercase text-white font-[500] tracking-wider">
                {item.title}
              </p>
            </div>
          </div>
               
        );
      })}
    </aside>
    <div className="sm:basis-[60%] w-[300px] sm:w-[100%] h-[100%] sm:pr-[80px]">
      <h1 className="mt-10 text-3xl font-[800] mb-2 text-primary-marineBlue">
        Create Account
      </h1>
      {children}
     </div>

    </div>
    </div>
  );
};

export default Registersidebar;
