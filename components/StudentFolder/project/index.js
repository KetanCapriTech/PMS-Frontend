import { Button, Card } from "@mui/material";
import React, { useState, useEffect } from "react";
import Comments from "../../Comments";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";

function StudentProject() {
  const [userData, setUserData] = useState([]);
  const [leaderEmail, setLeaderEmail] = useState("");
  const [projectId, setProjectId] = useState("");

  let token;
  let user_Id;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("token");
    user_Id = localStorage.getItem("email");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title: formData.get("title"),
            description: formData.get("description"),
            project_status: formData.get("status"),
            repository_link: formData.get("repositoryLink"),
            report_link: formData.get("reportLink"),
            frontendTechnologies: formData.get("frontendTechnologies"),
            backendTechnologies: formData.get("backendTechnologies"),
            database: formData.get("database"),
            presentation_link: formData.get("presentationLink"),
            groupName: formData.get("groupName"),
            company: formData.get("company"),
            company_email: formData.get("companyEmail"),
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update project. Status: ${response.status}`);
      }
      if (response.ok) {
        console.log("updated");
      }

      // Handle successful response
    } catch (error) {
      console.error(error);
      // Handle error
    }
  }
  //project details
  useEffect(() => {
    fetchDetails();
  }, []);
  const fetchDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
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
      setLeaderEmail(data.leader_email);
      setProjectId(data._id);
    } catch (error) {
      console.error(error);
    }
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {userData.length === 0 ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="w-full max-w-xs p-4">
          <Card style={{ backgroundColor: "#e3f2fd" }}>
            <div className=" rounded-lg shadow-xl  p-4 flex-grow ">
              <h1 className="font-bold text-xl mb-2 pb-2">Project Details</h1>
              {userData.length === 0 ? (
                <div>Project not created yet</div>
              ) : (
                <div>
                  <div className="mb-2">
                    <strong>Title : </strong>
                    {userData.title}
                  </div>
                  <div className="mb-2">
                    <strong>Description : </strong>
                    {userData.description}
                  </div>
                  <div className="mb-2">
                    <div className="flex">
                      <strong>Project Log : </strong>

                      <div className="mb-2">{userData.project_isApproved}</div>

                      <div>No Data</div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <strong>Project Status : </strong>
                    {userData.status}
                  </div>
                  <div className="mb-2">
                    <strong>Semester : </strong>
                    {userData.semester}
                  </div>
                  <div className="mb-2">
                    <strong>Total Capacity : </strong>
                    {userData.capacity}
                  </div>
                  <div className="mb-2">
                    <strong>Company : </strong>
                    {userData.company}
                  </div>
                  <div className="mb-2">
                    <strong>Project Type : </strong>
                    {userData.project_type}
                  </div>

                  {user_Id === leaderEmail && (
                    <div className="mb-2 " style={{ color: "#2979ff" }}>
                      <strong>Invite Code : </strong>
                      {userData.invite_code}
                    </div>
                  )}
                  <div className="text-right">
                    {user_Id === leaderEmail && (
                      <Button
                        variant="outlined"
                        style={{ backgroundColor: "#e3f2fd" }}
                        onClick={handleClickOpen}
                      >
                        Update Project
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
          <br></br>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Optional sizes</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {user_Id === leaderEmail ? (
                  <>
                    <form onSubmit={handleSubmit} className=" mx-auto">
                      <div className="mb-4 flex">
                        <div className="mr-4 flex-1">
                          <label
                            htmlFor="title"
                            className="block mb-2 font-bold"
                          >
                            Title:
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder={userData.title}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>
                        <div className="mr-4 flex-1">
                          <label
                            htmlFor="description"
                            className="block mb-2 font-bold"
                          >
                            Description:
                          </label>
                          <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder={userData.description}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                          ></input>
                        </div>
                      </div>
                      <div className="mb-4 flex">
                        <div className="mr-4 flex-1">
                          <label
                            htmlFor="status"
                            className="block mb-2 font-bold"
                          >
                            Status:
                          </label>
                          <select
                            id="status"
                            name="status"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                          >
                            <option value="">-- Select Status --</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>

                        <div className="mr-4 flex-1">
                          <label
                            htmlFor="repositoryLink"
                            className="block mb-2 font-bold"
                          >
                            Repository Link:
                          </label>
                          <input
                            type="text"
                            id="repositoryLink"
                            name="repositoryLink"
                            placeholder={userData.repository_link}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>
                      </div>
                      <div className="mb-4 flex">
                        <div className="mr-4 flex-1">
                          <label
                            htmlFor="reportLink"
                            className="block mb-2 font-bold"
                          >
                            Report Link:
                          </label>
                          <input
                            type="text"
                            id="reportLink"
                            name="reportLink"
                            placeholder={userData.report_link}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>

                        <div className="mr-4 flex-1">
                          <label
                            htmlFor="frontendTechnologies"
                            className="block mb-2 font-bold"
                          >
                            Frontend Technologies:
                          </label>
                          <input
                            type="text"
                            id="frontendTechnologies"
                            name="frontendTechnologies"
                            placeholder={userData.frontendTechnologies}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>
                      </div>
                      <div className="mb-4 flex">
                        <div className="mr-4 flex-1">
                          <label
                            htmlFor="backendTechnologies"
                            className="block mb-2 font-bold"
                          >
                            Backend Technologies:
                          </label>
                          <input
                            type="text"
                            id="backendTechnologies"
                            name="backendTechnologies"
                            placeholder={userData.backendTechnologies}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>

                        <div className="mr-4 flex-1">
                          <label
                            htmlFor="database"
                            className="block mb-2 font-bold"
                          >
                            Database:
                          </label>
                          <input
                            type="text"
                            id="database"
                            name="database"
                            placeholder={userData.database}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>
                      </div>
                      <div className="mb-4 flex">
                        <div className="mr-4 flex-1">
                          <label
                            htmlFor="presentationLink"
                            className="block mb-2 font-bold"
                          >
                            Presentation Link:
                          </label>
                          <input
                            type="text"
                            id="presentationLink"
                            name="presentationLink"
                            placeholder={userData.presentation_link}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>

                        <div className="mr-4 flex-1">
                          <label
                            htmlFor="groupName"
                            className="block mb-2 font-bold"
                          >
                            Group Name:
                          </label>
                          <input
                            type="text"
                            id="groupName"
                            name="groupName"
                            placeholder={userData.groupName}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>
                      </div>
                      {userData.project_type ===
                      "UDP (User Defined Project)" ? (
                        <></>
                      ) : (
                        <div className="mb-4 flex">
                          <div className="mr-4 flex-1">
                            <label
                              htmlFor="company"
                              className="block mb-2 font-bold"
                            >
                              Company:
                            </label>
                            <input
                              type="text"
                              id="company"
                              placeholder={userData.company}
                              required
                              className="w-full px-3 py-2 border rounded-md"
                            />
                          </div>
                          <div className="mr-4 flex-1">
                            <label
                              htmlFor="companyEmail"
                              className="block mb-2 font-bold"
                            >
                              Company Email:
                            </label>
                            <input
                              type="text"
                              id="companyEmail"
                              placeholder={userData.companyEmail}
                              required
                              className="w-full px-3 py-2 border rounded-md"
                            />
                          </div>
                        </div>
                      )}

                      <div className="mb-4">
                        <Button type="submit">Submit</Button>
                      </div>
                    </form>
                  </>
                ) : (
                  <></>
                )}
              </DialogContentText>
              <Box
                noValidate
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: "auto",
                  width: "fit-content",
                }}
              ></Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>

          <br></br>
          {/* {Response && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 p-4">
          <h2 className="font-bold text-lg mb-4 text-red-500">
            {Response.length > 0 ? Response : "No Data Found"}:
          </h2>
          <p className="mb-4">
            Title: {Response.title ? Response.title : "Not present"}
          </p>
          <p className="mb-4">
            Description:{" "}
            {Response.description ? Response.description : "Not present"}
          </p>
          <p className="mb-4">
            Students:
            {Response && <div>No data</div>}
          </p>
        </div>
      )} */}
          {userData.length === 0 ? <></> : <Comments />}

          {/* <Chat /> */}
        </div>
      )}
    </>
  );
}

export default StudentProject;
