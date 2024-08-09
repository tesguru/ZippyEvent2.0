import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEvent } from "../data/local/reducers/Miscellaneousslicereducer";

import Datatable from "../Components/Datatable";

const Viewevents = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleEvent = useSelector(
    (state) => state.misc.miscellaneousdata.singleEvent
  );
  useEffect(() => {
    dispatch(getSingleEvent(id));
  }, [dispatch, id]);

  const [openPanel, setOpenPanel] = useState(null);

  const togglePanel = (panel) => {
    setOpenPanel(openPanel === panel ? null : panel);
  };

  const subeventchoice = singleEvent?.result?.event_details?.sub_event_choice;
  const hasPayment = singleEvent?.result?.event_details?.has_payment;
  const generalPayment = singleEvent?.result?.event_details?.general_payment;
  const questionDetails = singleEvent?.result?.question_details || [];
  const responses = singleEvent?.result?.response || [];
  const paymentReceivedSummary =
    singleEvent?.result?.payment_received_summary || {};
  const paymentReceived = singleEvent?.result?.payment_received || [];

  console.log("Payment Received:", paymentReceived);
  console.log("Payment Received Summary:", paymentReceivedSummary);

  const columns = [
    { id: "sn", header: "S/N", accessorKey: "sn" },
    ...(subeventchoice === "yes"
      ? [
          {
            id: "subEventSurname",
            header: "Category",
            accessorKey: "subEventSurname",
          },
        ]
      : []),
    ...(hasPayment === "yes"
      ? [
          {
            id: "accountNumber",
            header: "Account Number",
            accessorKey: "accountNumber",
          },
        ]
      : []),
    { id: "surname", header: "Surname", accessorKey: "surname" },
    { id: "firstname", header: "Firstname", accessorKey: "firstname" },
    ...(hasPayment === "yes"
      ? [{ id: "amount", header: "Amount", accessorKey: "amount" }]
      : []),
    ...(generalPayment === "no"
      ? [
          {
            id: "paymentCategory",
            header: "Payment Category",
            accessorKey: "paymentCategory",
          },
        ]
      : []),
    { id: "phoneNumber", header: "Phone Number", accessorKey: "phoneNumber" },
    { id: "inserted_dt", header: "Inserted Date", accessorKey: "inserted_dt" },
    ...questionDetails.map((question, index) => ({
      id: `question_${index}`,
      header: question.question,
      accessorKey: `question_${index}`,
    })),
    {
      id: "action",
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => row.original.action,
    },
  ];

  const paymentColumns = [
    { id: "sn", header: "SN", accessorKey: "sn" },
    {
      id: "accountNumber",
      header: "Account Number",
      accessorKey: "account_number",
    },
    { id: "amount", header: "Amount", accessorKey: "amount" },
    { id: "amountPaid", header: "Amount Paid", accessorKey: "amount_paid" },
    {
      id: "paymentStatus",
      header: "Payment Status",
      accessorKey: "payment_status",
    },
    {
      id: "paymentDate",
      header: "Date of Payment",
      accessorKey: "payment_date",
    },
  ];

  const handleViewEvent = (eventId) => {
    navigate(`/viewevents/${eventId}/`);
  };

  const data = responses.map((response, index) => {
    const fullNameParts = response.fullName.split("|");
    const surname = fullNameParts[0] || "";
    const firstname = fullNameParts[1] || "";

    const rowData = {
      sn: index + 1,
      subEventSurname: subeventchoice === "yes" ? response.category : "",
      accountNumber: hasPayment === "yes" ? response.account_number : "",
      surname,
      firstname,
      amount:
        hasPayment === "yes"
          ? isNaN(response.amount)
            ? response.amount
            : Number(response.amount).toLocaleString()
          : "",
      paymentCategory: generalPayment === "no" ? response.amountSummary : "",
      phoneNumber: response.phoneNumber,
      inserted_dt: response.inserted_dt,
      action: (
        <button
          className="border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white text-sm py-1 px-2 rounded"
          onClick={() => handleViewEvent(response.eventId)}
        >
          View Event
        </button>
      ),
    };

    questionDetails.forEach((question, qIndex) => {
      const answers = response.answer.split("|");
      rowData[`question_${qIndex}`] = answers[qIndex] || "";
    });

    return rowData;
  });

  const paymentData = paymentReceived.map((payment, index) => ({
    sn: index + 1,
    account_number: payment.account_number,
    amount: isNaN(payment.amount)
      ? payment.amount
      : Number(payment.amount).toLocaleString(),
    amount_paid: isNaN(payment.amount_paid)
      ? payment.amount_paid
      : Number(payment.amount_paid).toLocaleString(),
    payment_status: payment.payment_status === "0" ? "Paid" : "Not yet paid",
    payment_date: payment.payment_date,
  }));

  console.log("Response Data:", data);
  console.log("Payment Data:", paymentData);

  return (
    <Layout>
      <main className="h-full overflow-y-auto">
        <div className="container px-3 mx-auto grid">
          <div className="text-end">
            <NavLink to="/events" exact>
              <h2 className="text-1xl text-zippy pt-3 pr-3">Back</h2>
            </NavLink>
          </div>
          <div>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-9 mx-auto flex items-center md:flex-row flex-col">
                <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
                  <h1 className="md:text-3xl text-2xl font-medium title-font text-zippy mb-4">
                    {singleEvent?.result?.event_details?.event_name}
                  </h1>
                  <h2 className="text-sm text-black font-extrabold title-font mb-1 text-black">
                    Event Start Date:{" "}
                    {singleEvent?.result?.event_details?.event_start_date}
                  </h2>
                  <h2 className="text-sm text-black font-extrabold title-font mb-1 text-black">
                    Event End Date:{" "}
                    {singleEvent?.result?.event_details?.event_end_date}
                  </h2>
                  <h2 className="text-sm text-black font-extrabold title-font mb-1">
                    Event Link:
                  </h2>
                </div>
                <div className="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
                  <NavLink to={`/registeruser/${id}/`} exact>
                    <button className="bg-green-200 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                      <span className="title-font font-medium">
                        Register User
                      </span>
                    </button>{" "}
                  </NavLink>
                  <button className="bg-red-400 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                    <span className="title-font font-medium">Delete Event</span>
                  </button>
                  <button className="bg-red-200 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                    <span className="title-font font-medium">Stop Event</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div id="accordion-collapse" data-accordion="collapse">
            <h2 id="accordion-collapse-heading-1">
              <button
                type="button"
                className="flex items-center justify-between w-full p-4 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 gap-3"
                onClick={() => togglePanel(1)}
                aria-expanded={openPanel === 1}
                aria-controls="accordion-collapse-body-1"
              >
                <span>Response</span>
                <svg
                  data-accordion-icon=""
                  className={`w-3 h-3 ${openPanel === 1 ? "rotate-180" : ""}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-1"
              className={openPanel === 1 ? "block" : "hidden"}
              aria-labelledby="accordion-collapse-heading-1"
            >
              <div className="p-5 border border-b-0 border-gray-200">
                <Datatable data={data} columns={columns} />
              </div>
            </div>
            {hasPayment === "yes" && (
              <>
                <h2 id="accordion-collapse-heading-2">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full p-4 font-medium text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 gap-3"
                    onClick={() => togglePanel(2)}
                    aria-expanded={openPanel === 2}
                    aria-controls="accordion-collapse-body-2"
                  >
                    <span>Payment Details</span>
                    <svg
                      data-accordion-icon=""
                      className={`w-3 h-3 ${
                        openPanel === 2 ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-collapse-body-2"
                  className={openPanel === 2 ? "block" : "hidden"}
                  aria-labelledby="accordion-collapse-heading-2"
                >
                  <div className="p-5 border border-b-0 border-gray-200">
                    <Datatable data={paymentData} columns={paymentColumns} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Viewevents;
