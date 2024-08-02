import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboardcard from './Dashboardcard';

const DashboardcardLayout = () => {
  const usereventValue = useSelector((state) => state.misc.miscellaneousdata?.userEvents);
  const paymentEventValue = useSelector((state => state.misc.miscellaneousdata?.paymentEvent));
  const eventLogValue = useSelector((state => state.misc.miscellaneousdata?.eventLog))
  const loading = useSelector((state) => state.misc.loading);
  const error = useSelector((state) => state.misc.error);

      console.log(paymentEventValue);
  return (
    <>
      <Dashboardcard Label={'Total Response'} value={eventLogValue?.result?.total_response || '0'} colour={'border-green-50 text-green-500 bg-green-200'} todayvalue={eventLogValue?.result?.today_event_total || '0'} colour2={'text-success-200 bg-success-50'}>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      </Dashboardcard>
      <Dashboardcard Label={'Total Events'} value={usereventValue?.result?.total_event || '0'} colour={'border-blue-50 text-blue-500 bg-blue-200'} colour2={'text-blue-200 bg-blue-50'} todayvalue={usereventValue?.result?.today_event_total || '0'}>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      </Dashboardcard>
      <Dashboardcard 
  Label={'Total Income'} 
  value={'N'+ ((paymentEventValue?.result?.payment_received_summary?.amount_paid ?? 0).toLocaleString())}
  colour={'border-red-50  text-red-500 bg-red-200'} 
  colour2={'text-blue-200  bg-blue-50'} 
  todayvalue={paymentEventValue?.result?.payment_received_summary?.today_paid || '0'}
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
</Dashboardcard>


     
      
    </>
  );
}

export default DashboardcardLayout;
