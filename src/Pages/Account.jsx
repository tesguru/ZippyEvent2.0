import React, { useState } from 'react';
import Layout from '../Components/Layout';
import { useSelector } from 'react-redux';
import image1 from '../assets/Images/lalal.jpg'
import Updateaccount from '../Components/Steps/Updateaccount';
import CreateSubAdmin from '../Components/Steps/Createsubadmin'; // Ensure this component is imported correctly

const Account = () => {
    const loginProfile = useSelector((state) => state.auth.loginProfile);
    const [activeComponent, setActiveComponent] = useState('update'); // State to track which component to show

    const handleUpdateAccountClick = () => {
        setActiveComponent('update');
    };

    const handleCreateSubAdminClick = () => {
        setActiveComponent('create');
    };

    console.log(loginProfile);

    return (
        <>
            {/* [ sample-page ] start */}
            <Layout>
                <main className="h-full overflow-y-auto">
                    <div className="container px-3 mx-auto grid">
                        <div className="">
                            <div className="container mx-auto py-8">
                                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                                    <div className="col-span-4 sm:col-span-4">
                                        <div className="bg-white shadow rounded-lg p-6">
                                            <div className="flex flex-col items-center">
                                                <img 
                                                    src={image1} 
                                                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" 
                                                />
                                                <h1 className="text-xl font-bold">{loginProfile?.result?.firstname}</h1>
                                                <p className="text-gray-700">{loginProfile?.result?.email}</p>
                                                <div className="mt-6 flex flex-wrap gap-2 text-sm justify-center">
                                                    <button 
                                                        onClick={handleUpdateAccountClick} 
                                                        className="bg-zippy hover:bg-blue-600 text-white py-2 px-2 rounded"
                                                    >
                                                        Update Account
                                                    </button>
                                                    <button 
                                                        onClick={handleCreateSubAdminClick} 
                                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-2 rounded"
                                                    >
                                                        Create Sub Admin
                                                    </button>
                                                </div>
                                            </div>
                                            <hr className="my-6 border-t border-gray-300" />
                                            <div className="flex flex-col">
                                                
                                                <ul className="border rounded-lg shadow-lg bg-white">
                                                    <li className="p-3 border border-gray-200 text-[0.9em] rounded-md">
                                                        <span className="text-zippy pr-2 font-extrabold">Phone Number:</span>
                                                        {loginProfile?.result?.phonenumber}
                                                    </li>
                                                    <li className="p-3 border border-gray-200 text-[0.9em] rounded-md">
                                                        <span className="text-zippy pr-2 font-extrabold">Admin Type:</span>
                                                        {loginProfile?.result?.type}
                                                    </li>
                                                    <li className="p-3 border border-gray-200 text-[0.9em] rounded-md">
                                                        <span className="text-zippy pr-2 font-extrabold">Zippy Account Name:</span>
                                                        {loginProfile?.result?.firstname} {loginProfile?.result?.lastname}
                                                    </li>
                                                    <li className="p-3 border border-gray-200 text-[0.9em] rounded-md">
                                                        <span className="text-zippy pr-2 font-extrabold">Zippy Account Number:</span>
                                                        {loginProfile?.result?.account_number}
                                                    </li>
                                                    <li className="p-3 border border-gray-200 text-[0.9em] rounded-md flex items-center space-x-2">
                                                        <span className="text-zippy pr-2 font-extrabold">Zippy Account Number Status:</span>
                                                        {loginProfile?.result?.account_number_status === "0" ? (
                                                            <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                                                                Active
                                                            </button>
                                                        ) : (
                                                            <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                                                                Inactive
                                                            </button>
                                                        )}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-4 sm:col-span-8">
                                        {activeComponent === 'update' && <Updateaccount />}
                                        {activeComponent === 'create' && <CreateSubAdmin />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
};

export default Account;
