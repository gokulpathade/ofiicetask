




import React, { useState } from 'react';
import { Paper, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import config from '../../config';

const Addemployee = () => {

  const [formData, setFormData] = useState({
    Emp_No: "",
    Name: "",
    Last_Name: "",
    Address: "",
    Contact: "",
    Role: "",
    Email: "",
    Password: "",
    Country: "",
    City: "",
    Department: "",
    Blood_Group: "",
    Hire_Date: "",
    Birth_Date: "",
    ManagerId: "",
  });

  const isPasswordValid = (password) => {
    // Password must be at least 8 characters long and include letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      Name,
      Last_Name,
      Address,
      Contact,
      Role,
      Image,
      Email,
      Password,
      Emp_No,
      Country,
      City,
      Department,
      Blood_Group,
      Hire_Date,
      Birth_Date,
      ManagerId,
    } = formData;

    if (
      Name.trim() === '' ||
      Last_Name.trim() === '' ||
      Address.trim() === '' ||
      Contact.trim() === '' ||
      Role.trim() === '' ||
      Image.trim() === '' ||
      Email.trim() === '' ||
      Password.trim() === '' ||
      Emp_No.trim() === '' ||
      Country.trim() === '' ||
      City.trim() === '' ||
      Department.trim() === '' ||
      Blood_Group.trim() === '' ||
      Hire_Date.trim() === '' ||
      Birth_Date.trim() === '' ||
      ManagerId.trim() === ''
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      toast.error('Please enter a valid email address');
      return;
    } else if (!isPasswordValid(Password)) {
      toast.error('Password must be at least 8 characters long and include letters and numbers.');
      return;
    }

    // Additional password validation logic can be added here
    axios
      .post(config.serverURL + "/user/signup", formData, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        console.log("Successfully added employee details ", result);

        if (result["status"] === "error") {
          toast.error("Successfully not added employee details");
        } else {
          toast.success('Signup successful');
        }
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
  }





  
  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 300, margin: 'auto', marginTop: 50 }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>


      <TextField
                  type="text"
                  className="form-control"
                  name="Emp_No"
                  id="id_Emp_No"
                  placeholder="Emp No"
                  value={formData.Emp_No}
                  onChange={handleChange}
                  // onChange={(event) => {
                  //   setEmp_No(event.target.value);
                  // }}
                />
   <TextField
                  type="text"
                  className="form-control"
                  name="Name"
                  id="id_Name"
                  placeholder="First Name"
                  // onChange={(event) => {
                  //   setName(event.target.value);
                  // }}

                  value={formData.Name}
                  onChange={handleChange}
                />
  <TextField
                  type="text"
                  className="form-control"
                  name="Last_Name"
                  id="id_Last_Name"
                  placeholder="Last Name"
                  // onChange={(event) => {
                  //   setLast_Name(event.target.value);
                  // }}
                  value={formData.Last_Name}
                  onChange={handleChange}
                />
 <TextField
                  type="date"
                  className="form-control"
                  name="Hire_Date"
                  id="id_Hire_Date"
                  placeholder="Password"
                  // onChange={(event) => {
                  //   setHire_Date(event.target.value);
                  // }}
                  value={formData.Hire_Date}
                  onChange={handleChange}
                />
   <TextField
                  type="date"
                  className="form-control"
                  name="Birth_Date"
                  id="id_Birth_Date"
                  placeholder="Birth Date"
                  // onChange={(event) => {
                  //   setBirth_Date(event.target.value);
                  // }}
                  value={formData.Birth_Date}
                  onChange={handleChange}
                />
   <TextField
                  type="Email"
                  className="form-control"
                  name="newEmail"
                  id="id_newEmail"
                  placeholder="name@meg-nxt.com"
                  // onChange={(event) => {
                  //   setEmail(event.target.value);
                  // }}
                  value={formData.Email}
                  onChange={handleChange}
                />
    <TextField
                  type="number"
                  className="form-control"
                  name="mobileno"
                  id="id_mobileno"
                  placeholder="Mobile No"
                  // onChange={(event) => {
                  //   setmobileNo(event.target.value);
                  // }}
                  value={formData.Contact}
                  onChange={handleChange}
                />
          
  <TextField
                  type="text"
                  className="form-control"
                  name="City"
                  id="id_City"
                  placeholder="City"
                  value={formData.City}
                  onChange={handleChange}
                  // onChange={(event) => {
                  //   setCity(event.target.value);
                  // }}
                />
<TextField
                  type="text"
                  className="form-control"
                  name="Address"
                  id="id_Address"
                  placeholder="Address"
                  value={formData.Address}
                  onChange={handleChange}

                  // onChange={(event) => {
                  //   setAddress(event.target.value);
                  // }}
                />
 <TextField
                  type="password"
                  className="form-control"
                  name="password2"
                  id="id_password2"
                  placeholder="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  // onChange={(event) => {
                  //   setPassword(event.target.value);
                  // }}
                />
<TextField
                  type="password"
                  className="form-control"
                  name="confirmpassword"
                  id="id_confirmpassword"
                  placeholder="Password"
                  value={formData.Password}
                  onChange={handleChange}

                  // onChange={(event) => {
                  //   setConfirmPassword(event.target.value);
                  // }}
                />















        {/* <TextField
          label="Username"
          fullWidth
          margin="normal"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        /> */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Signup
        </Button>
      </form>
      <ToastContainer />
    </Paper>
  );
};

export default Addemployee;










































// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// import config from "../../config";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import PasswordStrengthBar from "react-password-strength-bar";
// import PasswordStrengthMeter from "../slices/PasswordStrengthMeter";
// import { Grid } from "@mui/material";
// import 'react-toastify/dist/ReactToastify.css'

// import {
//   Card,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   Box,
// } from "@mui/material";
// import NavBar from "../dashboard/NavBar";
// import SideBar from "../dashboard/SideBar";
// import { ToastContainer, toast } from 'react-toastify';

// const Addemployee = () => {
//   // const [Emp_No, setEmp_No] = useState("");
//   // const [Name, setName] = useState("");
//   // const [Last_Name, setLast_Name] = useState("");
//   // const [Country, setCountry] = useState("");
//   // const [Email, setEmail] = useState("");

//   // const [Address, setAddress] = useState("");
//   // const [City, setCity] = useState("");
//   // const [Department, setDepartment] = useState("");
//   // const [Blood_Group, setBlood_Group] = useState("");
//   // const [Hire_Date, setHire_Date] = useState("");
//   // const [Birth_Date, setBirth_Date] = useState("");
//   // const [ManagerId, setManagerId] = useState("");
//   // const [Contact, setmobileNo] = useState("");
//   const [password, setPassword] = useState("");
//   // const [confirmPassword, setConfirmPassword] = useState("");
//   const [optionList, setOptionList] = useState([]); //just adding
//   // const [manageroptions, setManageroptions] = useState([]);

//   const options = ["A+", "B+", "AB+"];
//   const options1 = [
//     "India",
//     "Japan",
//     "Chaina",
//     "Italy",
//     "Japan",
//     "Nepal",
//     "Brazil",
//     "Afghanistan",
//     "Canada",
//     "Indonesia",
//     "Thailand",
//   ];
//   const [Role, setSelected] = useState("");
//   const optionss = ["Admin", "User", "Manager"];

//   const [registration, setRegistration] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [basicModal, setBasicModal] = useState(false);
//   const handleClose1 = () => setBasicModal(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     getempdetails();
//   }, []);

  // const [formData, setFormData] = useState({
  //   Emp_No: "",
  //   Name: "",

  //   Last_Name: "",
  //   Address: "",
  //   Contact: "",
  //   Role: "",

  //   Email: "",
  //   Password: "",

  //   Country: "",
  //   City: "",
  //   Department: "",
  //   Blood_Group: "",
  //   Hire_Date: "",
  //   Birth_Date: "",
  //   ManagerId: "",
  // });

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     // Update the state when form fields change
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
// const add=()=>{
  
//   toast("sgjkdllllllllllll")
 
// }
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Perform form validation
//     if (formData.Emp_No === "") {
//       // Handle the case where Emp_No is empty
//       // console.error("Emp_No is required");
//       toast.error("Emp_No is required");
//       toast.error("hello");
//       return;
//     }
//     if (formData.Name === "") {
//       // Handle the case where Emp_No is empty
//       console.error("Name is required");
//       return;
//     }
//     if (formData.Last_Name === "") {
//       // Handle the case where Emp_No is empty
//       console.error("Last Name is required");
//       return;
//     }
//     if (formData.Address === "") {
//       // Handle the case where Emp_No is empty
//       console.error("Address is required");
//       return;
//     }

//     if (formData.Contact === "") {
//       // Handle the case where Emp_No is empty
//       console.error("Contact is required");
//       return;
//     }
//     if (formData.Role === "") {
//       // Handle the case where Emp_No is empty
//       console.error("Role is required");
//       return;
//     }

//     if (formData.Email === "") {
//       // Handle the case where Emp_No is empty
//       console.error("Email is required");
//       return;
//     }

//     if (formData.Password === "") {
//       // Handle the case where Emp_No is empty
//       console.error("Password is required");
//       return;
//     }
//     if (formData.Password !== formData.ConfirmPassword) {
//       console.error("Password and Confirm Password do not match");
//       return;
//     }

//     if (formData.Country === "") {
//       // Handle the case where Emp_No is empty
//       console.error("Country is required");
//       return;
//     }

//     if (formData.City === "") {
//       // Handle the case where Emp_No is empty
//       console.error("City is required");
//       return;
//     }
//     if (formData.Department === "") {
//       // Handle the case where Emp_No is empty
//       console.error("Department is required");
//       return;
//     }

//     if (formData.Blood_Group === "") {
//       // Handle the case where Emp_No is empty
//       console.error("Blood Group is required");
//       return;
//     }
//     if (formData.Hire_Date === "") {
//       // Handle the case where Emp_No is empty
//       console.error("Hire Date is required");
//       return;
//     }
//     if (formData.Birth_Date === "") {
//       // Handle the case where Emp_No is empty
//       console.error("Birth Of Date is required");
//       return;
//     }
//     if (formData.ManagerId === "") {
//       // Handle the case where Emp_No is empty
//       console.error("ManagerId is required");
//       return;
//     }

//     // If all validations pass, proceed with the form submission
//     console.log("Form submitted with data:", formData);

//     // Call your API or perform other actions here
    // axios
    //   .post(config.serverURL + "/user/signup", formData, {
    //     headers: { token: sessionStorage["token"] },
    //   })
    //   .then((response) => {
    //     const result = response.data;
    //     console.log("Successfully added employee details ", result);

    //     if (result["status"] === "error") {
    //       toast.error("Successfully not added employee details");
    //     } else {
    //       toast.success("Successfully added employee details");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("Error");
    //     console.log(error);
    //   });

//     // Optionally, clear the form fields
//     setFormData({
//       Emp_No: "",
//       Name: "",
//       Last_Name: "",
//       Address: "",
//       Contact: "",
//       Role: "",

//       Email: "",
//       Password: "",
//       ConfirmPassword: "",

//       Country: "",
//       City: "",
//       Department: "",
//       Blood_Group: "",
//       Hire_Date: "",
//       Birth_Date: "",
//       ManagerId: "",
//     });
//   };

//   useEffect(() => {
//     // getmanagerdetails()
//     getuserdetails();
//     // getempdetails()
//     // getmanagernames()
//   }, [basicModal, show]);

//   const getuserdetails = () => {
//     axios
//       .get(config.serverURL + "/use/manager", {
//         headers: { token: sessionStorage["token"] },
//       })
//       .then((response) => {
//         const result = response.data;

//         if (result["status"] === "success") {
//           console.log(result);
//           // set the homes to the state member
//           setRegistration(result["data"]);
//         } else {
//           toast.error(result["error"]);
//         }
//       });
//   };

//   const getempdetails = () => {
//     axios
//       .get(config.serverURL + "/department/", {
//         headers: { token: sessionStorage["token"] },
//       })
//       .then((response) => {
//         const result = response.data;

//         if (result["status"] === "success") {
//           setOptionList(result["data"]);
//         } else {
//           toast.error(result["error"]);
//         }
//       });
//   };

//   return (
//     <>
//       <NavBar />
//       <SideBar />

//       <Box display="grid">
//         <form
//           style={{
//             border: "solid",
//             display: "flex",
//             textAlign: "center",
//             width: "40%",
//             padding: "10px",
//             margin: "10px",
//           }}
//           onSubmit={handleSubmit}
//         >
//           {/* <Grid container spacing={12}>
//        <h3>Add New Employee</h3>
         
//        </Grid> */}
//           <Grid container spacing={2} className="container-sm">
//             {/* ... Your other form fields ... */}

//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
                // <TextField
                //   type="text"
                //   className="form-control"
                //   name="Emp_No"
                //   id="id_Emp_No"
                //   placeholder="Emp No"
                //   value={formData.Emp_No}
                //   onChange={handleChange}
                //   // onChange={(event) => {
                //   //   setEmp_No(event.target.value);
                //   // }}
                // />
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
//                 <InputLabel id="department-label">Department</InputLabel>
//                 <Select
//                   labelId="department-label"
//                   id="id_Department"
//                   // value={Department}
//                   label="Department"
//                   // onChange={(event) => setDepartment(event.target.value)}
//                   value={formData.Department}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="">Select Department</MenuItem>
//                   {optionList?.map((item) => (
//                     <MenuItem key={item.deptid} value={item.deptname}>
//                       {item.deptname}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
                // <TextField
                //   type="text"
                //   className="form-control"
                //   name="Name"
                //   id="id_Name"
                //   placeholder="First Name"
                //   // onChange={(event) => {
                //   //   setName(event.target.value);
                //   // }}

                //   value={formData.Name}
                //   onChange={handleChange}
                // />
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
                // <TextField
                //   type="text"
                //   className="form-control"
                //   name="Last_Name"
                //   id="id_Last_Name"
                //   placeholder="Last Name"
                //   // onChange={(event) => {
                //   //   setLast_Name(event.target.value);
                //   // }}
                //   value={formData.Last_Name}
                //   onChange={handleChange}
                // />
//               </FormControl>
//             </Grid>

//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
//                 <InputLabel id="bloodgroup-label">Blood Group</InputLabel>
//                 <Select
//                   labelId="bloodgroup-label"
//                   id="id_Blood_Group"
//                   value={formData.Blood_Group}
//                   onChange={handleChange}
//                   // value={Blood_Group}
//                   // onChange={(event) => setBlood_Group(event.target.value)}
//                   label="Blood Group"
//                 >
//                   <MenuItem value="">Select Blood group</MenuItem>
//                   {options.map((item) => (
//                     <MenuItem key={item} value={item}>
//                       {item}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
//                 <InputLabel id="country-label">Country</InputLabel>
//                 <Select
//                   labelId="country-label"
//                   id="id_selectCountry"
//                   // value={Country}
//                   label="Country"
//                   // onChange={(event) => setCountry(event.target.value)}

//                   value={formData.Country}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="">Select</MenuItem>
//                   {options1.map((item) => (
//                     <MenuItem key={item} value={item}>
//                       {item}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             {/* ... Continue adding rows and form fields as needed ... */}
//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
                // <TextField
                //   type="date"
                //   className="form-control"
                //   name="Hire_Date"
                //   id="id_Hire_Date"
                //   placeholder="Password"
                //   // onChange={(event) => {
                //   //   setHire_Date(event.target.value);
                //   // }}
                //   value={formData.Hire_Date}
                //   onChange={handleChange}
                // />
//               </FormControl>
//             </Grid>

//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
                // <TextField
                //   type="date"
                //   className="form-control"
                //   name="Birth_Date"
                //   id="id_Birth_Date"
                //   placeholder="Birth Date"
                //   // onChange={(event) => {
                //   //   setBirth_Date(event.target.value);
                //   // }}
                //   value={formData.Birth_Date}
                //   onChange={handleChange}
                // />
//               </FormControl>
//             </Grid>

//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
                // <TextField
                //   type="Email"
                //   className="form-control"
                //   name="newEmail"
                //   id="id_newEmail"
                //   placeholder="name@meg-nxt.com"
                //   // onChange={(event) => {
                //   //   setEmail(event.target.value);
                //   // }}
                //   value={formData.Email}
                //   onChange={handleChange}
                // />
//               </FormControl>
//             </Grid>
//             {/* ... Continue adding rows and form fields as needed ... */}
//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
                // <TextField
                //   type="number"
                //   className="form-control"
                //   name="mobileno"
                //   id="id_mobileno"
                //   placeholder="Mobile No"
                //   // onChange={(event) => {
                //   //   setmobileNo(event.target.value);
                //   // }}
                //   value={formData.Contact}
                //   onChange={handleChange}
                // />
//               </FormControl>
//             </Grid>

//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
//                 <InputLabel id="role-label">Select User Role</InputLabel>
//                 <Select
//                   labelId="role-label"
//                   id="id_Role"
//                   value={formData.Role}
//                   onChange={handleChange}
//                   // value={Role}
//                   // onChange={(event) => setSelected(event.target.value)}
//                   label="Select User Role"
//                 >
//                   <MenuItem value="">Select role</MenuItem>
//                   {optionss.map((item) => (
//                     <MenuItem key={item} value={item}>
//                       {item}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             {/* ... Continue adding rows and form fields as needed ... */}
            // <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
                {/* <TextField
                  type="text"
                  className="form-control"
                  name="City"
                  id="id_City"
                  placeholder="City"
                  value={formData.City}
                  onChange={handleChange}
                  // onChange={(event) => {
                  //   setCity(event.target.value);
                  // }}
                /> */}
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
                // <TextField
                //   type="text"
                //   className="form-control"
                //   name="Address"
                //   id="id_Address"
                //   placeholder="Address"
                //   value={formData.Address}
                //   onChange={handleChange}

                //   // onChange={(event) => {
                //   //   setAddress(event.target.value);
                //   // }}
                // />
//               </FormControl>
//             </Grid>
//             {/* ... Continue adding rows and form fields as needed ... */}
//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
                // <TextField
                //   type="password"
                //   className="form-control"
                //   name="password2"
                //   id="id_password2"
                //   placeholder="Password"
                //   value={formData.Password}
                //   onChange={handleChange}
                //   // onChange={(event) => {
                //   //   setPassword(event.target.value);
                //   // }}
                // />
//                 <PasswordStrengthMeter password={password} />
//               </FormControl>
//             </Grid>

//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
                // <TextField
                //   type="password"
                //   className="form-control"
                //   name="confirmpassword"
                //   id="id_confirmpassword"
                //   placeholder="Password"
                //   value={formData.Password}
                //   onChange={handleChange}

                //   // onChange={(event) => {
                //   //   setConfirmPassword(event.target.value);
                //   // }}
                // />
//                 {/* <InputLabel for="floatingPassword">Confirm Password</InputLabel> */}
//               </FormControl>
//             </Grid>

//             <Grid item xs={6}>
//               <FormControl sx={{ width: "80%" }}>
//                 <InputLabel id="manager-label">Select Manager</InputLabel>
//                 <Select
//                   labelId="manager-label"
//                   id="id_Manager"
//                   // value={ManagerId}
//                   // onChange={(event) => setManagerId(event.target.value)}
//                   value={formData.ManagerId}
//                   onChange={handleChange}
//                   label="Select Manager"
//                 >
//                   <MenuItem value="">Select Manager</MenuItem>
//                   {registration
//                     .filter((emps) => emps.Role === "manager")
//                     .map((emps) => (
//                       <MenuItem key={emps.Rid} value={emps.Rid}>
//                         {emps.Rid} <br />
//                         <span>{emps.Name}</span>
//                       </MenuItem>
//                     ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             {/* ... Continue adding rows and form fields as needed ... */}
//             <Grid container item justifyContent="center">
//               <Grid item>
//                 {/* <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   style={styles.signinButton}
//                 >
//                   Submit
//                 </Button> */}
//                 <Button variant="contained" onClick={add}>
//                   Submit
//                 </Button>
                
//               </Grid>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </>
//   );
// };

// export default Addemployee;















// SignupForm.js
// import React, { useState } from 'react';
// import { Paper, TextField, Button } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Addemployee = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = () => {
//     // Perform signup logic here
//     // For demonstration purposes, we'll just show a toast message

//     if (username.trim() === '') {
//       toast.error('Please enter a username');
//       return;
//     }

//     if (email.trim() === '') {
//       toast.error('Please enter an email');
//       return;
//     }

//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       toast.error('Please enter a valid email address');
//       return;
//     }

//     if (password.trim() === '') {
//       toast.error('Please enter a password');
//       return;
//     }

//     // Additional password validation logic can be added here

//     // If all validations pass, you can proceed with the signup logic
//     toast.success('Signup successful');
//   };

//   return (
//     <Paper elevation={3} style={{ padding: 20, maxWidth: 300, margin: 'auto', marginTop: 50 }}>
//       <h2>Signup</h2>
//       <TextField
//         label="Username"
//         fullWidth
//         margin="normal"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <TextField
//         label="Email"
//         fullWidth
//         margin="normal"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <TextField
//         label="Password"
//         fullWidth
//         margin="normal"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
//         Signup
//       </Button>
//       <ToastContainer />
//     </Paper>
//   );
// };

// export default Addemployee;
















// import React, { useState } from 'react';
// import { Paper, TextField, Button } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Addemployee = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault(); // Prevents the default form submission behavior

//     // Your signup logic here
//     if (username.trim() === '') {
//       toast.error('Please enter a username');
//       return;
//     }

//     if (email.trim() === '') {
//       toast.error('Please enter an email');
//       return;
//     }

//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       toast.error('Please enter a valid email address');
//       return;
//     }

//     if (password.trim() === '') {
//       toast.error('Please enter a password');
//       return;
//     }

//     // Additional password validation logic can be added here

//     // If all validations pass, you can proceed with the signup logic
//     toast.success('Signup successful');
//   };

//   return (
//     <Paper elevation={3} style={{ padding: 20, maxWidth: 300, margin: 'auto', marginTop: 50 }}>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Username"
//           fullWidth
//           margin="normal"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <TextField
//           label="Email"
//           fullWidth
//           margin="normal"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           label="Password"
//           fullWidth
//           margin="normal"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           Signup
//         </Button>
//       </form>
//       <ToastContainer />
//     </Paper>
//   );
// };

// export default Addemployee;


