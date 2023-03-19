import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setSelectedGroup(null);
  const [commentText, setCommentText] = useState("");
  const [projectId, setProjectId] = useState("");
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

    p: 4,
  };
  const fetchDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Replace with your actual token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/faculty/groups`,
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
      const groupsArray = Object.keys(data).map((key) => data[key]);
      setGroups(groupsArray);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  const handleClick = (group) => {
    setSelectedGroup(group);
    setProjectId(group._id);
  };

  const handleComment = async () => {
    try {
      console.log(projectId);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/comment/${projectId}`,
        {
          method: "POST",
          body: JSON.stringify({
            text: commentText,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log("Success");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMember = (id) => {
    console.log(id);
    setProjectId(id);
  };

  return (
    <>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {groups.map((group) => (
            <div
              key={group._id}
              className="bg-white rounded-lg shadow-lg cursor-pointer p-4 hover:shadow-xl transition-all duration-300"
              onClick={() => handleClick(group)}
            >
              <h2 className="text-lg font-bold mb-2">
                Gorup Name : {group.groupName}
              </h2>
              <p className="text-gray-500 text-sm mb-1">
                Group Title{group.title}
              </p>

              <p className="text-gray-500 text-sm mb-1">
                Group description : {group.description}
              </p>
              <p className="text-gray-500 text-sm mb-1">
                Group Leader : {group.leader.name}
              </p>
              <hr></hr>
            </div>
          ))}

          <div>
            <Modal
              open={selectedGroup}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {selectedGroup && (
                  <div className="fixed top-0 left-0 h-full w-full   flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-4	">
                      <p className="text-black font-bold text-lg mb-1">
                        {selectedGroup.groupName}
                      </p>
                      <p className="text-gray-500 text-md mb-1">
                        Title : {selectedGroup.title}
                      </p>
                      <p className="text-gray-500 text-md mb-4">
                        Description : {selectedGroup.description}
                      </p>
                      <p className="text-gray-500 text-md mb-4">
                        Backend Technologies :{" "}
                        {selectedGroup.backendTechnologies}
                      </p>
                      <p className="text-gray-500 text-md mb-4">
                        Frontend Technologies :{" "}
                        {selectedGroup.frontendTechnologies}
                      </p>
                      <p className="text-gray-500 text-md mb-4">
                        Database : {selectedGroup.database}
                      </p>
                      <p className="text-gray-500 text-md mb-4">
                        Leader : {selectedGroup.leader.name}
                      </p>
                      <p className="text-gray-500 text-md mb-4">
                        Project type : {selectedGroup.project_type}
                      </p>
                      <p className="text-gray-500 text-md mb-4">
                        Semester : {selectedGroup.semester}
                      </p>
                      <p className="text-gray-500 text-md mb-4">
                        Company : {selectedGroup.company}
                      </p>
                      <p className="text-gray-500 text-md mb-4">
                        Company Email : {selectedGroup.company_email}
                      </p>
                      <p className="text-gray-500 text-md mb-4">
                        Project Status :
                        <p className="text-red-500">{selectedGroup.status}</p>
                      </p>

                      <div>
                        <div className="bg-indigo-500 rounded-lg shadow-xl ">
                          <label
                            htmlFor="message"
                            className="block font-medium text-gray-700 mb-2 p-4"
                          >
                            Enter your message:
                          </label>
                          <div className="p-4">
                            <textarea
                              placeholder="Enter your Comments"
                              id="message"
                              name="message"
                              className="border border-gray-300 rounded-md p-4 w-full h-32 mb-4"
                              onChange={(event) =>
                                setCommentText(event.target.value)
                              }
                            ></textarea>
                          </div>

                          <div className="p-4">
                            <>
                              <Button
                                variant="contained"
                                color="success"
                                onClick={handleComment}
                              >
                                Send
                              </Button>
                            </>
                          </div>
                        </div>
                      </div>

                      <div className="flex p-2">
                        <div className="p-4">
                          <>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => deleteMember(selectedGroup._id)}
                            >
                              Delete Member
                            </Button>
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Box>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}
