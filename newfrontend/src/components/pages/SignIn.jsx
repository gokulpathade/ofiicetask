// import React from 'react'

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import config from '../../config'
import config from "../../config";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
// import { signin } from '../../slices/authSlice'
import { signin } from "../slices/authSlice";
import { RiMailLine, RiLockPasswordLine } from "react-icons/ri"; // Import the icons
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { Button } from "@mui/material";
import img from "../Ceinsys Tech Ltd New Logo 3.jpg";
// import "./Signin1.css";
// import background from '../../images/bg image.jpg';

function SignIn() {

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // get the dispatcher
  const dispatch = useDispatch();

  // get the navigate function reference
  const navigate = useNavigate();


  useEffect(() => {
    window.sessionStorage.removeItem("time");
    window.sessionStorage.removeItem("timeout");
  }, []);

const signinuser = () => {
  const rep = /^[a-zA-Z.0-9_-]+@meg-nxt.com$/;
console.log(email, password);
  if (email.length === 0) {
    toast.error("Please Enter Email");
  } else if (!rep.test(email) && email !== " ") {
    toast.error("Not Valid Email");
  } else if (password.length === 0) {
    toast.error("Please enter Password");
  } else {
    // make the API call to check if user exists
    axios
      .post(config.serverURL + "/register/login", {
        email,
        password,
      })
      .then((response) => {
        // get the data returned by server
        const result = response.data;
        console.log("response data : ", result);

        sessionStorage.setItem("user", JSON.stringify(response.data)); //vaibhav wrote

        if (result["status"] === "error") {
          toast.error("Invalid Email or Password");
        } else {
          console.log(
            "response data after sign in done",
            response.data.data.role
          );
         
          // localStorage

          const user = result["data"];

          // send the action
          dispatch(signin(user));

          toast.success("Welcome to HRMS");
          if (response.data.data.role.toLowerCase() === "user") {
            navigate("/UserDashboard");
          } else if (response.data.data.role.toLowerCase() === "admin") {
            navigate("/AdminDashboard");
          } else if (response.data.data.role.toLowerCase() === "manager") {
            navigate("/ManagerDashboard");
          }
        }
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        toast.error("Error occurred while signing in");
      });
  }
};


  return (
    <>
      <div style={{ background: "", marginTop: "10%", width: "100%" }}>


        <div style={styles.container}>
          <div className="mb-3">
     
          </div>

          <Box
            sx={{
              "& > :not(style)": {
                m: 1,
                height: "50px",
                width: "340px",
                fontsize: "120",
              },
            }}
          >
            <div class="text-center">
              <img src={img} style={styles.img} alt="logo" />

              {/* <h4 class="mt-1 mb-5 pb-1">CIENSYS</h4> */}
            </div>

            <div>
              {" "}
              <h1 style={styles1.h2}> Sign In </h1>
            </div>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </FormControl>
          </Box>

    

          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "340px", fontsize: "medium" },
            }}
          >
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Password
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="Password"
              />
            </FormControl>
          </Box>
          <div className="mb-3" style={{ marginTop: 40 }}>
            <div>
              Don't have an account? <Link to="/SignUp">Sign Up</Link>
            </div>
            <Button
              name="signinbutton"
              id="id_signinbutton"
              onClick={signinuser}
              style={styles.signinButton}
              sx={{ color: "blue" }}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    width: 400,
    height: 408,
    padding: 20,

    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",

    fontsize: "120",
    marginTop: "20",

    //  borderColor: '#db0f62',
    // borderRadius:'100px 100px',
    borderColor: "#4d94ff",
    borderRadius: 30,
    border: "solid",

    boxShadow: " #C9C9C9",
  },

  img: {
    border: " 0px solid #ddd",
    borderRadius: 30,
    padding: 3,
    width: 120,
  },

  signinButton: {
    position: "relative",
    width: "100%",
    height: 40,
    // backgroundColor: '#db0f62',
    backgroundColor: "blue",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};

// const img {
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   padding: 5px;
//   width: 150px;
// }
const styles1 = {
  h3: {
    textAlign: "center",
    position: "relative",
    top: 10,
    padding: 20,
    color: "black",
  },
};

export default SignIn;

// export default Signin;
