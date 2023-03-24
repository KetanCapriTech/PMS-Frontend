import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
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
  const [loading, setLoading] = useState(false);
  const [isProjectAssigned, setIsProjectAssigned] = useState(false);
  const [pasteText, setPasteText] = useState("");
  let token;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("token");
  }
  let user_Email;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    user_Email = localStorage.getItem("email");
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPasteText(text);
      console.log("Pasted content: ", text);
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };

  const handleClearText = () => {
    setPasteText("");
  };

  const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
  };

  const styleInvite = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    height: 190,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
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

  // navigator.clipboard
  //   .readText()
  //   .then((text) => {
  //     console.log("Pasted content: ", text);
  //   })
  //   .catch((err) => {
  //     console.error("Failed to read clipboard contents: ", err);
  //   });

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
      // console.log(data);
      if (data.msg === "You do not have any projects") {
        setIsProjectAssigned(false);
        console.log(data.msg);
        localStorage.setItem("projectIsAssigned", "no");
      } else {
        setUserData(data);
        console.log(userData.groupMembers);
        setIsProjectAssigned(true);
        console.log(data);
        localStorage.setItem("projectIsAssigned", "yes");
        // window.location.reload();
      }
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
    console.log(selectedId);
  };
  return (
    <>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div>
          {/* join project modal */}

          {/* create project modal */}

          {/* invite code   */}
          {userData.leaderEmail === user_Email && (
            <div className=" p-4 rounded-lg" style={{ color: "#263238" }}>
              <div className="text-right">
                <span className="font-bold underline ">
                  Invite Code: {userData.invite_code}
                </span>
              </div>
            </div>
          )}

          {/* Dashboard project details card */}
          <div style={{ backgroundColor: "#e3f2fd" }}>
            <div className="bg-gray-100 rounded-lg shadow-md  p-4 flex-grow text-left">
              <h1 className="font-bold text-xl mb-2 pb-2 text-left">
                Project Details
              </h1>
              {isProjectAssigned === false ? (
                <div className="text-left">
                  Project not created yet
                  <br></br>
                  <br></br>
                  <div className="p-1 text-left">
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
                      className="ml-2"
                    >
                      Join Project
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-2 text-left">
                    <strong>Title : </strong>
                    {userData.projectTitle}
                  </div>

                  <div className="mb-2 text-left">
                    <strong>Description : </strong>
                    {userData.projectDescription}
                  </div>

                  <div className="mb-2 text-left">
                    <div className="flex">
                      <strong>Project Log : </strong>
                      {userData.length === 0 ? (
                        <div className="mb-2">
                          {userData.project_isApproved}
                        </div>
                      ) : (
                        <div>No Data</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-2 text-left">
                    <strong>Project Status : </strong>
                    {userData.project_status}
                  </div>
                  <div className="mb-2 text-left">
                    <strong>Total Members : </strong>
                    {userData.totalMembers}
                  </div>
                  {projectType === "IDP (Industry Defined Project)" && (
                    <div className="flex">
                      <strong>Company : </strong>
                      {userData.project_company === "" ? (
                        <div className="mb-2">No Company</div>
                      ) : (
                        <div>{userData.project_company}</div>
                      )}
                    </div>
                  )}
                  <div className="flex">
                    <strong>Comments : </strong>
                    {userData.length === 0 ? (
                      <div className="mb-2">{userData.project_comments}</div>
                    ) : (
                      <div> No comments yet</div>
                    )}
                  </div>
                  <div className="mb-2 text-left">
                    <strong>Project Type : </strong>
                    {userData.project_type}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dashboard Group member  card */}
          <br></br>
          <br></br>
          {isProjectAssigned === false ? (
            <></>
          ) : (
            <div
              className=" rounded-lg shadow-md  flex-grow "
              style={{ backgroundColor: "#e3f2fd" }}
            >
              <div className="p-4 ">
                <div className="font-bold text-xl mb-2">Group Members</div>
                <div className="text-gray-900 font-semibold mb-2">
                  {userData.groupMembers.map((member, index) => (
                    <div key={index}>
                      {index + 1}. {member}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <br></br>
          <br></br>

          {/* Dashboard Mentor card */}
          {isProjectAssigned === false ? (
            <></>
          ) : (
            <div
              className=" rounded-lg shadow-md  p-4 flex-grow "
              style={{ backgroundColor: "#e3f2fd" }}
            >
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
          )}

          {/* Dashboard Leader card */}
          <br></br>
          <br></br>
          {isProjectAssigned === false ? (
            <></>
          ) : (
            <div
              className=" rounded-lg shadow-md  p-4 flex-grow "
              style={{ backgroundColor: "#e3f2fd" }}
            >
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
          )}

          <Modal
            open={openCreateModal}
            onClose={handleCloseCreateProModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styles}>
              <div className="p-4">
                <strong>Project Details</strong>
              </div>
              <br></br>
              <div>
                <InputLabel>Title</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    required
                    id="outlined-required"
                    onChange={handletitle}
                  />
                </FormControl>
                <br></br>
                <br></br>
                <div>
                  <InputLabel>Description</InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      required
                      id="outlined-required"
                      onChange={handledescription}
                      multiline
                      rows={4}
                    />
                  </FormControl>
                </div>
                <br></br>
                <InputLabel>Select a faculty:</InputLabel>
                <div>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <FormControl fullWidth>
                      <Select id="dropdown" onChange={handleSelect}>
                        <InputLabel id="demo-simple-select-label">
                          Select a Faculty
                        </InputLabel>
                        {Object.keys(facultyList).map((id) => (
                          <MenuItem key={id} value={facultyList[id].name}>
                            {facultyList[id].name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  {/* {selectedName && <p>Selected name: {selectedName}</p>} */}
                </div>
                <br></br>

                <InputLabel>Project Type</InputLabel>
                <FormControl fullWidth>
                  <Select onChange={handleproject_type}>
                    <InputLabel id="demo-simple-select-label">
                      Select a Poject
                    </InputLabel>
                    <MenuItem value="IDP (Industry Defined Project)">
                      IDP
                    </MenuItem>
                    <MenuItem value="UDP (User Defined Project)">UDP</MenuItem>
                  </Select>
                </FormControl>
                {projectType === "IDP (Industry Defined Project)" && (
                  <>
                    <br></br>
                    <br></br>
                    <InputLabel>Company</InputLabel>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="outlined-required"
                        onChange={handlecompany}
                      />
                    </FormControl>
                    <br></br>
                    <InputLabel>Company Email</InputLabel>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="outlined-required"
                        onChange={handlecompany_email}
                      />
                    </FormControl>
                  </>
                )}
                <br></br>
                <br></br>
                <InputLabel>Semester </InputLabel>
                <FormControl fullWidth>
                  <Select onChange={handleSemester}>
                    <InputLabel id="demo-simple-select-label">
                      Select a Semester
                    </InputLabel>
                    <MenuItem value="6">6th Semester</MenuItem>
                    <MenuItem value="7">7th Semester</MenuItem>
                    <MenuItem value="8">8Th Semester</MenuItem>
                  </Select>
                </FormControl>
                <br></br>
                <br></br>
                <InputLabel>Frontend Technologies</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    required
                    id="outlined-required"
                    onChange={handlefrontendTechnologies}
                  />
                </FormControl>
                <br></br>
                <br></br>
                <InputLabel>Backend Technologies</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    required
                    id="outlined-required"
                    onChange={handlebackendTechnologies}
                  />
                </FormControl>
                <br></br>
                <br></br>
                <InputLabel>Database</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    required
                    id="outlined-required"
                    onChange={handledatabase}
                  />
                </FormControl>
                <br></br>
                <br></br>
                <InputLabel>Capacity</InputLabel>
                <FormControl fullWidth>
                  <Select
                    id="capacity"
                    name="capacity"
                    onChange={handlecapacity}
                    required
                  >
                    <InputLabel id="demo-simple-select-label">
                      Select a Capacity
                    </InputLabel>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </FormControl>
                <br></br>
                <br></br>
                <div className="text-right">
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
        </div>
      )}
      <Modal
        open={openJoinModal}
        onClose={handleCloseJoinModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleInvite}>
          <div>
            <div className="text-right p-2">
              <ContentPasteIcon onClick={handlePaste}></ContentPasteIcon>
              <DeleteOutlineOutlinedIcon
                onClick={handleClearText}
              ></DeleteOutlineOutlinedIcon>
            </div>

            <div className="p-4 font-bold">Enter Invite Code</div>

            <TextField
              required
              id="outlined-required"
              value={pasteText}
              onChange={handleInviteCode}
              className="p-4"
            />
            <Button
              className="mt-4"
              variant="contained"
              color="success"
              onClick={joinProject}
            >
              Join
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default ProjectDetails;
