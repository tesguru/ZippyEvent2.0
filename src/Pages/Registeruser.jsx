import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout2";
import Form from "../Components/Form";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleEvent } from "../data/local/reducers/Miscellaneousslicereducer";
import { useSelector, useDispatch } from "react-redux";
import Question from "../Components/Questionform";
import { submitForm } from "../data/remote/Subitform";

const Registeruser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleEvent = useSelector(
    (state) => state.misc.miscellaneousdata.singleEvent
  );

  useEffect(() => {
    dispatch(getSingleEvent(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleEvent?.result?.event_details) {
      setFormData((prevFormData) =>
        prevFormData.map((form) => ({
          ...form,
          event_id: singleEvent.result.event_details.eventId || "",
          event_name: singleEvent.result.event_details.event_name || "",
          event_date: singleEvent.result.event_details.event_start_date || "",
          eventAccountNumber:
            singleEvent.result.event_details.eventAccountNumber || "",
          eventAccountName:
            singleEvent.result.event_details.eventAccountName || "",
          hasPayment:
            singleEvent.result.event_details.has_payment || "",
          walletNumber:
            singleEvent.result.event_details.walletAccountNumber || "",
        }))
      );
    }
  }, [singleEvent]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [formCount, setFormCount] = useState(1);
  const [formData, setFormData] = useState([
    {
      surname: "",
      firstName: "",
      phoneNumber: "",
      address: "",
      total_question: 1,
      event_id: "",
      event_name: "",
      event_date: "",
      eventAccountNumber: "",
      eventAccountName: "",
      hasPayment: "",
      walletNumber: "",
      questions: [],
    },
  ]);
  const [selectedPaymentCategories, setSelectedPaymentCategories] = useState({});

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value]
    );
  };

  const handleRadioChange = (index, event) => {
    const { value } = event.target;
    setSelectedPaymentCategories({
      ...selectedPaymentCategories,
      [index]: value,
    });
  };

  const handleAddMore = () => {
    setFormCount(formCount + 1);
    setFormData([
      ...formData,
      {
        surname: "",
        firstName: "",
        phoneNumber: "",
        address: "",
        total_question: formCount + 1,
        event_id: singleEvent?.result?.event_details?.eventId || "",
        event_name: singleEvent?.result?.event_details?.event_name || "",
        event_date: singleEvent?.result?.event_details?.event_start_date || "",
        eventAccountNumber: singleEvent?.result?.event_details?.eventAccountNumber || "",
        eventAccountName: singleEvent?.result?.event_details?.eventAccountName || "",
        hasPayment: singleEvent?.result?.event_details?.has_payment || "",
        walletNumber: singleEvent?.result?.event_details?.walletAccountNumber || "",
        questions: [],
      },
    ]);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) =>
      prevFormData.map((form, i) =>
        i === index ? { ...form, [name]: value } : form
      )
    );
  };

  const handleQuestionChange = (index, questionIndex, value) => {
    setFormData((prevFormData) =>
      prevFormData.map((form, i) =>
        i === index
          ? {
              ...form,
              questions: form.questions.map((question, qIndex) =>
                qIndex === questionIndex ? value : question
              ),
            }
          : form
      )
    );
  };

  const handleSubmit = () => {
    const paymentCategoriesArray = formData.map(
      (_, index) => selectedPaymentCategories[index] || ""
    );
    const finalFormData = formData.map((form, index) => ({
      ...form,
      questions: form.questions || [],
      selectedCategories,
      selectedPaymentCategory: paymentCategoriesArray[index] || "",
    }));
    console.log("Form Data:", finalFormData);
    submitForm(finalFormData, navigate)
  };


  return (
    <Layout>
      <main className="h-full overflow-y-auto bg-gray-50">
        <div className="container px-4 mx-auto py-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {singleEvent?.result?.event_details?.event_name}
            </h2>
            <p className="text-base font-medium text-gray-600 mb-4">
              {singleEvent?.result?.event_details?.description}
            </p>
            <p className="text-sm font-bold text-gray-800 mb-4">
              <span className="font-bold text-xs">START DATE:</span>
              <span id="startDate" className="pl-1">
                {singleEvent?.result?.event_details?.event_start_date}
              </span>
              <span className="font-bold text-xs pl-5">END DATE:</span>
              <span id="endDate" className="pl-1">
                {singleEvent?.result?.event_details?.event_end_date}
              </span>
            </p>

            {singleEvent?.result?.event_details?.has_sub_event === "yes" && (
              <>
                <p className="font-bold text-sm uppercase text-gray-800 mb-2">
                  Event Category
                </p>
                {singleEvent?.result?.sub_event.map((sub_event_data, index) => (
                  <div key={index} className="ml-4 mb-4 border-b pb-2">
                    <div className="flex justify-between mb-1">
                      <div>
                        <span className="font-bold text-sm text-gray-700">
                          Category Name:
                        </span>{" "}
                        {sub_event_data.sub_event_name}
                      </div>
                      <div>
                        <span className="font-bold text-sm text-gray-700">
                          Date:
                        </span>{" "}
                        {sub_event_data.sub_event_date}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">
                      <span className="font-bold text-gray-700">
                        Description:
                      </span>{" "}
                      {sub_event_data.sub_event_description}
                    </span>
                  </div>
                ))}
              </>
            )}

            {singleEvent?.result?.event_details?.has_payment === "yes" && (
              <>
                {singleEvent?.result?.event_details?.general_payment ===
                "yes" ? (
                  <p className="text-sm font-bold text-gray-800 mb-4">
                    <span className="font-bold text-xs">PAYMENT:</span> General
                    Payment Amount of ₦
                    {singleEvent?.result?.event_details?.general_payment_amount}
                  </p>
                ) : (
                  <>
                    <p className="font-bold text-sm text-gray-800 mb-2">
                      PAYMENT CATEGORY
                    </p>
                    {singleEvent?.result?.payment_details.map((data, index) => (
                      <span
                        key={index}
                        className="block text-sm text-gray-600 mb-1"
                      >
                        {data.category_name} : ₦{data.category_amount}
                      </span>
                    ))}
                  </>
                )}
              </>
            )}

            <div className="mb-4">
              <p className="text-lg font-bold text-gray-800 mb-2">
                Kindly Select the Category of the event you are attending
              </p>
              <div className="ml-4">
                <ul>
                  {singleEvent?.result.sub_event.map(
                    (sub_event_data, index) => (
                      <li className="mb-2" key={index}>
                        <input
                          className="hidden"
                          id={`event_category_checkbox_${index}`}
                          type="checkbox"
                          value={sub_event_data.sub_event_name}
                          name="event_category[]"
                          checked={selectedCategories.includes(
                            sub_event_data.sub_event_name
                          )}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="flex items-center space-x-2 cursor-pointer"
                          htmlFor={`event_category_checkbox_${index}`}
                        >
                          <span
                            className={`inline-block w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center ${
                              selectedCategories.includes(
                                sub_event_data.sub_event_name
                              )
                                ? "bg-green-500"
                                : ""
                            }`}
                          >
                            <svg
                              className={`w-full h-full ${
                                selectedCategories.includes(
                                  sub_event_data.sub_event_name
                                )
                                  ? "block"
                                  : "hidden"
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                          <span className="text-gray-700">
                            {sub_event_data.sub_event_name}
                          </span>
                        </label>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className="add-more">
              {[...Array(formCount)].map((_, index) => (
                <div key={index}>
                  <div className="grid grid-cols-4 sm:grid-cols-12 gap-6">
                    <div className="col-span-4 sm:col-span-6">
                      <Form
                        LabelName={"Surname"}
                        FormName="surname"
                        formValue={formData[index]?.surname}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-6">
                      <Form
                        LabelName={"FirstName"}
                        FormName="firstName"
                        formValue={formData[index]?.firstName}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-6">
                      <Form
                        LabelName={"PhoneNumber"}
                        FormName="phoneNumber"
                        formValue={formData[index]?.phoneNumber}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-6">
                      <Form
                        LabelName={"Address"}
                        FormName="address"
                        formValue={formData[index]?.address}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                    <input
                      type="hidden"
                      name="total_question"
                      value={formData[index]?.total_question}
                    />
                    <input
                      type="hidden"
                      name="event_id"
                      value={formData[index]?.event_id}
                    />
                    <input
                      type="hidden"
                      name="event_name"
                      value={formData[index]?.event_name}
                    />
                    <input
                      type="hidden"
                      name="event_date"
                      value={formData[index]?.event_date}
                    />
                    <input
                      type="hidden"
                      name="eventAccountNumber"
                      value={formData[index]?.eventAccountNumber}
                    />
                  </div>

  {singleEvent?.result?.event_details?.questions &&
 singleEvent.result.event_details.questions.map((questionData, i) => {
   const questionType = singleEvent.result?.event_details?.question_options[i].question_type;
   const options = singleEvent.result?.event_details?.question_options[i].options.split('|');
   return (
     <Question
       key={i}
       questionData={questionData}
       index={i}
       handleQuestionChange={handleQuestionChange} // Change this line
       questionType={questionType}
       options={options}
     />
   );
 })}
 
                  {singleEvent?.result?.event_details?.has_payment ===
                    "yes" && (
                    <div className="mb-4">
                      <p className="text-lg font-bold text-gray-800 mb-2">
                        Select Your Payment Category
                      </p>
                      <div className="ml-4">
                        <ul>
                          {singleEvent?.result?.payment_details.map(
                            (data, pIndex) => (
                              <li className="mb-2" key={pIndex}>
                                <input
                                  className="hidden"
                                  id={`payment_category_radio_${index}_${pIndex}`}
                                  type="radio"
                                  value={data.category_name}
                                  name={`payment_category_${index}`}
                                  checked={
                                    selectedPaymentCategories[index] ===
                                    data.category_name
                                  }
                                  onChange={(e) => handleRadioChange(index, e)}
                                />
                                <label
                                  className="flex items-center space-x-2 cursor-pointer"
                                  htmlFor={`payment_category_radio_${index}_${pIndex}`}
                                >
                                  <span
                                    className={`inline-block w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center ${
                                      selectedPaymentCategories[index] ===
                                      data.category_name
                                        ? "bg-green-500"
                                        : ""
                                    }`}
                                  >
                                    <svg
                                      className={`w-full h-full ${
                                        selectedPaymentCategories[index] ===
                                        data.category_name
                                          ? "block"
                                          : "hidden"
                                      }`}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </span>
                                  <span className="text-gray-700">
                                    {data.category_name} : ₦
                                    {data.category_amount}
                                  </span>
                                </label>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                onClick={handleAddMore}
              >
                Add More
              </button>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="text-white bg-green-500 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};


export default Registeruser;
