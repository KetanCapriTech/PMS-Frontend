import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { Button, Card } from "@mui/material";

function Group() {
  const [userData, setUserData] = useState([]);
  const [members, setMembers] = useState([]);
  const [leaderEmail, setLeaderEmail] = useState("");
  const [loading, setLoading] = useState(false);

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
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {memberArray.map((member, index) => {
            const memberId = Object.keys(member)[0];
            const memberData = member[memberId];
            return (
              <div key={memberId} className=" rounded-lg shadow-md  p-6 mr-4">
                <Card style={{ backgroundColor: "#e3f2fd" }}>
                  <h2 className="text-lg font-bold text-black  underline mb-4 p-2">
                    {memberData.name}
                  </h2>
                  <p className="mb-2 p-2 text-lg">Email : {memberData.email}</p>
                  <p className="mb-2 p-2 ">
                    Enrollment Number : {memberData.enrollment_number}
                  </p>

                  {user_Id === leaderEmail && index === 0 && (
                    <p className="mb-3 p-5 font-bold"></p>
                  )}

                  <div className="text-right">
                    {user_Id === leaderEmail && index !== 0 ? (
                      <Button
                        className="mb-4 ml-4 mr-4"
                        onClick={() => handleDelete(memberData._id)}
                        variant="contained"
                        color="error"
                      >
                        Delete Member
                      </Button>
                    ) : null}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Group;
