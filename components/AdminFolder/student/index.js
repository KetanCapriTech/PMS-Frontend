/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Modal } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function customToolBar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const StudentTab = () => {
  //table heading
  const columns = [
    {
      field: "name",
      headerName: "name",
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "email",
      minWidth: 250,
    },
    {
      field: "department",
      headerName: "department",
      minWidth: 200,
      sortable: false,
    },
    {
      field: "enrollment_number",
      headerName: "enrollment_number",
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => handleEdit(params.row)}
              variant="contained"
              style={{ height: 35, width: 100, margin: 5 }}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(params.row)}
              variant="contained"
              color="error"
              style={{ height: 35, width: 100, margin: 5 }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [myArray, setMyArray] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [loading, setLoading] = useState(false);

  let bearerToken;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    bearerToken = localStorage.getItem("token");
  }
  //get students
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data && data.students) {
        setMyArray(data.students);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  //update students
  const handleUpdate = async (
    id,
    email,
    enrollment_number,
    department,
    name
  ) => {
    setIsEditOpen(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-student/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            department: department,
            email: email,
            enrollment_number: enrollmentNumber,
            name: name,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      setIsEditOpen(false);
      // alert(data.message);
      if (data && data.students) {
        setMyArray(data.students);
      }
      if (response.status == 200) {
        toast.success("Student Updated", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Error in Update", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };
  //delete students
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-student/${id}`,

        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data && data.students) {
        setMyArray(data.students);
      }
      if (response.status == 200) {
        toast.success("Student Deleted", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Error in Delete", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (student) => {
    setSelectedStudentId(student._id);
    setName(student.name);
    setEmail(student.email);
    setDepartment(student.department);
    setEnrollmentNumber(student.enrollment_number);
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
        <div className="min-h-1/2 flex-grow mx-2% shadow rounded-lg bg-white p-8">
          {isEditOpen && (
            <div className="py-4">
              <label className="block mb-2 text-gray-700 font-bold">
                Student ID
              </label>
              <label className="block mb-2 text-gray-600">
                {selectedStudentId}
              </label>
              <label className="block mb-2 text-gray-700 font-bold">
                Student Name
              </label>
              <input
                className="w-full mb-2 py-2 px-3 rounded border border-gray-300 text-gray-700 focus:outline-none focus:border-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="block mb-2 text-gray-700 font-bold">
                Student Email
              </label>
              <input
                className="w-full mb-2 py-2 px-3 rounded border border-gray-300 text-gray-700 focus:outline-none focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block mb-2 text-gray-700 font-bold">
                Student department
              </label>
              <input
                className="w-full mb-2 py-2 px-3 rounded border border-gray-300 text-gray-700 focus:outline-none focus:border-indigo-500"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
              <label className="block mb-2 text-gray-700 font-bold">
                Student enrollment_number
              </label>
              <input
                className="w-full mb-2 py-2 px-3 rounded border border-gray-300 text-gray-700 focus:outline-none focus:border-indigo-500"
                value={enrollmentNumber}
                onChange={(e) => setEnrollmentNumber(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300"
                  onClick={() => setIsEditOpen(false)}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 font-bold text-black rounded-lg  hover:bg-blue-600"
                  onClick={() =>
                    handleUpdate(
                      selectedStudentId,
                      email,
                      department,
                      enrollmentNumber,
                      name
                    )
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
                  <th className="px-4 py-2">Enrollment Number</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {myArray.map((student) => (
                  <tr key={student._id}>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.email}</td>
                    <td className="border px-4 py-2">{student.department}</td>
                    <td className="border px-4 py-2">
                      {student.enrollment_number}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-gray-500  text-black font-bold py-2 px-4 rounded"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(student._id)}
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

export default StudentTab;
