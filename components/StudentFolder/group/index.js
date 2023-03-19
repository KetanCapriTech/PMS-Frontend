import React, { useState, useEffect } from "react";
function Group() {
  const [userData, setUserData] = useState([]);
  const [members, setMembers] = useState([]);
  const [leaderEmail, setLeaderEmail] = useState("");

  let user_Id;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    user_Id = localStorage.getItem("email");
  }

  //show all accepted  project
  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/student/group`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMembers(data);
      setUserData(data);
      console.log(data);
      setLeaderEmail(data[0].member1.leaderEmail);
      console.log("sabh sahi hai");
    } catch (error) {
      console.log("kuch  sahi nahi  hai");
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  // delete member
  const handleDelete = async (memberId) => {
    console.log(memberId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/remove/${memberId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log("member deleted");
    } catch (error) {
      console.error(error);
    }
  };
  const memberArray = Object.values(members);
  return (
    <>
      {memberArray.length === 0 ? (
        <p>No data</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {memberArray.map((member, index) => {
            const memberId = Object.keys(member)[0];
            const memberData = member[memberId];

            return (
              <div key={memberId} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-bold mb-4 p-2">
                  {memberData.name}
                </h2>
                <p className="mb-2 p-2">Email: {memberData.email}</p>
                <p className="mb-2 p-2">
                  Enrollment Number: {memberData.enrollment_number}
                </p>
                {user_Id === leaderEmail && index !== 0 ? (
                  <button
                    className="text-red-500 p-2"
                    onClick={() => handleDelete(memberData._id)}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Group;
