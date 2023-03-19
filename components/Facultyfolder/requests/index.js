import React, { useState, useEffect } from "react";
import Card from "../../../components/Cards/CardFaculty/Card";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const Requests = () => {
  const [inputValue, setInputValue] = useState("");
  const [projectId, setProjectId] = useState("");
  const [requestData, setRequestData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  let token;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("token");
  }
  const getAllRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/faculty/requests`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      const requestArray = Object.keys(data).map((key) => data[key]);
      setRequestData(requestArray);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRequests();
  }, []);

  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/reject/${id}`,
        {
          method: "POST",
          body: JSON.stringify({
            comments: inputValue,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setShowRejectPopup(false);
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleApproved = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/approve/${id}`,
        {
          method: "POST",
          body: JSON.stringify({
            comments: inputValue,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setShowPopup(false);
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardClick = (id) => {
    setSelectedRequestId(id);
    setShowPopup(true);
    setProjectId(id);
  };

  const handleRejectClick = () => {
    setShowPopup(false);
    setShowRejectPopup(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // console.log(inputValue);
  };

  return (
    <>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requestData && requestData.length > 0 ? (
            requestData.map((request) => (
              <div key={request.projectId} className="mb-4">
                <Card
                  title={request.title}
                  description={request.description}
                  onClick={() => handleCardClick(request.projectId)}
                />
              </div>
            ))
          ) : (
            <p className="text-red-500">There are no requests to show</p>
          )}
          {showPopup && selectedRequestId && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div
                  className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Comment
                      </h3>
                      <div className="mt-2">
                        <div className="mt-4 flex justify-end">
                          <button
                            type="button"
                            className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none"
                            onClick={() => setShowPopup(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-black bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            onClick={() => handleApproved(projectId)}
                          >
                            Approve project
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={() => setStatus("reject")}
                          >
                            Reject project
                          </button>
                        </div>
                        {status === "reject" && (
                          <div className="mt-4">
                            <input
                              type="text"
                              className="border border-gray-300 rounded-md w-full px-3 py-2"
                              placeholder="Enter some text"
                              value={inputValue}
                              onChange={handleInputChange}
                              required
                            />
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
                              onClick={() => handleReject(projectId)}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Requests;
