import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
const FacultyTab = () => {
  const [selectedFacultyId, setSelectedFacultyId] = useState(null);
  const [myArray, setMyArray] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  let token;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("token");
  }
  //handle get faculty
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/`,
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
      if (data && data.faculties) {
        setMyArray(data.faculties);
        setLoading(false);
      }
      console.log(myArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-faculty/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: name,
            email: email,
            department: department,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setIsEditOpen(false);
      setSelectedFacultyId("");
      if (data && data.faculty) {
        setMyArray(data.faculty);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-faculty/${id}`,
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
      if (data && data.faculty) {
        setMyArray(data.faculty);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (faculty) => {
    setSelectedFacultyId(faculty._id);
    setName(faculty.name);
    setEmail(faculty.email);
    setDepartment(faculty.department);
    setIsEditOpen(true);
  };

  return (
    <>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <br></br>
          <div className="p-4">
            <LinearProgress />
          </div>
          <br></br>
        </Box>
      ) : (
        <div className="min-h-1/2 flex-grow mx-2% shadow rounded-lg bg-white p-4">
          {isEditOpen && (
            <div className="py-4">
              <label className="block mb-2 text-gray-700 font-bold">
                Faculty ID
              </label>
              <label className="block mb-2 text-gray-600">
                {selectedFacultyId}
              </label>
              <label className="block mb-2 text-gray-700 font-bold">
                Faculty Name
              </label>
              <input
                className="w-full mb-2 py-2 px-3 rounded border border-gray-300 text-gray-700 focus:outline-none focus:border-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="block mb-2 text-gray-700 font-bold">
                Faculty Email
              </label>
              <input
                className="w-full mb-2 py-2 px-3 rounded border border-gray-300 text-gray-700 focus:outline-none focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block mb-2 text-gray-700 font-bold">
                Faculty department
              </label>
              <input
                className="w-full mb-2 py-2 px-3 rounded border border-gray-300 text-gray-700 focus:outline-none focus:border-indigo-500"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />

              <div className="flex justify-end">
                <button
                  className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300"
                  onClick={() => setIsEditOpen(false)}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 font-bold text-black rounded-lg hover:bg-blue-600"
                  onClick={() =>
                    handleUpdate(selectedFacultyId, email, department, name)
                  }
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          {myArray.length > 0 && (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {myArray.map((faculty) => (
                  <tr key={faculty._id}>
                    <td className="border px-4 py-2">{faculty.name}</td>
                    <td className="border px-4 py-2">{faculty.email}</td>
                    <td className="border px-4 py-2">{faculty.department}</td>

                    <td className="border px-4 py-2">
                      <button
                        className="bg-gray-500  text-black font-bold py-2 px-4 rounded"
                        onClick={() => handleEdit(faculty)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(faculty._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <br />
        </div>
      )}
    </>
  );
};

export default FacultyTab;
