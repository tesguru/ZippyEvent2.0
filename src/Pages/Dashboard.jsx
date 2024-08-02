import React from 'react'
import image4 from '../assets/Images/zippylogo.png'
import DestopLayout from '../Components/Destopsidebar'
import Mobilesidebar from '../Components/Mobilesidebar'
import Header from '../Components/Header'
import Layout from '../Components/Layout'
import Dashboardcard from '../Components/Dashboardcard';
import {  useSelector} from 'react-redux';
import DashboardcardLayout from '../Components/DashboardcardLayout';
import Basictable from '../Components/Basictable';




const Dashboard = () => {
    const eventLogValue = useSelector((state => state.misc.miscellaneousdata?.eventLog));
    const usereventValue = useSelector((state) => state.misc.miscellaneousdata?.userEvents);
      const dataList = eventLogValue?.result?.list || [];
      const dataList2 = usereventValue?.result?.event_list || [];
  const columns = [
    { id: 'insertedDt', header: 'Inserted Date', accessorKey: 'insertedDt' },
    { id: 'eventId', header: 'Event ID', accessorKey: 'eventId' },
  ];
  const columns2 = [
    {id:'event_id', header:'Event ID', accessorKey:'event_id'},
    {id:'event_name', header:'Event Name', accessorKey:'event_name'},
    {id:'status', header:'Status', accessorKey:'status', cell: ({ getValue }) => getValue() },
    {id:'inserted_dt', header:'Inserted Date', accessorKey:'inserted_dt'},
  ]

  const data = dataList.map(item => ({
    insertedDt: item.insertedDt,
    eventId: item.eventId,
  }));
  const data2 = dataList2.map(item => ({
    event_id: item.event_id,
    event_name: item.event_name,
    status: (() => {
        if (item.status === '0') {
          return (
            <span className="text-center align-baseline inline-flex p-1  mr-auto items-center  leading-none text-white bg-blue-800 rounded-lg">
              In Progress
            </span>
          );
        } else if (item.status === 1) {
          return (
            <span className="text-center align-baseline inline-flex  mr-auto items-center font-semibold text-[.95rem] leading-none text-green-600 bg-green-200 rounded-lg">
              Completed
            </span>
          );
        } else if (item.status === 2) {
          return (
            <span className="text-center align-baseline inline-flex  mr-auto items-center font-semibold text-[.95rem] leading-none text-red-600 bg-red-200 rounded-lg">
              Failed
            </span>
          );
        } else {
          return (
            <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-gray-600 bg-gray-200 rounded-lg">
              Unknown
            </span>
          );
        }
      })(),
    inserted_dt: item.inserted_dt,
  }));
  return (
    <>
     <Layout>
     
     <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <h2 className="my-6 text-2xl font-extrabold text-zippy">
              Dashboard
            </h2>
            { /* CTA */ }
          
            { /* Cards */ }
            <div className="grid gap-6 mb-2 md:grid-cols-2 xl:grid-cols-3">
            
       <DashboardcardLayout></DashboardcardLayout>
            </div>

            { /* New Table */ }
         

            { /* Charts */ }
            <h2 className="my-6 text-2xl font-extrabold text-zippy ">
              Activities
            </h2>
            <div className="grid grid-cols-12  gap-2 mb-8 ">
              <div className="min-w-0 p-4 bg-white rounded-lg shadow-md col-span-4">
                <h4 className="mb-4 font-extrabold text-black ">
                  Recent Response
                </h4>
              <Basictable data={data} columns={columns}></Basictable>
              </div>
              <div className="min-w-0 p-4 bg-white rounded-lg shadow-md col-span-8">
                <h4 className="mb-4 font-extrabold text-black ">
                  Recent Events
                </h4>
                <Basictable data={data2} columns={columns2}></Basictable>
              </div>
            </div>
          </div>
        </main>
  
     </Layout>
       
    </>
  )
}

export default Dashboard
