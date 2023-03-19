import { Button, FormLabel, InputLabel } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

function ProjectDetails() {
  const [userData, setUserData] = useState([]);
  const [inviteCode, setInviteCode] = useState("");
  const [semester, setSemester] = useState("");
  const [title, setTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [description, setDescription] = useState("");
  const [frontendTechnologies, setFrontendTechnologies] = useState("");
  const [backendTechnologies, setBackendTechnologies] = useState("");
  const [capacity, setCapacity] = useState("");
  const [company, setCompany] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [database, setDatabase] = useState("");
  const [openJoinModal, setOpenJoinModal] = React.useState(false);
  const handleOpenJoinModal = () => setOpenJoinModal(true);
  const handleCloseJoinModal = () => setOpenJoinModal(false);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateProModal = () => setOpenCreateModal(true);
  const handleCloseCreateProModal = () => setOpenCreateModal(false);
  const [facultyList, setFacultyList] = useState([]);
  const [faucltyID, setFacultyID] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let token;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("token");
  }

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

  //fetch faculty list
  useEffect(() => {
    const fetchFacultyID = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/faculty/available`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setFacultyList(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchFacultyID();
  }, []);
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

  //create project
  const createProject = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
        {
          method: "POST",
          body: JSON.stringify({
            title: title,
            description: description,
            faculty_id: faucltyID,
            project_type: projectType,
            semester: semester,
            frontendTechnologies: frontendTechnologies,
            backendTechnologies: backendTechnologies,
            database: database,
            company: company,
            company_email: companyEmail,
            capacity: capacity,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log("joined");
    } catch (error) {
      console.error(error);
    }
  };

  {
    /*join project*/
  }
  const joinProject = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/join/`,
        {
          method: "POST",
          body: JSON.stringify({ invite_code: inviteCode }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log("joined");
    } catch (error) {
      console.error(error);
    }
  };
  const handleInviteCode = (event) => {
    setInviteCode(event.target.value);
  };
  const handletitle = (event) => {
    setTitle(event.target.value);
  };
  const handledescription = (event) => {
    setDescription(event.target.value);
  };

  const handleproject_type = (event) => {
    setProjectType(event.target.value);
  };
  const handleSemester = (event) => {
    setSemester(event.target.value);
  };
  const handlefrontendTechnologies = (event) => {
    setFrontendTechnologies(event.target.value);
  };
  const handlebackendTechnologies = (event) => {
    setBackendTechnologies(event.target.value);
  };
  const handledatabase = (event) => {
    setDatabase(event.target.value);
  };
  const handlecompany = (event) => {
    setCompany(event.target.value);
  };
  const handlecompany_email = (event) => {
    setCompanyEmail(event.target.value);
  };
  const handlecapacity = (event) => {
    setCapacity(event.target.value);
  };

  // dropdown logic to select id and set into selectedID state or veriable to send to backend
  const handleSelect = (event) => {
    const selectedId = Object.keys(facultyList).find(
      (id) => facultyList[id].name === event.target.value
    );
    setFacultyID(selectedId);
    console.log(faucltyID);
  };
  return (
    <div>
      {/* join project modal */}
      <Modal
        open={openJoinModal}
        onClose={handleCloseJoinModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="p-4">Enter Invite Code</div>
            <TextField
              required
              id="outlined-required"
              onChange={handleInviteCode}
            />
            <Button onClick={joinProject}>Join</Button>
          </div>
        </Box>
      </Modal>
      {/* create project modal */}
      <Modal
        open={openCreateModal}
        onClose={handleCloseCreateProModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-4">
            <strong>Project Details</strong>
          </div>

          <div>
            <TextField
              required
              id="outlined-required"
              placeholder="title"
              onChange={handletitle}
            />

            <div>
              <InputLabel>Description</InputLabel>
              <TextField
                required
                id="outlined-required"
                onChange={handledescription}
              />
            </div>
            <InputLabel>Select a faculty:</InputLabel>

            <div>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <select id="dropdown" onChange={handleSelect}>
                  <option value="">--Select Faculty--</option>
                  {Object.keys(facultyList).map((id) => (
                    <option key={id} value={facultyList[id].name}>
                      {facultyList[id].name}
                    </option>
                  ))}
                </select>
              )}
              {/* {selectedName && <p>Selected name: {selectedName}</p>} */}
            </div>

            <InputLabel>Project Type</InputLabel>
            <select onChange={handleproject_type}>
              <option value="">Select an option</option>
              <option value="IDP (Industry Defined Project)">IDP</option>
              <option value="UDP (User Defined Project)">UDP</option>
            </select>
            {projectType === "IDP (Industry Defined Project)" && (
              <>
                <InputLabel>Company</InputLabel>
                <TextField
                  required
                  id="outlined-required"
                  onChange={handlecompany}
                />
                <InputLabel>Company Email</InputLabel>
                <TextField
                  required
                  id="outlined-required"
                  onChange={handlecompany_email}
                />
              </>
            )}
            <InputLabel>Semester </InputLabel>
            <select onChange={handleSemester}>
              <option value="">Select an option</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8Th Semester</option>
            </select>
            <InputLabel>Frontend Technologies</InputLabel>
            <TextField
              required
              id="outlined-required"
              onChange={handlefrontendTechnologies}
            />
            <InputLabel>Backend Technologies</InputLabel>
            <TextField
              required
              id="outlined-required"
              onChange={handlebackendTechnologies}
            />
            <InputLabel>Database</InputLabel>
            <TextField
              required
              id="outlined-required"
              onChange={handledatabase}
            />

            <InputLabel>Capacity</InputLabel>
            <TextField
              required
              id="outlined-required"
              onChange={handlecapacity}
            />
            <div className="p-4">
              <Button
                onClick={createProject}
                variant="contained"
                color="success"
              >
                Create Project
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="bg-white rounded-lg shadow-md  p-4 flex-grow ">
        <h1 className="font-bold text-xl mb-2 pb-2">Project Details</h1>
        {userData.length === 0 ? (
          <div>
            Project not created yet
            <br></br>
            <br></br>
            <div className="p-1">
              <Button
                variant="contained"
                color="success"
                onClick={handleOpenCreateProModal}
              >
                Create Project
              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={handleOpenJoinModal}
              >
                Join Project
              </Button>
            </div>
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
