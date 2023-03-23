import { useState } from "react";
import { useRouter } from "next/router";

import { Avatar, Box, Button, Container, CssBaseline, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const roleBasedLogin = (role) => {
    if (role === "admin") {
      router.push("/admin/dashboard/student");
    } else if (role === "student") {
      router.push("/student/dashboard/dashboard");
    } else {
      router.push("/faculty/dashboard/dashboard");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      console.log(data);
      

      if (
        data.message ===
        "Please change your password by calling /api/users/change-password"
      ) {
        router.push("/changePassword");
      } else if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("projectIsAssigned", null);
        localStorage.setItem("role", data.role);
        roleBasedLogin(data.role);
        localStorage.setItem("email", data.email);
        localStorage.setItem("id", data.userId);
        localStorage.setItem("hhjklmno-hjsohjso-toKeN", "login success");
        
          toast.success("Login Done", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
  
       
         
  
      } else {
       
        toast.error("incorrect id password ", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      
      }
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
      <Container component="main" maxWidth="xs" className='contain3'>

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}

        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >


            <TextField
              margin="normal"
              required
              fullWidth
              label="email"
              name="email"
              autoFocus 
             value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="password"
              name="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button

              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Signup
            </Button>

            <Grid container>
              <Grid item xs>
                <Link to="#">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/login">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
export default Login;
