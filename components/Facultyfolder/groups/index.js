import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [commentText, setCommentText] = useState("");
  const [projectId, setProjectId] = useState("");
  const [comments, setComments] = useState([]);
  const [showCommentBox, setCommentBox] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [studentTable, setStudentTable] = useState([]);
  const maxComments = 3;
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
    width: 800,
    height: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,

    p: 4,
    overflow: "scroll",
  };

  const [students, setStudents] = useState(studentTable);

  const handleClose = () => {
    setSelectedGroup(null);
    setCommentBox(false);
  };

  //project details
  const fetchDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
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
    // console.log(group._id);
    setStudentTable(group.students);
    console.log(studentTable);
  };
  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleCloseCommentBox = () => {
    setCommentBox(false);
  };
  // send comment
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

  //get all comments
  const getAllComments = async () => {
    try {
      setCommentBox(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}/comments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setComments(data);
      if (data) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  //handle delete comment
  const handleCommentDelete = async (commentId) => {
    try {
      console.log(commentId);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/comment/${projectId}/${commentId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const filteredComments = Array.isArray(comments)
    ? comments.filter((comment) => comment.text !== "")
    : [];
  const deleteMember = (id) => {
    console.log(id);
    setProjectId(id);
  };
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    color: "blue",
    fontWeight: "bold",
    textDecoration: "underline",
  }));

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
                  <>
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
                      Backend Technologies : {selectedGroup.backendTechnologies}
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
                      <div>
                        {showCommentBox ? (
                          <div className="comment-section">
                            <br></br>
                            {filteredComments.length === 0 ? (
                              <Div>{"No comments yet : "}</Div>
                            ) : (
                              <div
                                className="bg-white rounded-lg shadow-xl p-4"
                                style={{ height: "300px", overflow: "auto" }}
                              >
                                <Div>{"All Comments : "}</Div>
                                {filteredComments
                                  .slice(
                                    0,
                                    showAll
                                      ? filteredComments.length
                                      : maxComments
                                  )
                                  .map((comment) => (
                                    <div key={comment._id} className="my-4">
                                      <p className="text-gray-700 font-bold">
                                        {comment.text}
                                      </p>
                                      <div className="flex justify-between items-center mt-4">
                                        <p className="text-sm  text-red-500 italic ">
                                          {comment.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          {new Date(
                                            comment.date
                                          ).toLocaleString()}
                                        </p>
                                        {comment.email ===
                                          localStorage.getItem("email") && (
                                          <button
                                            onClick={() =>
                                              handleCommentDelete(comment._id)
                                            }
                                          >
                                            Delete
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            )}
                            {!showAll &&
                              filteredComments.length > maxComments && (
                                <>
                                  <Button
                                    className="ml-2 mt-2"
                                    variant="contained"
                                    color="success"
                                    onClick={handleShowMore}
                                  >
                                    Show More
                                  </Button>
                                </>
                              )}

                            <Button
                              className="ml-2 mt-2"
                              variant="contained"
                              color="error"
                              onClick={handleCloseCommentBox}
                            >
                              Close
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="p-4">
                              <Button
                                onClick={getAllComments}
                                variant="outlined"
                              >
                                Show Comments
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {selectedGroup.leader.name === studentTable.email && (
                      <table className="table-auto w-full">
                        <thead>
                          <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentTable.map((student) => (
                            <tr key={student.id}>
                              <td className="border px-4 py-2">
                                {student.name}
                              </td>
                              <td className="border px-4 py-2">
                                {student.email}
                              </td>
                              <td className="border px-4 py-2">
                                <button className="bg-gray-500  text-black font-bold py-2 px-4 rounded">
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    <div className="bg-white rounded-lg shadow-xl ">
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
                  </>
                )}
              </Box>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}
