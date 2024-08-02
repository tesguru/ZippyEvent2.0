import React from 'react';
import { useParams } from 'react-router-dom';

const PrintAccessCard = () => {
    const { accountName, eventName, eventDate, qrCode } = useParams();

    return (
        <>
        <div className='bg-blue-50 flex justify-center items-center h-screen'>
    <div className="bg-white rounded-lg shadow-lg w-[50%] p-5">
        <div className="flex justify-between items-center mb-4">
            <img src="https://via.placeholder.com/50" alt="ZippyEvents Logo" className="w-12 h-12 rounded-full" />
            <div>
                <h1 className="text-xl font-bold">ZippyEvents</h1>
                <p className="text-gray-500">Your Social Campaigns</p>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">PRINT ACCESS CARD</button>
        </div>
        <hr className="mb-4" />
        <div className="flex justify-between">
            <div>
                <h2 className="text-2xl font-bold">Eze Adanna</h2>
                <p className="text-sm text-gray-500 mt-2">Attendee For:</p>
                <p className="text-lg font-semibold">Hotel Vacation</p>
                <p className="text-sm text-gray-500 mt-2">Date:</p>
                <p className="text-lg font-semibold">2023-12-22</p>
            </div>
            <div className="flex-shrink-0 flex justify-center items-center">
                <img src="https://via.placeholder.com/150" alt="QR Code" className="w-32 h-32" />
            </div>
        </div>
    </div>
    </div>
</>
    );
};

export default PrintAccessCard;
