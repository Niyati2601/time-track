import React, { useState } from 'react';
import noData1 from '../../assets/noData1.png';
import feedback from '../../assets/feedback.jpg';

const FeedBack = () => {
  const [activeTab, setActiveTab] = useState('send'); // State to manage active tab
  const [feedbackType, setFeedbackType] = useState('general'); // State to manage feedback type

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFeedbackTypeClick = (type) => {
    setFeedbackType(type);
  };

  const gradientBorderStyle = {
    borderImage: 'linear-gradient(50deg, #2178fb, rgba(33, 120, 251, 0.3)) 1',
  };

  return (
    <div>
      <div className="text-md font-medium text-center text-gray-500 border-b border-gray-200"> {/* Increased font size */}
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <a
              href="#"
              onClick={() => handleTabClick('send')}
              className={`inline-block p-4 border-b-4 rounded-t-lg ${ /* Increased border width */
                activeTab === 'send' ? 'text-blue-600 border-b-4 border-blue-600 rounded-t-lg active' : 'border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300'
              }`}
              style={activeTab === 'send' ? gradientBorderStyle : {}}
            >
              Send Feedback
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              onClick={() => handleTabClick('given')}
              className={`inline-block p-4 border-b-4 rounded-t-lg ${ /* Increased border width */
                activeTab === 'given' ? 'text-blue-600 border-b-4 border-blue-600 rounded-t-lg active' : 'border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300'
              }`}
              style={activeTab === 'given' ? gradientBorderStyle : {}}
            >
              Given Feedback [0]
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              onClick={() => handleTabClick('received')}
              className={`inline-block p-4 border-b-4 rounded-t-lg ${ /* Increased border width */
                activeTab === 'received' ? 'text-blue-600 border-b-4 border-blue-600 rounded-t-lg active' : 'border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300'
              }`}
              style={activeTab === 'received' ? gradientBorderStyle : {}}
            >
              Received Feedback [0]
            </a>
          </li>
        </ul>
      </div>
      {/* Display different content based on the active tab */}
      {activeTab === 'send' && (
        <div className="mt-4 bg-white shadow-lg rounded-md p-8 flex">
          {/* Form for sending feedback */}
          <div className='w-1/2'>
            <div className="mb-4 text-gray-700 p-3 border border-b-1 bg-white shadow-md ">
              <h1 className='text-2xl font-semibold'>Feedback Form</h1>
              <p className='text-md'>
                We would love to hear your thoughts, suggestions, concerns or problems with anything so we can improve!
              </p>
            </div>
            <div className="mb-4">
              <h3 className='text-lg'>Feedback Type</h3>
              <div className="flex justify-between items-center mt-4"> {/* Make button and rating in one row */}
                <div className="flex gap-4 mt-3 text-gray-600 justify-start">
                  <button
                    className={`border p-2 rounded-md shadow-md ${feedbackType === 'general' ? 'border-2 border-green-500 text-green-500' : 'border-gray-400'}`}
                    onClick={() => handleFeedbackTypeClick('general')}
                  >
                    General
                  </button>
                  <button
                    className={`border p-2 rounded-md shadow-md ${feedbackType === 'personal' ? 'border-2 border-green-500 text-green-500' : 'border-gray-400'}`}
                    onClick={() => handleFeedbackTypeClick('personal')}
                  >
                    Personal
                  </button>
                </div>
                <div className="flex mt-1 gap-0.5">
                  {/* Rating stars */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`h-8 w-8 shrink-0 ${index < 3 ? 'fill-amber-400' : 'fill-gray-300'}`}
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"
                      ></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            {feedbackType === 'personal' && (
              <><div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Select Project Name
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="category"
                >
                  <option>Category 1</option>
                  <option>Category 2</option>
                  <option>Category 3</option>
                </select>
              </div><div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Select Employee
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="category"
                  >
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                  </select>
                </div></>
            )}
            <div className="mb-4">
              <p className='text-lg text-gray-600'>
                Your feedback matters! Help us improve by sharing your general thoughts. We value your input and strive to continually enhance your experience with TimeTrack.
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback">
                Describe Your Feedback
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="feedback"
                placeholder="Type your feedback..."
                rows={8}
              ></textarea>
              <p className='flex justify-end text-sm text-gray-500'>0/1024</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="checkbox" />
              <input
                className=""
                id="checkbox"
                type="checkbox"
              />
              <span className="ml-2 text-md text-gray-500">Send anonymously</span>
              <p className='text-gray-500 font-bold mt-2'>
                Note: By checking this box, your feedback will remain private and won't appear in the given feedback section.
                Rest assured, we do not store any of your data, ensuring your privacy and confidentiality within the platform.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Submit Feedback
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <div className="mt-10 m-auto w-full flex justify-center items-center object-contain p-10">
              <img src={feedback} alt="noData" className="" />
            </div>
          </div>
        </div>
      )}
      {activeTab === 'given' && (
        <div className="mt-4 w-full flex justify-center items-center">
          <img src={noData1} alt="noData" className="" />
        </div>
      )}
      {activeTab === 'received' && (
        <div className="mt-4 w-full flex justify-center items-center">
          <img src={noData1} alt="noData" className="" />
        </div>
      )}
    </div>
  );
};

export default FeedBack;
