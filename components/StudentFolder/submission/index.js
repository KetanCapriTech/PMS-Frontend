/* eslint-disable react-hooks/rules-of-hooks */
import { Button, ButtonBase, Input } from "@mui/material";
import React, { useState, useEffect } from "react";

function index() {
  const [submission, setSubmission] = useState([]);
  const [updateRepositorylink, setUpdateRepositorylink] = useState("");
  const [updatePresentationlink, setUpdatePresentationlink] = useState("");
  const [updateReportlink, setUpdateReportlink] = useState("");
  const [uploadRepositorylink, setUploadRepositorylink] = useState("");
  const [uploadPresentationlink, setUploadPresentationlink] = useState("");
  const [uploadReportlink, setUploadReportlink] = useState("");
  const [showUploadLink, setShowUploadLink] = useState(true);
  const [showButton, setShowButton] = useState(true);

  const handleClick = () => {
    // Perform data update logic here
    setShowButton(false);
    console.log("Data updated!");
    setShowUploadLink(false);
  };
  const handleClose = () => {
    // Perform data update logic here
    setShowButton(true);
    setShowUploadLink(true);
  };
  let token;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("token");
  }
  useEffect(() => {
    getSubmission();
  }, []);

  // get links
  const getSubmission = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/submit/submission`,
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
      setSubmission(data);
    } catch (error) {
      console.error(error);
    }
  };

  // upload links
  const uploadLinks = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/submit/submission`,
        {
          method: "POST",
          body: JSON.stringify({
            repository_link: uploadRepositorylink,
            presentation_link: uploadPresentationlink,
            report_link: uploadReportlink,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // update links
  const updateLinks = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/submit/submission`,
        {
          method: "PUT",
          body: JSON.stringify({
            repository_link: updateRepositorylink,
            presentation_link: updatePresentationlink,
            report_link: updateReportlink,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/* GET Submission view */}
      <div
        className=" rounded-lg shadow-md p-4"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <h1 className="text-2xl font-bold mb-4">Submission Links:</h1>

        <div className="flex flex-wrap justify-center">
          <div className="bg-white rounded-lg shadow-md p-4 mr-4 mb-4">
            <h1 className="text-xl font-bold mb-4">Repository Link:</h1>
            <ul>
              <li>
                <a
                  href="{submission.repository_link}"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {submission.repository_link
                    ? submission.repository_link
                    : "N/A"}
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 mr-4 mb-4">
            <h1 className="text-xl font-bold mb-4">Report Link:</h1>
            <ul>
              <li>
                <a
                  href="{submission.report_link}"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {submission.report_link ? submission.report_link : "N/A"}
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 mr-4 mb-4">
            <h1 className="text-xl font-bold mb-4">Presentation Link:</h1>
            <ul>
              <li>
                <a
                  href="{submission.presentation_link}"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {submission.presentation_link
                    ? submission.presentation_link
                    : "N/A"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          {submission.presentation_link === "" ? (
            <>
              {showButton ? (
                <Button
                  className="ml-2 mt-2"
                  variant="contained"
                  color="success"
                  type="submit"
                  onClick={handleClick}
                >
                  Upload Links
                </Button>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* upload Links  */}
      <br></br>

      {showUploadLink ? (
        <></>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-4 pl-10 pr-10">
          <h1 className="text-xl font-bold mb-4">Upload Links:</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="repository-link"
            >
              Repository Link:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
              id="repository-link"
              type="text"
              placeholder={submission.repository_link}
              onChange={(e) => setUploadRepositorylink(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="presentation-link"
            >
              Presentation Link:
            </label>
            <Input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="presentation-link"
              type="text"
              placeholder={submission.presentation_link}
              onChange={(e) => setUploadPresentationlink(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="report-link"
            >
              Report Link:
            </label>
            <Input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="report-link"
              type="text"
              placeholder={submission.report_link}
              onChange={(e) => setUploadReportlink(e.target.value)}
              required
            />
          </div>
          <div className="text-right flex">
            <div className="p-2">
              <Button
                className="ml-2 mt-2 "
                variant="contained"
                color="success"
                type="submit"
                onClick={uploadLinks}
              >
                Submit
              </Button>
            </div>

            <div className="p-2">
              <Button
                className="ml-2 mt-2 "
                variant="contained"
                color="error"
                type="submit"
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <br></br>

      {/* Update Links  */}
      {submission.presentation_link !== "" ? (
        <>
          <div className="bg-white rounded-lg shadow-md p-4 pl-10 pr-10">
            <h1 className="text-xl font-bold mb-4">Update Links:</h1>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="repository-link"
              >
                Repository Link:
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
                id="repository-link"
                type="text"
                placeholder={submission.repository_link}
                onChange={(e) => setUpdateRepositorylink(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="presentation-link"
              >
                Presentation Link:
              </label>
              <Input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="presentation-link"
                type="text"
                placeholder={submission.presentation_link}
                onChange={(e) => setUpdatePresentationlink(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="report-link"
              >
                Report Link:
              </label>
              <Input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="report-link"
                type="text"
                placeholder={submission.report_link}
                onChange={(e) => setUpdateReportlink(e.target.value)}
                required
              />
            </div>
            <div className="text-right">
              <Button
                className="ml-2 mt-2"
                variant="contained"
                color="success"
                type="submit"
                onClick={updateLinks}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default index;
