import { useState } from "react";

function StudentProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Response, setResponse] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bearerToken = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
        }),
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 400) {
        setResponse(data.msg);
        console.log(Response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-xs p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 p-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <br></br>
      {Response && (
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
      )}
    </div>
  );
}

export default StudentProject;
