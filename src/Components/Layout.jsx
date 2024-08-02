import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventLog, getUserEvents, getPaymentEvents } from '../data/local/reducers/Miscellaneousslicereducer'; // Ensure these paths are correct
import image4 from '../assets/Images/zippylogo.png';
import DestopLayout from '../Components/Destopsidebar';
import Mobilesidebar from '../Components/Mobilesidebar';
import Header from '../Components/Header';
import ProtectedRoute from './ProtectedRoute';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const loginProfile = useSelector((state) => state.auth.loginProfile);

  useEffect(() => {
    if (loginProfile?.result) {
      dispatch(getUserEvents(loginProfile.result.username));
      dispatch(getEventLog(loginProfile.result.username));
      dispatch(getPaymentEvents(loginProfile.result.account_number));
    }
  }, [dispatch, loginProfile]);

  return (
    <ProtectedRoute>
    <div className="flex h-screen bg-gray-50">
      { /* Desktop sidebar */ }
      <DestopLayout />
      
      { /* Mobile sidebar */ }
      <Mobilesidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        {children}
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default Layout;
