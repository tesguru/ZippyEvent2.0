import React from 'react';
import Layout from '../Components/Layout';
import Eventcard from '../Components/Eventcard';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Event = () => {
  const usereventValue = useSelector((state) => state.misc.miscellaneousdata?.userEvents);
  console.log(usereventValue);

  return (
    <Layout>
      <main className="h-full overflow-y-auto">
        <div className="container px-6 mx-auto grid">
          <h2 className="my-6 text-2xl font-extrabold text-zippy">Events</h2>
          <div className="grid grid-cols-12 gap-2 mb-8">
            <div className="min-w-0 p-4 bg-white rounded-lg shadow-md col-span-12">
              <div className='flex justify-between'>
                <h4 className="mb-4 font-extrabold text-black">My Events</h4>
              
                <button type="button" className="text-zippy text-sm border-2 border-zippy rounded-md px-2">
                <NavLink to="/createevent " exact>
                  Create Event
                  </NavLink>
                </button>
              
              </div>
              <section className="text-black body-font">
                <div className="flex flex-wrap">
                  {
                    usereventValue?.result?.event_list?.map((item) => (
                      <Eventcard 
                        key={item.event_id} 
                        eventName={item.event_name} 
                        pathName={`/viewevents/${item.event_id}`}
                      />
                    ))
                  }
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Event;
