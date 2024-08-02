import React, { useEffect } from 'react'



const Dashboardcard = ({Label, value, children, colour, todayvalue, colour2}) => {
    
  return (
    
    <>
 
  <div className="max-w-md rounded-lg border px-6 pt-5 pb-7">
      <div className={`inline-block rounded-full border-8 p-2 ${colour}`}>
      {children}
      </div>
   
      <p className="text-sm font-medium text-gray-500">{Label}</p>
      <p className="text-4xl font-medium text-black-800">{value}</p>
      <span className={`float-right rounded-full px-1 text-sm font-medium ${colour}`}>
        
        Today:{todayvalue}</span>
    </div>
</>

  )
}

export default Dashboardcard