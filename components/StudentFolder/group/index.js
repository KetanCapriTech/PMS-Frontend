import React, { useState, useEffect } from "react";
function Group() {
  const [userData, setUserData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [statusCode, setStatus] = useState([]);
  const [inviteCode, setInviteCode] = useState([]);
  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // Replace with your actual token
      const userId = localStorage.getItem("id");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/student/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const invitecode = data.map((item) => ({
        inviteCode: item.invite_code,
      }));
      const status = data.map((item) => ({
        status: item.status,
      }));
      setInviteCode(invitecode[0].inviteCode);
      setStatus(status[0].status);
      setStudentData(inviteCode);
      console.log(inviteCode);
      console.log(statusCode);
      setUserData(data);
      // console.log(facultId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={fetchDetails}>submit</button>
      <h1>Work In Progress</h1>
    </>
  );
}

export default Group;
