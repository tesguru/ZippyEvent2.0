import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../Components/Layout';
import Datatable from '../Components/Datatable';


const Payment = () => {
    const paymentEventValue = useSelector((state => state.misc.miscellaneousdata?.paymentEvent));
    console.log(paymentEventValue);
    const dataList = paymentEventValue?.result?.payment_list || [];
    const navigate = useNavigate();
  
    const columns = [
        { id: 'sn', header: 'S/N', accessorKey: 'sn' },
        {id:'account_number', header:'Account Number', accessorKey:'account_number'},
        {id:'amount', header:'Amount', accessorKey:'amount'},
        {id:'amount_paid', header:'Amount Paid', accessorKey:'amount_paid'},
        {id:' registered_date', header:'Register Date', accessorKey:'registered_date'},
        {id:'payment_status', header:'Payment Status', accessorKey:'payment_status', cell: ({ getValue }) => getValue() },
      { 
        id: 'action', 
        header: 'Action', 
        accessorKey: 'action',
        cell: ({ row }) => row.original.action 
      }
    ];
  
    const handleViewEvent = (eventId) => {
      navigate(`/viewevents/${eventId}`);
    };
  
    const data = dataList.map((item, index) => ({
      sn: index + 1,
      account_number: item.account_number,
      amount: item.amount,
      amount_paid:'N'+item.amount_paid,
      registered_date: item.registered_date,
      payment_status: (() => {
        if (item.payment_status === '0') {
          return (
            <span className="text-center align-baseline inline-flex p-2  mr-auto items-center  leading-none text-white bg-green-600  rounded-lg">
              Paid
            </span>
          );
        } else if (item.payment_status === '1') {
          return (
            <span className="text-center align-baseline inline-flex p-2  mr-auto items-center font-semibold text-[.95rem] leading-none text-white bg-red-600 rounded-lg">
              Not Paid
            </span>
          );
        } 
      })(),
   
      action: (
        <button
          className="border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white text-sm py-1 px-2 rounded"
          onClick={() => handleViewEvent(item.event_id)}
        >
          View Event
        </button>
      )
    }));
  
    return (
      <Layout>
        <Datatable data={data} columns={columns} heading={'Payments'} />
      </Layout>
    );
}

export default Payment