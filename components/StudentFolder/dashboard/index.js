import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";

function ProjectDetails() {
  const [userData, setUserData] = useState([]);

  let token;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("token");
  }

  //project details
  const fetchDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/student/dashboard`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setUserData(data);

      // console.log(facultyID);
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md  p-4 flex-grow ">
        <h1 className="font-bold text-xl mb-2 pb-2">Project Details</h1>
        {userData.length === 0 ? (
          <div>
            Project not created yet
            <br></br>
            <br></br>
            <Button>Create Project</Button>
            <Button>Join Project</Button>
          </div>
        ) : (
          <div>
            <div className="mb-2">
              <strong>Title : </strong>
              {userData.projectTitle}
            </div>

            <div className="mb-2">
              <strong>Description : </strong>
              {userData.projectDescription}
            </div>

            <div className="mb-2">
              <div className="flex">
                <strong>Project Log : </strong>
                {userData.project_isApproved.length === 0 ? (
                  <div className="mb-2">{userData.project_isApproved}</div>
                ) : (
                  <div>No Data</div>
                )}
              </div>
            </div>
            <div className="mb-2">
              <strong>Project Status : </strong>
              {userData.project_status}
            </div>
            <div className="mb-2">
              <strong>Total Members : </strong>
              {userData.totalMembers}
            </div>
            <div className="mb-2">
              <strong>Company : </strong>
              {userData.project_company}
            </div>
            <div className="flex">
              <strong>Comments : </strong>
              {userData.project_company.length === 0 ? (
                <div className="mb-2">{userData.project_comments}</div>
              ) : (
                <div> No comments yet</div>
              )}
            </div>
            <div className="mb-2">
              <strong>Project Type : </strong>
              {userData.project_type}
            </div>
          </div>
        )}
      </div>

      <br></br>
      <div className="bg-white rounded-lg shadow-md  flex-grow ">
        <div className="p-4 ">
          <div className="font-bold text-xl mb-2">Group Members</div>
          <div className="text-gray-900 font-semibold mb-2">
            {userData.groupMembers}
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="bg-white rounded-lg shadow-md  p-4 flex-grow ">
        <strong className="font-bold text-xl mb-2">Mentor</strong>
        {userData.length === 0 ? (
          <div>No mentor assigned</div>
        ) : (
          <div>
            <br />
            <div className="text-gray-900 font-bold text-xl">
              {userData.facultyName}
            </div>
            <div className="text-gray-900 font-semibold mb-2">
              {userData.facultyEmail}
            </div>
            <div className="text-gray-900 font-semibold mb-2">
              {userData.facultyPhone}
            </div>
          </div>
        )}
      </div>
      <br></br>
      <br></br>
      <div className="bg-white rounded-lg shadow-md  p-4 flex-grow ">
        <strong className="font-bold text-xl mb-2">Leader</strong>
        {userData.length === 0 ? (
          <div>No Data </div>
        ) : (
          <div>
            <br />
            <div className="text-gray-900 font-bold text-xl">
              {userData.leaderName}
            </div>
            <div className="text-gray-900 font-semibold mb-2">
              {userData.leaderEmail}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
