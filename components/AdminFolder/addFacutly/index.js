import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import 'react-toastify/dist/ReactToastify.css';
function AddFacultyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  let bearerToken;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    bearerToken = localStorage.getItem("token");
  }
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-faculty`,
        {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
            department: department,
            phoneNumber: phone,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        toast.success("Faculty Added", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Error Adding Faculty", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      // Display the updated data to the UI
      // ...
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <div className="flex flex-col space-y-4 p-8">
    //   <div className="flex flex-col">
    //     <label htmlFor="name" className="mb-1 font-medium text-gray-700">
    //       Name
    //     </label>
    //     <input
    //       type="text"
    //       id="name"
    //       value={name}
    //       onChange={(event) => setName(event.target.value)}
    //       className="px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
    //     />
    //   </div>
    //   <br></br>
    //   <div className="flex flex-col">
    //     <label htmlFor="email" className="mb-1 font-medium text-gray-700">
    //       Email
    //     </label>
    //     <input
    //       type="email"
    //       id="email"
    //       value={email}
    //       onChange={(event) => setEmail(event.target.value)}
    //       className="px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
    //     />
    //   </div>
    //   <br></br>
    //   <div className="flex flex-col">
    //     <label htmlFor="department" className="mb-1 font-medium text-gray-700">
    //       Department
    //     </label>
    //     <input
    //       type="text"
    //       id="department"
    //       value={department}
    //       onChange={(event) => setDepartment(event.target.value)}
    //       className="px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
    //     />
    //   </div>
    //   <br></br>
    //   <div className="flex flex-col">
    //     <label htmlFor="department" className="mb-1 font-medium text-gray-700">
    //       Phone Number
    //     </label>
    //     <input
    //       type="text"
    //       id="department"
    //       value={phone}
    //       onChange={(event) => setPhone(event.target.value)}
    //       className="px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
    //     />
    //   </div>
    //   <br></br>
    //   <button
    //     onClick={handleSubmit}
    //     className="bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //   >
    //     Add Student
    //   </button>
    // </div>
    <div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    {/* Same as */}
    <ToastContainer />
    <Container component="main" maxWidth="xs" className='contain2'>

      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Faculty
        </Typography>

        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            onChange={(event) => setName(event.target.value)}

          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="department"
            label="Department"
            name="department"
            autoFocus
            onChange={(event) => setDepartment(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoFocus
            onChange={(event) => setPhone(event.target.value)}
          />
          {/* <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="password"
                          label="password"
                          name="password"
                          autoFocus  
                      /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Faculty
          </Button>

        </Box>
      </Box>

    </Container>

  </div>
  );
}

export default AddFacultyForm;
