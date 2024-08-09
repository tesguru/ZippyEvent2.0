import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/Login'; // Replace with actual path to your Login page component
import DashboardPage from './Pages/Dashboard'; // Replace with actual path to your Dashboard page component
import IndexPage from './Pages/index'; 
import Event from './Pages/Event';// Replace with actual path to your Index page component
import Response from './Pages/Response';
import Payment from './Pages/Payment';
import Account from './Pages/Account';
import CreateEvent from './Pages/CreateEvent';
import Viewevents from './Pages/Viewevents';
import PrintAccessCard from './Pages/Accesscard';
import Register from './Pages/Register';
import Registeruser from './Pages/Registeruser';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registeruser/:id?" element={<Registeruser />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/events" element={<Event />} />
        <Route path="/response" element={<Response />} />
        <Route path="/response/:id?" element={<Response />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/:id?" element={<Payment />} />
        <Route path="/account" element={<Account />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/viewevents" element={<Viewevents/>}/>
        <Route path='/viewevents/:id?' element={<Viewevents />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
