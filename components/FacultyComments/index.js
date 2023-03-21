/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

function index() {
  const [comments, setComments] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setCommentBox] = useState(false);
  const maxComments = 3;
  let token;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("token");
  }
  const filteredComments = Array.isArray(comments)
    ? comments.filter((comment) => comment.text !== "")
    : [];

  const fetchDetails = async () => {
    try {
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
      //   setGroups(groupsArray);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  const handleShowMore = () => {
    setShowAll(true);
  };
  const handleCloseCommentBox = () => {
    setCommentBox(false);
  };

  const handleSubmit = async () => {};

  const handleCommentDelete = async (commentId) => {};

  const handleComment = async () => {};
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    color: "blue",
    fontWeight: "bold",
    textDecoration: "underline",
  }));
  // handleCloseCommentBox
  return (
    <>
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
                  .slice(0, showAll ? filteredComments.length : maxComments)
                  .map((comment) => (
                    <div key={comment._id} className="my-4">
                      <p className="text-gray-700 font-bold">{comment.text}</p>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-sm  text-red-500 italic ">
                          {comment.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(comment.date).toLocaleString()}
                        </p>
                        {comment.email === localStorage.getItem("email") && (
                          <button
                            onClick={() => handleCommentDelete(comment._id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {!showAll && filteredComments.length > maxComments && (
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
              <Button onClick={handleSubmit} variant="outlined">
                Show Comments
              </Button>
            </div>
          </>
        )}
      </div>

      <br></br>
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
            onChange={(event) => setCommentText(event.target.value)}
          ></textarea>
        </div>

        <div className="p-4">
          <>
            <Button variant="contained" color="success" onClick={handleComment}>
              Send
            </Button>
          </>
        </div>
      </div>
    </>
  );
}

export default index;
