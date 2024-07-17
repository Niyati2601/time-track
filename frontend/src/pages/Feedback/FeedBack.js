import React, { useEffect, useState } from "react";
import noData1 from "../../assets/noData1.png";
import feedback from "../../assets/feedback.jpg";
import apiUrl from "../../api/Api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const FeedBack = () => {
  const [activeTab, setActiveTab] = useState("send");
  const [feedbackType, setFeedbackType] = useState("general");
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [rating, setRating] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [employee, setEmployee] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState("");
  const [empId, setEmpId] = useState("");
  const [receivedData, setReceivedData] = useState([]);
  const user = useSelector((state) => state.user);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleFeedbackTypeClick = (type) => {
    setFeedbackType(type);
  };
  const handleSubmit = async () => {
    try {
      const feedbackData = {
        user: user.user._id,
        username: user.user.username,
        type: feedbackType,
        description,
        isAnonymous,
        rating,
        employeeId: empId,
      };
      if (feedbackType === "personal") {
        feedbackData.projectName = projectName;
        feedbackData.employee = employee;
        // feedbackData.employeeId = empId;
      }
      const response = await fetch(apiUrl.feedback.url, {
        method: apiUrl.feedback.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Feedback submitted successfully");
        setDescription("");
        setIsAnonymous(false);
        setRating(3);
        setProjectName("");
        setEmployee("");
        setEmpId("")
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      setMessage("Failed to submit feedback");
    }
  };
  const gradientBorderStyle = {
    borderImage: "linear-gradient(50deg, #2178fb, rgba(33, 120, 251, 0.3)) 1",
  };
  const fetchFeedbacks = async () => {
    const res = await fetch(apiUrl.getAllFeedbacks.url, {
      method: apiUrl.getAllFeedbacks.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await res.json();
    if (responseData.success) {
      setData(responseData.data); // Adjust this line according to the structure of your response
    } else {
    }
  };
  const fetchReceivedFeedbacks = async () => {
    try {
      const res = await fetch(apiUrl.receivedFeedbacks.url, {
        method: apiUrl.receivedFeedbacks.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseData = await res.json();
      if (responseData.success) {
        setReceivedData(responseData.data); // Adjust this line according to the structure of your response
      } else {
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchFeedbacks();
    handleEmployee();
    fetchReceivedFeedbacks();
  }, [activeTab]);
  const handleEmployee = async () => {
    const res = await fetch(apiUrl.getAllUsers.url, {
      method: apiUrl.getAllUsers.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      setEmployees(data.data);
    }
  }
  return (
    <div>
      <div className="text-md font-medium text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <a
              href="/feedback"
              onClick={() => handleTabClick("send")}
              className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === "send"
                  ? "text-blue-600 border-b-4 border-blue-600 rounded-t-lg active"
                  : "border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                }`}
              style={activeTab === "send" ? gradientBorderStyle : {}}
            >
              Send Feedback
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              onClick={() => handleTabClick("given")}
              className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === "given"
                  ? "text-blue-600 border-b-4 border-blue-600 rounded-t-lg active"
                  : "border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                }`}
              style={activeTab === "given" ? gradientBorderStyle : {}}
            >
              Given Feedback [{data? data.length : 0}]
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              onClick={() => handleTabClick("received")}
              className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === "received"
                  ? "text-blue-600 border-b-4 border-blue-600 rounded-t-lg active"
                  : "border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                }`}
              style={activeTab === "received" ? gradientBorderStyle : {}}
            >
              Received Feedback [{receivedData ? receivedData?.length : 0}]
            </a>
          </li>
        </ul>
      </div>
      {activeTab === "send" && (
        <div className="mt-4 bg-white shadow-lg rounded-md p-8 flex">
          <div className="w-1/2">
            <div className="mb-4 text-gray-700 p-3 border border-b-1 bg-white shadow-md ">
              <h1 className="text-2xl font-semibold">Feedback Form</h1>
              <p className="text-md">
                We would love to hear your thoughts, suggestions, concerns or
                problems with anything so we can improve!
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg">Feedback Type</h3>
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-4 mt-3 text-gray-600 justify-start">
                  <button
                    className={`border p-2 rounded-md shadow-md ${feedbackType === "general"
                        ? "border-2 border-green-500 text-green-500"
                        : "border-gray-400"
                      }`}
                    onClick={() => handleFeedbackTypeClick("general")}
                  >
                    General
                  </button>
                  <button
                    className={`border p-2 rounded-md shadow-md ${feedbackType === "personal"
                        ? "border-2 border-green-500 text-green-500"
                        : "border-gray-400"
                      }`}
                    onClick={() => handleFeedbackTypeClick("personal")}
                  >
                    Personal
                  </button>
                </div>
                <div className="flex mt-1 gap-0.5">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`h-8 w-8 shrink-0 cursor-pointer ${index < rating ? "fill-amber-400" : "fill-gray-300"
                        }`}
                      viewBox="0 0 256 256"
                      onClick={() => setRating(index + 1)}
                    >
                      <path d="M239.2 97.4A16.4 16.4 0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4 0 00128 16h0a16.4 16.4 0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5 0 0016.8 97.4 16.8 16.8 0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5 0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1 0 008.7 2.6 16.5 16.5 0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8 0 00239.2 97.4z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            {feedbackType === "personal" && (
              <>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="employee"
                  >
                    Select Employee
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="employee"
                    value={employee}
                    onChange={(e) => {
                      setEmployee(e.target.value);
                      setEmpId(e.target.selectedOptions[0].getAttribute("data-id"));
                    }}
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp.username} data-id={emp._id}>
                        {emp.username}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <div className="mb-4">
              <p className="text-lg text-gray-600">
                Your feedback matters! Help us improve by sharing your general
                thoughts. We value your input and strive to continually enhance
                your experience with TimeTrack.
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="feedback"
              >
                Describe Your Feedback
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="feedback"
                placeholder="Type Your Feedback..."
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <span className="ml-2 font-semibold mt-1">
                  Send Anonymously
                </span>
              </label>
              <p className="text-gray-500 font-bold mt-2">
                Note: By checking this box, your feedback will remain private
                and won't appear in the given feedback section. Rest assured, we
                do not store any of your data, ensuring your privacy and
                confidentiality within the platform.
              </p>
            </div>
            <div className="mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Submit Feedback
              </button>
            </div>
            {message && (
              <p className="mt-4 text-sm text-green-500">{message}</p>
            )}
          </div>
          <div className="w-1/2">
            <div className="mt-10 m-auto w-full flex justify-center items-center object-contain p-10">
              <img src={feedback} alt="noData" className="" />
            </div>
          </div>
        </div>
      )}
      {activeTab === "given" && (
        <div className="mt-4 bg-white shadow-lg rounded-md p-8">
          {data.length > 0 ? (
            data &&
            data.map((feedback, index) => (
              <div
                key={index}
                className="bg-white  p-4 mb-4 flex justify-between items-center shadow-md border border-gray-300"
              >
                <div>
                  <p
                    className={`text-xl font-semibold ${feedback.type === "general"
                        ? "text-green-500"
                        : "text-red-500"
                      }`}
                  >
                    Feedback Type : {feedback.type}
                  </p>
                  {feedback.projectName ? (
                    <p className="text-md">
                      Project Name : {feedback.projectName}
                    </p>
                  ) : null}
                  {console.log('feedback: ', feedback)}
                  {feedback.employee ? (
                    <p className="text-md">Employee : {feedback.username}</p>
                  ) : null}
                  <p className=""> Description : {feedback.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <img src={noData1} alt="No Data" className="w-100 mx-auto mb-4" />
              <p className="text-gray-700">No Feedback Given</p>
            </div>
          )}
        </div>
      )}
      {activeTab === "received" && (
        <div className="mt-4 bg-white shadow-lg rounded-md p-8">
          {receivedData.length > 0 ? (
            receivedData &&
            receivedData.map((feedback, index) => (
              <div
                key={index}
                className="bg-white  p-4 mb-4 flex justify-between items-center shadow-md border border-gray-300"
              >
                <div>
                  <p
                    className={`text-xl font-semibold ${feedback.type === "general"
                        ? "text-green-500"
                        : "text-red-500"
                      }`}
                  >
                    Feedback Type : {feedback.type}
                  </p>
                  {feedback.projectName ? (
                    <p className="text-md">
                      Project Name : {feedback.projectName}
                    </p>
                  ) : null}
                  {console.log('feedback: ', feedback)}
                  {feedback.employee ? (
                    <p className="text-md">Employee : {feedback.username}</p>
                  ) : null}
                  <p className=""> Description : {feedback.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <img src={noData1} alt="No Data" className="w-100 mx-auto mb-4" />
              <p className="text-gray-700">No Feedback Received</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default FeedBack;