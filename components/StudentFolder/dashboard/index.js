import { Button, Input } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function ProjectDetails() {
  const [userData, setUserData] = useState([]);
  const [facultId, setFacultId] = useState([]);
  const [allStudentData, setAllStudentData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const token = localStorage.getItem("token");
  const [mentorId, setMentorId] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userId = localStorage.getItem("id");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //project details
  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // Replace with your actual token

      const response = await fetch(
        `http://localhost:5000/api/projects/student/${userId}`,
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

      const mappedData = data.map((item) => ({
        student: item.students,
      }));
      const facultyID = data.map((item) => ({
        facultId: item.leader,
      }));

      setStudentData(mappedData);
      setFacultId(facultyID[0].facultId);
      // console.log(facultyID);
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  //mentor details
  useEffect(() => {
    const fetchData = async () => {
      for (const data of studentData) {
        for (const studentId of data.student) {
          if (studentId) {
            const response = await fetch(
              `http://localhost:5000/api/users/student/${studentId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.status === 404) {
              // console.log(`Student with ID ${studentId} not found.`);
              continue; // skip to the next student ID
            }
            const newData = await response.json();

            // check if the new data already exists in the state
            const isDuplicate = allStudentData.some(
              (student) => student._id === newData.user._id
            );
            if (!isDuplicate) {
              setAllStudentData((prevData) => [...prevData, newData.user]); // add the new response to the array
            }
          }
        }
      }
    };

    fetchData();
  }, [studentData]);
  useEffect(() => {
    console.log(allStudentData);
  }, [allStudentData]);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleProjectDetailsSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          description: description,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      }
      if (!response.ok) {
        throw new Error("Error changing password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveUser = async (studentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/:id/students/${studentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove student.");
      }

      // Update allStudentData state to remove the student
      setAllStudentData(
        allStudentData.filter((student) => student._id !== studentId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchFacultyData() {
      const response = await fetch(
        `http://localhost:5000/api/users/faculty/${facultId}`,
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
      setMentorId(data.user._id);
      setMentorEmail(data.user.email);
      setMentorName(data.user.name);
    }
    fetchFacultyData();
  }, [facultId, token]);

  return (
    <div class="">
      <div className="bg-white rounded-lg shadow-md  p-4 flex-grow ">
        <h1 className="font-bold text-xl mb-2 pb-2">Project Details</h1>
        {userData.length === 0 ? (
          <div>Project not created yet</div>
        ) : (
          userData.map((data) => (
            <div>
              <div className="mb-2">
                <strong>Title : </strong>
                {data.title}
              </div>

              <div className="mb-2">
                <strong>Description : </strong>
                {data.description}
              </div>

              <div className="mb-2">
                <strong>Invite code : </strong>

                {data.invite_code}
              </div>

              <div className="mb-2">
                <strong>Status : </strong>
                {data.status}
              </div>

              <div className="mb-2">
                <strong>Capacity : </strong>
                {data.capacity}
              </div>
              {userId === mentorId ? (
                <Button onClick={handleOpen} className="bg-gray-100">
                  Edit
                </Button>
              ) : null}
            </div>
          ))
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* {"" && ( */}
          <div className="mt-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder=" Project Title"
                value={title}
                onChange={handleTitle}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                placeholder="Project Description"
                value={description}
                onChange={handleDescription}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                type="submit"
                onClick={handleProjectDetailsSubmit}
              >
                Submit
              </button>
            </div>
          </div>
          {/* )} */}
        </Box>
      </Modal>
      <br></br>
      <div className="bg-white rounded-lg shadow-md  flex-grow ">
        <div className="p-4 ">
          <div className="font-bold text-xl mb-2">Group Data</div>

          <h2 className="text-lg font-medium mb-4">All Students</h2>
          {allStudentData.length === 0 ? (
            <div className="text-gray-700 text-base mb-2">
              No students found
            </div>
          ) : (
            allStudentData.map((student, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <p className="text-gray-700 text-base mb-2">
                  <strong>Name:</strong> {student.name}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  <strong>User ID:</strong> {student._id}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  <strong>Email:</strong> {student.email}
                </p>
                <p className="text-gray-700 text-base mb-2 flex items-center">
                  <strong>Enrollment Number:</strong>{" "}
                  {student.enrollment_number}
                  {/* {!userId === mentorId ? ( */}
                  <>
                    <Button
                      className="bg-gray-100"
                      onClick={() => handleRemoveUser(student._id)}
                    >
                      Remove User
                    </Button>
                    <Button className="bg-gray-100">Update User</Button>
                  </>
                  {/* ) : null} */}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <br></br>
      <br></br>

      <div className="bg-white rounded-lg shadow-md  p-4 flex-grow ">
        <strong className="font-bold text-xl mb-2">Mentor</strong>
        {mentorName && mentorEmail ? (
          <div>
            <br />
            <div class="text-gray-900 font-bold text-xl">{mentorName}</div>
            <div class="text-gray-900 font-semibold mb-2">{mentorEmail}</div>
          </div>
        ) : (
          <div>No mentor assigned</div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
