import React, { useState } from "react";

function AddFacultyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const bearerToken = localStorage.getItem("token");
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/add-faculty",
        {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
            department: department,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      // Display the updated data to the UI
      // ...
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-8">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <br></br>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <br></br>
      <div className="flex flex-col">
        <label htmlFor="department" className="mb-1 font-medium text-gray-700">
          Department
        </label>
        <input
          type="text"
          id="department"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          className="px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <br></br>
      <button
        onClick={handleSubmit}
        className="bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Student
      </button>
    </div>
  );
}

export default AddFacultyForm;
