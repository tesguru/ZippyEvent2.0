import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout';
import Datatable from '../Components/Datatable';

const Response = () => {
  const eventLogValue = useSelector((state) => state.misc.miscellaneousdata?.eventLog);
  const dataList = eventLogValue?.result?.list || [];
  const navigate = useNavigate();

  const columns = [
    { id: 'sn', header: 'S/N', accessorKey: 'sn' },
    { id: 'insertedDt', header: 'Inserted Date', accessorKey: 'insertedDt' },
    { id: 'eventId', header: 'Event ID', accessorKey: 'eventId' },
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
    insertedDt: item.insertedDt,
    eventId: item.eventId,
    action: (
      <button
        className="border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white text-sm py-1 px-2 rounded"
        onClick={() => handleViewEvent(item.eventId)}
      >
        View Event
      </button>
    )
  }));

  return (
    <Layout>
      <Datatable data={data} columns={columns} heading={'Response'} />
    </Layout>
  );
};

export default Response;
