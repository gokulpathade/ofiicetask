import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import background from "../../images/back1.webp";
import { useDispatch } from "react-redux";
import { signin } from "../../slices/authSlice";
import { RiMailLine, RiLockPasswordLine } from "react-icons/ri";

const Signin = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

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

  if (Email.length === 0) {
    toast.error("Please Enter Email");
  } else if (!rep.test(Email) && Email !== " ") {
    toast.error("Not Valid Email");
  } else if (Password.length === 0) {
    toast.error("Please enter Password");
  } else {
    // make the API call to check if user exists
    axios
      .post(config.serverURL + "/user/signin", {
        Email,
        Password,
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
          sessionStorage.setItem("userRole", response.data.data.role);
          console.log("Data from UserId in SignIn Page");
          const USER_ID = sessionStorage.getItem("userId");
          const Name = sessionStorage.getItem("userName");

          console.log("id signin:  ", USER_ID);
          console.log("Name signin:  ", Name);

          sessionStorage.setItem("userId", response.data.data.id);
          sessionStorage.setItem("userName", response.data.data.name);

          // localStorage

          const user = result["data"];

          // send the action
          dispatch(signin(user));

          toast.success("Welcome to HRMS");
          if (response.data.data.role.toLowerCase() === "user") {
            navigate("/userdashboard");
          } else if (response.data.data.role.toLowerCase() === "admin") {
            navigate("/admindashboard");
          } else if (response.data.data.role.toLowerCase() === "manager") {
            navigate("/managerdashboard");
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
    <div
      style={{
        backgroundImage: `url(${background})`,
        width: "100%",
        height: "100vh",
      }}
    >
      <div>
        <h1 style={styles1.h3}> Login</h1>
      </div>

      <div style={styles.container}>
        <div className="mb-3">
          <label>
            <RiMailLine size={25} />
            Email
          </label>
          <input
            name="emailid"
            id="id_email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="form-control"
            type="email"
          />
        </div>
        <div className="mb-3">
          <label>
            <RiLockPasswordLine size={25} />
            Password
          </label>
          <input
            name="password"
            id="id_password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="form-control"
            type="password"
          />
        </div>
        <div className="mb-3" style={{ marginTop: 40 }}>
          <div>
            Don't have an account? <Link to="/signup">Signup here</Link>
          </div>
          <button
            name="signinbutton"
            id="id_signinbutton"
            onClick={signinuser}
            style={styles.signinButton}
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    height: 350,
    padding: 20,
    position: "relative",
    top: 200,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    borderColor: "#4d94ff",
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
  },
  signinButton: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "#9fbfdf",
    color: "black",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};

const styles1 = {
  h3: {
    textAlign: "center",
    position: "relative",
    top: 200,
    padding: 20,
    color: "white",
  },
};

export default Signin;
