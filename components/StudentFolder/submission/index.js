/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Input } from "@mui/material";
import React, { useState, useEffect } from "react";

function index() {
  const [submission, setSubmission] = useState([]);
  const [repositorylink, setRepositorylink] = useState("");
  const [presentationlink, setPresentationlink] = useState("");
  const [reportlink, setReportlink] = useState("");
  let token;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("token");
  }
  useEffect(() => {
    getSubmission();
  }, []);

  const getSubmission = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/submission`,
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
      setSubmission(data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitProject = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/submission`,
        {
          method: "POST",
          body: JSON.stringify({
            repository_link: repositorylink,
            presentation_link: presentationlink,
            report_link: reportlink,
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
      <div className="bg-white rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4">Submission Links:</h1>

        <div className="flex flex-wrap">
          <div className="bg-gray-100 rounded-lg shadow-md p-4 mr-4 mb-4">
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

          <div className="bg-gray-100 rounded-lg shadow-md p-4 mr-4 mb-4">
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

          <div className="bg-gray-100 rounded-lg shadow-md p-4 mr-4 mb-4">
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
      </div>

      {/* POST Submission view */}
      <br></br>
      <div className="bg-white rounded-lg shadow-md p-4 pl-10 pr-10">
        <h1 className="text-xl font-bold mb-4">Submit Links:</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="repository-link"
          >
            Repository Link:
          </label>
          <Input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
            id="repository-link"
            type="text"
            placeholder="Enter repository link"
            onChange={(e) => setRepositorylink(e.target.value)}
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
            placeholder="Enter presentation link"
            onChange={(e) => setPresentationlink(e.target.value)}
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
            placeholder="Enter report link"
            onChange={(e) => setReportlink(e.target.value)}
            required
          />
        </div>
        <div className="text-right">
          <Button
            className="ml-2 mt-2"
            variant="contained"
            color="success"
            type="submit"
            onClick={submitProject}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default index;
