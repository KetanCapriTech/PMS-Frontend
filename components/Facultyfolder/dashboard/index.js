import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
function Dashboard() {
  const [totalAcceptedProjects, setTotalAcceptedProjects] = useState("");
  const [totalRequests, setTotalRequests] = useState("");
  const [totalStudents, setTotalStudents] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Replace with your actual token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/faculty/dashboard`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setTotalAcceptedProjects(data.totalAcceptedProjects);
      setTotalRequests(data.totalRequests);
      setTotalStudents(data.totalStudents);
      console.log(totalAcceptedProjects, totalRequests, totalStudents);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div class="flex justify-center">
          <div class="flex items-center bg-white p-4 rounded-lg shadow-md mr-4">
            <div>
              <div class="text-gray-800 font-bold mb-2">
                Total Accepted Projects
              </div>
              <div class="text-3xl font-extrabold text-indigo-600">
                {totalAcceptedProjects}
              </div>
            </div>
          </div>
          <div class="flex items-center bg-white p-4 rounded-lg shadow-md mr-4">
            <div>
              <div class="text-gray-800 font-bold mb-2">Total Requests</div>
              <div class="text-3xl font-extrabold text-indigo-600">
                {totalRequests}
              </div>
            </div>
          </div>
          <div class="flex items-center bg-white p-4 rounded-lg shadow-md">
            <div>
              <div class="text-gray-800 font-bold mb-2">Total Students</div>
              <div class="text-3xl font-extrabold text-indigo-600">
                {totalStudents}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
