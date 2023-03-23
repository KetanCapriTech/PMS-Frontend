import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function AddStudentForm() {
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

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-student`,
        {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
            department: department,
            enrollment_number: enrollmentNumber,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success(response.json.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Error Adding Student", {
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
      <Container component="main" maxWidth="xs" className="contain2">
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
            Add Student
          </Typography>

          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={name}
              autoFocus
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              label="Email"
              name="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={department}
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
              value={enrollmentNumber}
              id="enrollmentNumber"
              label="Enrollment Number"
              name="enrollmentNumber"
              autoFocus
              onChange={(event) => setEnrollmentNumber(event.target.value)}
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
              Add Student
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default AddStudentForm;
