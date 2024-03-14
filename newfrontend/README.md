# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

































<!-- Apply leave -->
import React from "react";

import {
  Box,
  Table,
  Tab,
  Tabs,
  Typography,
  Paper,
  TextField,
  Stack,
  Button,
  Divider,
  Card,
  CardMedia,
} from "@mui/material";
import PropTypes from "prop-types";

// import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@mui/material/MenuItem";
// import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import moment from "moment";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import NavBar from "../dashboard/NavBar";
import SideBar from "../dashboard/SideBar";

export default function LeaveApply() {
  const [firstName, setfirstname] = useState("");
  const [lastName, setlasttname] = useState("");

  const [deptname, setdept] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  const [reason, setreason] = useState("");
  const [leaveDays, setleaveday] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [applyfor, setapplyfor] = useState([]);

  const appoptions = ["Full Day", "Half Day"];
  const optionss = [
    "Earned Leave",
    "Casual Leave",
    "Special Sick Leave",
    "Maternity Leave",
    "Comp Off",
    "Loss Of Pay",
    "Outdoor Duty",
  ];

  const [appleave, setApplyleave] = useState([]);
  const [appleave1, setApplyleave1] = useState([]);

  const [reportstatus, setreportstatus] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);

    // Calculate and set leave days if both Start Date and End Date are selected
    if (newStartDate && EndDate) {
      calculateAndSetLeaveDays(newStartDate, EndDate);
    }
  };

  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);
    if (StartDate && newEndDate) {
      if (new Date(newEndDate) < new Date(StartDate)) {
        toast.error("End Date cannot be before Start Date");
      }
    }
  };

  const calculateAndSetLeaveDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
    setleaveday(daysDifference);
  };

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteleave = (leaveid) => {
    console.log("delete idddddddddddd : ", leaveid);
    axios
      .delete(config.serverURL + "/applyLeave/deleteleave/" + leaveid, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        if (result["status"] === "success") {
          // reload the screen
          // setdeleteleave()
          getapplydetails(USER_ID);
          getapplydetails1(USER_ID);
          toast.success("successfully deleted....!!");

          handleClose1();
        } else {
          toast.error(result["error"]);
        }
      });
  };

  //delete report id from reporting table

  const deletereport = (reportid) => {
    console.log("delete idddddddddddd : ", reportid);
    axios
      .delete(config.serverURL + "/reporting/deletreport/" + reportid, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        if (result["status"] === "success") {
          // reload the screen
          // setdeleteleave()
          toast.success("successfully deleted....!!");
          getreportingdetails(USER_ID);
          handleClose();
        } else {
          toast.error(result["error"]);
        }
      });
  };

  //get apply leave details from applyleave table

  const getapplydetails = (USER_ID) => {
    axios
      .get(config.serverURL + "/applyLeave/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          console.log("get specific details from applyleave table ");
          console.log("then response ", result);
          // setapplystatus(response.data.data)
          console.log("getapply pending", response.data.data);

          // set the homes to the state member

          setApplyleave(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };
  const getapplydetails1 = (USER_ID) => {
    axios
      .get(config.serverURL + "/applyLeave/approved/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          console.log("get specific details from applyleave table ");
          console.log("then response ", result);
          console.log("getapply approved mmmmmm", response.data.data);
          const enddate = moment(response.data.data.EndDate).format(
            "YYYY-MM-DD"
          );
          console.log("EndDate:", enddate);
          const curdate = moment(new Date()).format("YYYY-MM-DD");
          console.log("Current Date:", curdate);
          console.log("Comparison Result:", enddate <= curdate);
          // Check if applyStatus is 'pending'

          setApplyleave1(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  //get specific recored from reporting
  const getreportingdetails = (USER_ID) => {
    console.log("reporting id : ", USER_ID);
    axios
      .get(config.serverURL + "/reporting/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          console.log("get specific details from reporting table ");
          console.log("then response ", result);
          // setapplystatus(response.data.data)
          //  console.log("Reporting details from  ppppppppppp",response.data.data)

          setreportstatus(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  const handleDelete = (emps) => {
    deletereport(emps.reportid);

    console.log("Delete button clicked. emps:", emps);
    handleShow(emps);
  };

  const handleDelete1 = (emps) => {
    deleteleave(emps.leaveid);

    console.log("Delete button clicked. emps:", emps);
    handleShow1(emps);
  };

  useEffect(() => {
    getuserdetails(USER_ID); //user details get
    getapplydetails(USER_ID); //pending details get
    getreportingdetails(USER_ID);
    getapplydetails1(USER_ID); //approved details get
  }, []);

  const getuserdetails = (USER_ID) => {
    axios
      .get(config.serverURL + "/use/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          console.log("UserDetails Response from UserId: ");
          console.log("then response ", result);
          // setempno(response.data.data[0].empno) //backend  rid
          setfirstname(response.data.data[0].firstName);
          setdept(response.data.data[0].department); //backend  department name
          setlasttname(response.data.data[0].lastName);
          setRegid(response.data.data[0].rid);
          // console.log("reid    :",response.data.data[0].rid)

          // set the homes to the state member
          //  setRegistration(result['data'])
        } else {
          toast.error(result["error"]);
        }
      });
  };

  const apply = () => {
    // check if user has really entered any value
    if (StartDate.length === 0) {
      toast.error("please select Date ");
    } else if (EndDate.length === 0) {
      toast.error("please select date");
    } else if (EndDate < StartDate) {
      toast.error("End Date cannot be before Start Date");
    } else if (applyfor.length === 0) {
      toast.error("please select apply for");
    } else if (reason.length === 0) {
      toast.error("please mention reason");
    } else if (leaveType.length === 0) {
      toast.error("please select leave type");
    } else {
      const start = new Date(StartDate);
      const end = new Date(EndDate);
      const timeDifference = end - start;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
      setleaveday(daysDifference);
      console.log(leaveDays);

      const body = {
        StartDate,
        EndDate,
        reason,
        appid,
        applyfor,
        leaveDays: daysDifference,
        leaveType,
      };
      console.log("Apply for : ", applyfor);
      console.log("leave days : ", leaveDays);

      console.log("body : ", body);
      axios
        .post(config.serverURL + "/applyLeave/leave", body, {
          headers: { token: sessionStorage["token"] },
        })
        .then((response) => {
          // get the data returned by server
          const result = response.data;
          console.log(response.data);

          // sessionStorage.setItem("time",TimeIn);
          // const v=sessionStorage.getItem("time")

          // console.log(v)

          // check if user's authentication is successfull
          if (result["status"] === "error") {
            toast.error("not insertd");
          } else {
            toast.success("successful");

            // navigate to the singin page
            navigate("/home");
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };
  const [appid, setRegid] = useState();
  const USER_ID = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [dvalue, setDvalue] = React.useState(dayjs("2023-09-09"));

  const [value, setValue] = React.useState(0);

  const [apply1, setApply1] = React.useState("");
  const [type, setType] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleclick = (event) => {
    setApply1(event.target.value);
    setType(event.target.value);
  };

  return (
    <div>
      <NavBar />
      <SideBar />

      {/* <Header/> */}
      {/* <PrimarySearchAppBar/> */}
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#f2f2f2",
          height: "50vw",
          marginTop: "40px",
        }}
      >
        {/* <Header/> */}

        <Box component="main" sx={{ flexGrow: 1, p: 7 }}>
          <Box sx={{ width: "95%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Apply Leave" {...a11yProps(0)} />
                <Tab label="Leave Balances" {...a11yProps(1)} />
                <Tab label="Leave Calender" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel
              sx={{
                width: "100%",
                padding: "5px",
                textAlign: "center",
                overflow: "hidden",
              }}
              value={value}
              index={0}
            >
              <Paper sx={{ width: "80%", overflow: "hidden" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ padding: "20px", marginRight: "390px" }}
                >
                  Apply Leave
                </Typography>
                <Divider />

                <div
                  className="row justify-content-center"
                  style={{ marginTop: "10px" }}
                >
                  <div
                    className="col-4"
                    style={{ fontSize: 20, marginLeft: "10px" }}
                  >
                    <Stack
                      sx={{
                        width: "100%",
                        padding: "5px",
                        textAlign: "center",
                        overflow: "hidden",
                      }}
                      spacing={2}
                      direction="row"
                    >
                      <label>First Name</label>
                      <br />
                      <TextField
                        disabled
                        value={firstName}
                        name="FirstName"
                        id="id_FirstName"
                        style={{ borderStyle: "none" }}
                        onChange={(event) => {
                          setfirstname(event.target.value);
                        }}
                        className="form-control"
                        type="text"
                        readOnly
                      />

                      <label>Last Name</label>

                      <TextField
                        disabled
                        value={lastName}
                        name="LastName"
                        id="id_LAstName"
                        style={{ borderStyle: "none" }}
                        onChange={(event) => {
                          setlasttname(event.target.value);
                        }}
                        className="form-control"
                        type="text"
                        readOnly
                      />
                    </Stack>

                    <Stack spacing={2} direction="row">
                      <label> Department</label>
                      <TextField
                        disabled
                        value={deptname}
                        name="Department1"
                        id="id_Department1"
                        style={{ borderStyle: "none" }}
                        onChange={(event) => {
                          setdept(event.target.value);
                        }}
                        className="form-control"
                        type="text"
                        readOnly
                      />
                      <br />
                      <label>Leave Days</label>
                      {/* <input  name='leavedays' id='id_leavedays'
            onChange={(event) => {
              setleaveday(event.target.value)
            }}
            className='form-control'
            type='text' /> */}

                      <TextField
                        name="leavedays"
                        id="id_leavedays"
                        // onChange={(event) => {
                        //   setleaveday(event.target.value)
                        // }}
                        value={leaveDays}
                        className="form-control"
                        type="text"
                        readOnly
                      />
                    </Stack>

                    <Stack spacing={2} direction="row">
                      <label>Leave Type</label>
                      <Select
                        className="form-control"
                        name="leavetype"
                        id="id_leavetype"
                        sx={{ width: "200px" }}
                        value={leaveType}
                        onChange={(event) => setLeaveType(event.target.value)}
                      >
                        {/* <option>select</option> */}
                        {optionss.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>

                      <br />
                      <label>Start Date</label>
                      <TextField
                        name="startdate"
                        id="id_startdate"
                        // onChange={(event) => {
                        //   setStartDate(event.target.value)
                        // }}
                        onChange={handleStartDateChange}
                        className="form-control"
                        type="date"
                      />
                    </Stack>
                  </div>
                  <Stack spacing={2} direction="row">
                    <div
                      className="col-4"
                      style={{
                        borderLeftStyle: "",
                        borderRightColor: "lightgray",
                        fontSize: 20,
                        marginLeft: "10px",
                      }}
                    >
                      <label>Apply for</label>
                      <Select
                        className="form-control"
                        sx={{ width: "200px" }}
                        value={applyfor}
                        name="ApplyFor"
                        id="id_Applyfor"
                        onChange={(event) => setapplyfor(event.target.value)}
                      >
                        {appoptions.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>

                      <label> Apply for Reason</label>
                      <textarea
                        rows={4}
                        cols={40}
                        onChange={(event) => {
                          setreason(event.target.value);
                        }}
                        className="form-control"
                        type="text"
                        name="applyforreason"
                        id="id_applyforreason"
                      />

                      <br />

                      <label> End Date</label>
                      <TextField
                        // onChange={(event) => {
                        //   setEndDate(event.target.value)
                        // }}
                        onChange={handleEndDateChange}
                        className="form-control"
                        type="date"
                        name="ENdDATE"
                        id="id_ENdDATE"
                      />
                    </div>
                  </Stack>
                </div>

                <div className="row justify-content-center">
                  <div className="col-4">
                    <button
                      name="btn_ApplyLeave"
                      id="id_ApplyLeave"
                      onClick={apply}
                      style={styles.signinButton}
                    >
                      Submit
                    </button>
                  </div>
                  <br />
                </div>
              </Paper>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {/* Item Two */}
              <Stack direction="row" spacing={2}>
                <Paper sx={{ height: "210px", width: "250px" }}>
                  <label>Casual Leave</label>
                  <br />
                  <Button variant="text">Show Details</Button>
                </Paper>
                <Paper sx={{ height: "210px", width: "250px" }}>
                  <label>Earned Leave</label>
                  <br />
                  <Button variant="text">Show Details</Button>
                </Paper>
                <Paper sx={{ height: "210px", width: "250px" }}>
                  <label>Maternity Leave</label>
                  <br />
                  <Button variant="text">Show Details</Button>
                </Paper>
              </Stack>

              <Paper
                sx={{ height: "210px", width: "250px", marginTop: "15px" }}
              >
                <label>Comp Off</label>
                <br />
              </Paper>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Paper
                sx={{ height: "310px", width: "350px", marginTop: "15px" }}
              >
                Calender
                <Divider />
              </Paper>
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

const styles = {
  container: {
    width: 100,
    // height: 620,
    height: 100,
    padding: 20,
    position: "relative",
    top: 0,
    left: 0,
    right: 50,
    bottom: 0,
    margin: "auto",

    marginTop: 500,
    borderColor: "#102c57",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
    display: "flex",
    justifycontent: "center",
  },
  signinButton: {
    position: "relative",
    width: "60%",
    height: 40,
    backgroundColor: "#102c57",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};



















<!-- admin dashboard  -->



// import React from 'react'

// function AdminDashboard() {
//   return (

//     <div>

//       AdminDashboard</div>
//   )
// }

// export default AdminDashboard

import React from "react";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as AiIcons from "react-icons/ai";
// import Sidebar from '../../components/sidebar'
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import b from '../../images/e.png'
import d from "../Ceinsys Tech Ltd New Logo 3.jpg";
// import s from '../../images/team.png'
import moment from "moment";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { MDBContainer } from "mdb-react-ui-kit";
// import {  MDBCol } from 'mdb-react-ui-kit';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Grid } from "@mui/material";
import { BsFileX } from "react-icons/bs";
import NavBar from "./NavBar";
import AdminSideBar from "./AdminSideBar";
import SideBar from "../dashboard/SideBar";

function Admindashboard() {
  const [registrationss, setRegistrationss] = useState([]);
  const [reportings, setreportings] = useState([]);
  const [applyleaves, setapplyleaves] = useState([]);
  const [dept, setdept] = useState([]);
  const [leave, setleave] = useState([]);
  const [applyStatus, setapplystatus] = useState([]);
  // const[reportingstatus,setreportingstatus] = useState([])
  const [status, setstatus] = useState([]);
  const [appids, setappid] = useState("");
  const [leaveid, setleaveid] = useState("");
  const appoptions = ["approved", "rejected"];
  const reportoptions = ["Approved", "Rejected"];
  const [stauss, setStatuss] = useState("");
  const [loadData, setData] = useState([]);

  const [reporting, setReporting] = useState([]);
  const [reportingapproved, setReportingapproved] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getapplyleavedetails();
    getapplyleavedetailsstatus();
    depts();
    getuserdetailss();
    getuserdetailss1();
    getreportingdetails();
    getreporting();
    // getdetailbyidstatus()
  }, []);

  // apply leave details all
  const getapplyleavedetails = () => {
    axios
      .get(config.serverURL + "/applyLeave/", {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        // console.log("get all details of applyleaves : ",result)

        if (result["status"] === "success") {
          //setstatus(response.data.data)//applyStatus
          //  setappid(response.data.data[0].leaveid)////just commented for leaveid error line 62 inspect
          //  console.log("apply status from getdetails mehod :",response.data.data)
          //    console.log("appid get all details : ",response.data.data[0].leaveid) //justn 17-07-2023 commented for leaveid error line 62 inspect
          console.log(result);
          // set the homes to the state member
          setData(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  //get all details from reporting method using inner join
  const getreportingdetails = () => {
    axios
      .get(config.serverURL + "/reporting/reportingdetails/", {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        //    console.log("Reportings  : ",result)

        if (result["status"] === "success") {
          //  console.log("apply status from getdetails mehod :",response.data.data)

          console.log(result);
          // set the homes to the state member
          setreportings(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  // edit method for applyleave table status updated

  const edituser = (appid) => {
    // console.log("appid : ",appid)

    const body = { applyStatus };
    // console.log("bodyyyy : ",body)
    axios
      .put(config.serverURL + "/applyLeave/edit/" + appid, body, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        //  console.log("succesfully added data ",result)
        if (result["status"] === "success") {
          getapplyleavedetailsstatus();
          toast.success("successfully Upated");
          //  navigate('/manageemp')
        } else {
          toast.error(result["error"]);
          toast.error("not updated");
        }
      })
      .catch((error) => {
        //console.log('error')
        console.log(error);
      });
  };

  const getreportingApproved = (id, valuess) => {
    console.log("in getreportingApproved");
    console.log("valuess ::", valuess);
    axios
      .get(config.serverURL + "/reporting/ss/" + id, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        console.log("approved  : ", result["status"]);

        if (result["status"] === "success") {
          console.log(
            "specific reporting details showing :",
            response.data.data
          );

          console.log(result);
          // const reportingData = result['data']; // Get the data
          console.log("reportingooooooooooooooooo : ", result["data"]);
          setReportingapproved(result["data"]);
          editReport(id, valuess, result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  //Rejected data get by id
  //     const getdetailbyidstatus = (idd) => {

  //  console.log("get id from getdetailsbyidstatus ::",idd)

  //       axios
  //         .get(config.serverURL + '/registration1/dd/' + idd , {
  //           headers: { token: sessionStorage['token'] },
  //         })
  //         .then((response) => {
  //           const result = response.data
  //           console.log("reporting data from getdetailbyidstatus   : ",result)

  //           if (result['status'] === 'success') {

  //             // console.log("apply status from getdetails mehod :",response.data.data)

  //              console.log(result)

  //              const rejectedData =result['data']

  //            // setreportings(result['data'])
  //           } else {
  //             toast.error(result['error'])
  //           }
  //         })
  //     }

  //     const deleterejecteddata = () => {
  //             axios
  //              .get(config.serverURL + '/registration1/rejected/' +  + '/' +  {
  //                headers: { token: sessionStorage['token'] },
  //              })
  //              .then((response) => {
  //                const result = response.data
  //                console.log("reporting data from getdetailbyidstatus   : ",result)

  //                if (result['status'] === 'success') {

  //                  // console.log("apply status from getdetails mehod :",response.data.data)

  //                   console.log(result)

  //                 // setreportings(result['data'])
  //                } else {
  //                  toast.error(result['error'])
  //                }
  //              })
  //          }

  const getdetailbyidstatus = (idd) => {
    console.log("get id from getdetailsbyidstatus:", idd);

    axios
      .get(config.serverURL + "/registration1/dd/" + idd, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        console.log("reporting data from getdetailbyidstatus:", result);

        if (result["status"] === "success") {
          const rejectedData = result["data"];
          // Call the deleterejecteddata function here with the retrieved rejectedData
          deleterejecteddata(rejectedData);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  const deleterejecteddata = (rejectedData) => {
    for (const data of rejectedData) {
      const regid = data.rid; //
      const TodayDate = moment(data.Date).format("YYYY-MM-DD");

      axios
        .delete(
          config.serverURL +
            "/registration1/rejected/" +
            TodayDate +
            "/" +
            regid,
          {
            headers: { token: sessionStorage["token"] },
          }
        )
        .then((response) => {
          const result = response.data;
          console.log("Deletion result:", result);

          if (result["status"] === "success") {
            // Handle successful deletion
          } else {
            toast.error(result["error"]);
          }
        });
    }
  };

  // Call the getdetailbyidstatus function with the desired ID
  // getdetailbyidstatus(r.reportid);

  //fetch/get data from reporting table
  const getreporting = () => {
    axios
      .get(config.serverURL + "/reporting/details/", {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        console.log("getreporting method only for approved status : ", result);

        if (result["status"] === "success") {
          console.log("all reporting details showing :", response.data.data);

          console.log(result);

          setReporting(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  const handleInsertion = (reportingData) => {
    console.log("inside handleInsertion reporting", reportingData);

    let obj = {
      timeIn: reportingData[0].timeIn,
      timeOut: reportingData[0].timeOut,
      todayDate: moment(reportingData[0].Date).format("YYYY-MM-DD"),
      regid: reportingData[0].rid,
      status: "present",
    };
    console.log("obj", obj);
    axios
      .post(config.serverURL + "/timereg/timeee", obj, {
        headers: {
          token: sessionStorage.getItem("token"), // Make sure to use getItem() to retrieve the token
        },
      })
      .then((response) => {
        console.log("Data inserted from handleInsertion:", response.data);
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });
  };

  // this method use for insert the record from reporting table to registration1 table
  //Report table status updated
  const editReport = (id, status, reportingData) => {
    // getreportingApproved(id) // Fetch approved data asynchronously
    console.log("data coming from editReport : ", reportingData);
    console.log("appid : ", id);
    console.log("status : ", status);
    const body = { status };
    //  console.log("bodyyyy : ", body)
    axios
      .put(config.serverURL + "/reporting/reportedit/" + id, body, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        console.log("succesfully added data  from editReport ::", result);
        if (result["status"] === "success") {
          getreportingdetails();
          if (status === "Rejected") {
            getdetailbyidstatus(id);
          }

          console.log("status vd", status);
          if (status === "Approved") {
            console.log("inside approved if condition ");
            // Move the handleInsertion call here, inside the successful response
            handleInsertion(reportingData);
          }
          // else if(status==='Rejected')
          // {
          //   axios
          //   .get(config.serverURL + '/registration1/ss/' + idd +"/" + datee, {
          //     headers: { token: sessionStorage['token'] },
          //   })
          //   .then((response) => {
          //     console.log("Registration1   : ",response)

          //     if (result['status'] === 'success') {

          //     } else {
          //       toast.error(result['error'])
          //     }
          //   })
          // }
          toast.success("successfully Upated");
        } else {
          toast.error(result["error"]);
          toast.error("not updated");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //registrations count details

  const getuserdetailss = () => {
    axios
      .get(config.serverURL + "/employee/emp/count/", {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response;
        console.log("totoal employee count: ", result);
        // console.log("status",result.data.status);

        if (result.data.status === "success") {
          setRegistrationss(response.data.data[0].counter);
        } else {
          toast.error(result.data.status);
        }
      });
  };

  const getapplyleavedetailsstatus = () => {
    axios
      .get(config.serverURL + "/applyLeave/", {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        console.log("get all details of applyleaves sidebar file : ", result);

        if (result["status"] === "success") {
          //setstatus(response.data.data)//applyStatus
          //  setappid(response.data.data[0].leaveid)////just commented for leaveid error line 62 inspect
          console.log(
            "apply status from getdetails mehod sidebar file:",
            response.data.data
          );
          //    console.log("appid get all details : ",response.data.data[0].leaveid) //justn 17-07-2023 commented for leaveid error line 62 inspect
          console.log(result);
          // set the homes to the state member
          setData(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  const updateNotification = () => {
    const body = { stauss };
    // setOpen(false);
    axios
      .put(config.serverURL + "/applyLeave/applyleavestatus/", body, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        //  console.log("resp",response.data.status)
        const result = response.data.data[0].status;
        console.log("succesfully added data ", result);
        if (result["status"] === "success") {
          setStatuss(response.data.data[0].status);
          console.log("ooooooooooooooooooooo", response.data.data.status);

          getapplyleavedetailsstatus();
          toast.success("successfully Upated");
          navigate("/admindashboard");
          // setOpen(false)
        } else {
          toast.error(result["error"]);
          toast.error("not updated");
        }
      })
      .catch((error) => {
        //console.log('error')
        console.log(error);
      });

    toast.success("sccessfullty");
  };

  //applyleave count deatils

  const getuserdetailss1 = () => {
    axios
      .get(config.serverURL + "/applyLeave/applyleave/count/", {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response;
        console.log("totoal todays leave count: ", result);
        // console.log("status",result.data.status);

        if (result.data.status === "success") {
          setleave(response.data.data[0].counter);
        } else {
          toast.error(result.data.status);
        }
      });
  };

  //departments count
  const depts = () => {
    axios
      .get(config.serverURL + "/department/dept/count/", {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response;
        // console.log("totoal employee count: ", result)
        // console.log("status",result.data.status);

        if (result.data.status === "success") {
          setdept(response.data.data[0].counter);
        } else {
          toast.error(result.data.status);
        }
      });
  };

  // ***************************************************************************************************//
  // ***************************************************************************************************//
  return (
    <>
      <NavBar />
      <SideBar/>
      {/* <AdminSideBar /> */}

      <div className="Home" style={{ marginLeft: 60, marginTop: 30 }}>
        {/* <div className='container-sm container-fluid' style={{width:'400px',height:'200px', color:'white',backgroundColor:' #8275a5',marginLeft:'70px'}}> 
  
   
     <h3 style={styles.h3}>Total Employee   {registrationss} </h3>
     <div style={{marginLeft:0,marginTop:5}}><FaIcons.FaUserFriends size={'100px'}/></div> */}

        {/* <div className="card mb-3" style={{maxwidth: '540px'}}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={<PeopleAltIcon/>} className="img-fluid rounded-start" alt="h"/>
      
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h1>Card title</h1>
        <p style={{color:'black'}}>This is a wider card with supporting text </p>
        <p className="card-text"><small className="text-muted">{registrationss}</small></p>
      </div>
    </div>
  </div>

</div> */}
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <MDBCard
              style={{
                maxWidth: "400px",
                backgroundColor: " #f2f2f2",
                boxShadow: 2,
              }}
            >
              <MDBRow className="g-0">
                <MDBCol md="4">
                  {/* <FcIcons.FcDepartment size={'100px'} marginTop={'10'}/> */}
                  <MDBCardImage src={d} style={{ height: "100px" }} fluid />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle
                      className="text-black"
                      style={{ fontSize: 22 }}
                    >
                      Total Employees
                    </MDBCardTitle>
                    <MDBCardText
                      className="text-black"
                      style={{ fontSize: 35 }}
                    >
                      {registrationss}
                    </MDBCardText>
                    {/* <MDBCardText>
              <small className='text-muted'>Last updated 3 mins ago</small>
            </MDBCardText> */}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </Grid>
          <Grid item xs={2}>
            <MDBCard style={{ maxWidth: "400px", backgroundColor: " #f2f2f2" }}>
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <FcIcons.FcDepartment size={"100px"} />
                  <MDBCardImage style={{ height: "40px" }} fluid />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle
                      className="text-black"
                      style={{ fontSize: 22 }}
                    >
                      Total Departments
                    </MDBCardTitle>
                    <MDBCardText
                      className="text-black"
                      style={{ fontSize: 35 }}
                    >
                      {dept}
                    </MDBCardText>
                    {/* <MDBCardText>
              <small className='text-muted'>Last updated 3 mins ago</small>
            </MDBCardText> */}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </Grid>

          <Grid item xs={2}>
            <MDBCard style={{ maxWidth: "400px", backgroundColor: " #f2f2f2" }}>
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <FcIcons.FcPlanner size={"105px"} />
                  <MDBCardImage style={{ height: "40px" }} fluid />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle
                      className="text-black"
                      style={{ fontSize: 22 }}
                    >
                      Todays Leave{" "}
                    </MDBCardTitle>
                    <MDBCardText
                      className="text-black"
                      style={{ fontSize: 35 }}
                    >
                      {leave}
                    </MDBCardText>
                    {/* <MDBCardText>
              <small className='text-muted'>Last updated 3 mins ago</small>
            </MDBCardText> */}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </Grid>
        </Grid>
        {/* classNamee="border border-white" */}
        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: 25, fontFamily: "cursive" }}>
            Application Leaves
          </h3>
        </div>
        <div
          className="cantainer"
          style={{
            border: "inline",
            width: 1000,
            marginLeft: 3,
            backgroundColor: "#f2f2f2",
          }}
        >
          {/* <table className="table table-sm">
  <thead>
    <tr>
      <th scope="col">Emp No</th>
      <th scope="col">Name</th>
      <th scope="col">Department</th>
      <th scope="col">Start Date</th>
      <th scope="col">End Date</th>
      <th scope="col">reason</th>
      <th scope="col">Leave Type</th>
      <th scope="col">Apply for</th>
      <th scope="col" >Apply Status</th>


    </tr>
  </thead>
  <tbody>

  
  
    {loadData.map((emps) => {
           
            return (
              // <tr style={{ backgroundColor: emps.applyStatus == "pending" ? "#ffbf80" : "white"}}>
                <tr> 
                <td>{emps.empno}</td>
                <td>{emps.firstName}</td>
                <td>{emps.department}</td>
               
              
                
                <td> {moment(emps.StartDate).format('YYYY-MM-DD')}</td>
               
               
                <td> {moment(emps.EndDate).format('YYYY-MM-DD')}</td>
                <td>{emps.reason}</td>
                <td>{emps.leavetype}</td>
                <td>{emps.applyfor}</td>
                <td style={{color:'f2f2f2' ,backgroundColor:''}} className='dropdown'>
               

                    
    <select style={{border:'none',backgroundColor:'#ff9999',fontSize:'18'}}
          value={emps.leaveid.applyStatus}
          onChange={(event) => setapplystatus(event.target.value)} >
      <option style={{color:'red'}}>{emps.applyStatus}</option>
      {appoptions.map((item) => 
            <option>
             {item}
            </option>
          )}
        </select>
                     
                     
                    
                     
                     
                     
                     
                     </td>


                
                 
           
                 <td>
                 
                    <button
                
                     onClick={() => edituser(emps.leaveid)}
                    style={{width:'70' ,height:'50'}}
                    className='btn btn-sm btn-success'>
                    Update
                  </button> 


                  </td>
                 
              </tr>
            )
          })}
    
  </tbody>
</table>  */}

          <MDBTable striped>
            <MDBTableHead>
              <tr style={{ backgroundColor: "#8275a5", color: "white" }}>
                <th scope="col">Emp No</th>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">reason</th>
                <th scope="col">Leave Type</th>
                <th scope="col">Apply for</th>
                <th scope="col">Apply Status</th>
                <th scope="col">Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {loadData.map((emps) => {
                return (
                  // <tr style={{ backgroundColor: emps.applyStatus == "pending" ? "#ffbf80" : "white"}}>
                  <tr>
                    <td>{emps.empno}</td>
                    <td>{emps.firstName}</td>
                    <td>{emps.department}</td>

                    <td> {moment(emps.StartDate).format("YYYY-MM-DD")}</td>

                    <td> {moment(emps.EndDate).format("YYYY-MM-DD")}</td>
                    <td>{emps.reason}</td>
                    <td>{emps.leavetype}</td>
                    <td>{emps.applyfor}</td>
                    <td
                      style={{ color: "f2f2f2", backgroundColor: "" }}
                      className="dropdown"
                    >
                      <select
                        style={{
                          border: "none",
                          backgroundColor: "#ff9999",
                          fontSize: "18",
                        }}
                        value={emps.leaveid.applyStatus}
                        onChange={(event) => setapplystatus(event.target.value)}
                      >
                        <option style={{ color: "red" }}>
                          {emps.applyStatus}
                        </option>
                        {appoptions.map((item) => (
                          <option>{item}</option>
                        ))}
                      </select>
                    </td>

                    <td>
                      <button
                        name="Btn_admindashoard_edituser"
                        onClick={() => edituser(emps.leaveid)}
                        style={{ width: "70", height: "50" }}
                        className="btn btn-sm btn-success"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>

        {/* reporting details table */}

        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: 25, fontFamily: "cursive" }}>Reporting </h3>
        </div>
        <div
          className="cantainer"
          style={{
            border: "inline",
            width: 1000,
            marginLeft: 3,
            backgroundColor: "#f2f2f2",
          }}
        >
          <table className="table table-sm">
            <thead>
              <tr style={{ backgroundColor: "#8275a5", color: "white" }}>
                <th scope="col">Emp No</th>
                <th scope="col">Name</th>

                <th scope="col">Time In</th>
                <th scope="col">Time Out</th>
                <th scope="col">Date</th>
                <th scope="col">Reason</th>

                <th scope="col">Apply Status</th>
              </tr>
            </thead>
            <tbody>
              {reportings.map((r) => (
                <tr key={r.reportid}>
                  {" "}
                  {/* Adding a unique key for each iteration */}
                  <td>{r.empno}</td>
                  <td>{r.firstName}</td>
                  <td>{r.timeIn}</td>
                  <td>{r.timeOut}</td>
                  <td>{moment(r.Date).format("YYYY-MM-DD")}</td>
                  <td>{r.reason}</td>
                  <td
                    style={{ color: "f2f2f2", backgroundColor: "" }}
                    className="dropdown"
                  >
                    <select
                      style={{
                        border: "none",
                        backgroundColor: "#ff9999",
                        fontSize: "18",
                      }}
                      value={r.status}
                      onChange={(event) => {
                        getreportingApproved(r.reportid, event.target.value);
                      }}
                    >
                      <option style={{ color: "red" }}>{r.status}</option>
                      {reportoptions.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </td>
                  {/* <td>
     <button  name='btn_admindashboard_editreport' onClick={() => handleInsertion(r.reportid)}
                    style={{ width:'70' ,height:'50'}} className='btn btn-sm btn-success'
                    >
                    Insert
                  </button>  
    </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

const styles = {
  h3: {
    textAlign: "none",
    margin: 20,
    fontSize: 35,
    marginTop: "10px",
    marginLeft: 120,
  },
  button: {
    marginRight: 10,
    border: "none",
    width: 60,
    height: 50,
  },
};

export default Admindashboard;
















<!-- ******************************************************************** -->
<!-- ******************************************************************** -->

  {/* ********************************************************************************** */}
            {/* Pending Tab Here */}
            {/* ********************************************************************************** */}
            <CustomTabPanel value={value} index={1}>
              {/* Item Two */}

              <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                  <EnhancedTableToolbar numSelected={selected.length} />
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={dense ? "small" : "medium"}
                    >
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {pending.map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              sx={{
                                paddingLeft: "4px",
                                paddingRight: "10px",
                              }}
                              onClick={(event) => handleClick(event, row.id)}
                              role="checkbox"
                              // aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.id}
                              selected={isItemSelected}
                              // sx={{ cursor: "pointer", textAlign: "center", }}
                            >
                              <TableCell padding="checkbox">
                                {/* <Checkbox
                        color="primary"
                        // checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      /> */}
                              </TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="auto"
                              >
                                {row.leaveid}
                              </TableCell>
                              {/* <TableCell align="right">{row.Id}</TableCell> */}
                              <TableCell align="center">
                                {row.startDate}
                              </TableCell>
                              <TableCell align="center">
                                {row.endDate}
                              </TableCell>
                              <TableCell align="center">{row.leaveType}</TableCell>
                              <TableCell align="center">{row.reason}</TableCell>
                              <TableCell align="center">{row.status}</TableCell>
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
                {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
              </Box>
            </CustomTabPanel>

            {/* ************************************************** */}
            {/* ************************************************** */}
            {/* History Tab Herre */}
            {/* ************************************************** */}
            {/* ************************************************** */}

            <CustomTabPanel value={value} index={2}>
              <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                  <EnhancedTableToolbar numSelected={selected.length} />
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={dense ? "small" : "medium"}
                    >
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {history.map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              sx={{
                                paddingLeft: "4px",
                                paddingRight: "10px",
                              }}
                              onClick={(event) => handleClick(event, row.id)}
                              role="checkbox"
                              // aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.id}
                              selected={isItemSelected}
                              // sx={{ cursor: "pointer", textAlign: "center", }}
                            >
                              <TableCell padding="checkbox">
                                {/* <Checkbox
                        color="primary"
                        // checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      /> */}
                              </TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="auto"
                              >
                                {row.leaveid}
                              </TableCell>
                              {/* <TableCell align="right">{row.Id}</TableCell> */}
                              <TableCell align="center">
                                {row.startDate}
                              </TableCell>
                              <TableCell align="center">
                                {row.endDate}
                              </TableCell>
                              <TableCell align="center">{row.leaveType}</TableCell>
                              <TableCell align="center">{row.reason}</TableCell>
                              <TableCell align="center">{row.status}</TableCell>
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
                {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
              </Box>
            </CustomTabPanel>
<!-- ******************************************************************** -->
<!-- ******************************************************************** -->
























<!-- ******************************************************************** -->
<!-- ******************************************************************** -->
team status here :======>





import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../dashboard/SideBar";

// import { visuallyHidden } from "@mui/utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBar from "../dashboard/NavBar";

function createData(Id, FirstName, Email, Contact, LastName) {
  return {
    Id,
    FirstName,
    LastName,
    Contact,
    Email,
  };
}

const rows = [];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "Rid", label
  { id: "Date", labe" },
  { id: "TimeIn", lae In" },
  { id: "TimeOut", lme Out" },
  { id: "Total_Hours "Total Hours" },
  { id: "Late_In", lrly In " },
  { id: 'EarlyOut', arly Out ' },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ padding: "5px", alignContent: "center", textAlign: "center" }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  // numSelected: PropTypes.number.isRequired,

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Team Reporting Status
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
// ... (import statements)

export default function TeamStatus() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Rid");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const USER_ID = sessionStorage.getItem("userId");
  const [role, setRole] = useState("");
  const optionss = ["Admin", "User", "Manager"];

  const [registration, setRegistration] = useState([]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    ReportingDetails(USER_ID);
  }, []);

  const ReportingDetails = (USER_ID) => {
    axios
      .get(`${config.serverURL}/reporting/reportingdetail/mid/${USER_ID}`, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        console.log("API Response:", response.data);

        if (response.data && response.data.status === "success") {
          const managerTeamUsers = response.data.data;
          console.log("Mapped Data:", managerTeamUsers);
          setRegistration(managerTeamUsers);
        } else {
          toast.error(response.data && response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = registration.map((n) => n.Rid);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - registration.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(registration, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, registration]
  );

  return (
    <>
      {/* ... (NavBar, SideBar, etc.) */}
<NavBar/>
<SideBar/>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: isSmallScreen ? 350 : 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={registration.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.Rid);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.Rid)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.Rid}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                        paddingLeft: "4px",
                        paddingRight: "10px",
                        textAlign: "center",
                      }}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="auto">
                        {row.Rid}
                      </TableCell>
                      <TableCell align="center">{row.TimeIn}</TableCell>
                      <TableCell align="center">{row.TimeOut}</TableCell>
                      <TableCell align="center">{row.Date}</TableCell>
                      <TableCell align="center">{row.Total_Hours}</TableCell>
                      <TableCell align="center">{row.Late_In}</TableCell>
                      <TableCell align="center">{row.EarlyOut}</TableCell>
                      {/* Additional TableCell components for each property */}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={registration.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}


























<!-- ******************************************************************** -->
Reporting Page Hwere<!-- ******************************************************************** -->






import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Card,
} from "@mui/material";
import NavBar from "../dashboard/NavBar";
import SideBar from "../dashboard/SideBar";

// **************************************************************
// leave apply copy



import { Box, Table, Tab, Tabs, Typography, Paper, Stack } from "@mui/material";
import PropTypes from "prop-types";

import { toast } from "react-toastify";
import config from "../../config";
import axios from "axios";

import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import { alpha } from "@mui/material/styles";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useEffect } from "react";



// const rows = [];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "R_Id", label: "ID" },
  { id: "Date", label: "Date" },

  { id: "TimeIn", label: "Time_In" },
  { id: "TimeOut", label: "Time_Out" },

  { id: "Total_Hours", label: "Total Hours" },
  { id: "Late_In", label: "Late In" },
  { id: "EarlyOut", label: "Early Out" },
  // { id: "Shortfall_Hrs", label: "" },

];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
          sx={{
            margin:"auto",
            padding:"10px",
            alignContent:"center",
            alignItems:"center",
            
          }}
            // padding={headCell.disablePadding ? "none" : "normal"}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  // numSelected: PropTypes.number.isRequired,

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Reporting Details
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs("2022-04-17");

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌚" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}


const rows = [];
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;
//   // numSelected: PropTypes.number.isRequired,

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Leave Details
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


// **************************************************************
// **************************************************************

const Reporting = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    leaveType: "",
    reason: "",
    startDate: "",
    endDate: "",
    department: "",
    currentDate: "",
    currentTime: "",
  });

  const [isReported, setIsReported] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    const currentDate = currentDateTime.toISOString().split("T")[0];
    const currentTime = currentDateTime.toTimeString().split(" ")[0];
    setFormData({ ...formData, currentDate, currentTime });
  };

  const handleReport = () => {
    // Add your logic to handle reporting
    console.log("Reported!");
    setIsReported(true);
  };


  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [dvalue, setDvalue] = React.useState(dayjs("2023-09-09"));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ************************************************************************

  // const handleSubmit = () => {
  //   // Add your logic to handle form submission
  //   console.log({
  //     ...formData,
  //     selectedSessions,
  //     manager,
  //     ccEmails,
  //   });
  // };

  // **************************************************************************************************
  // **************************************************************************************************
  // Attendence Tab
  // **************************************************************************************************
  // **************************************************************************************************

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const USER_ID = sessionStorage.getItem("userId");

  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    Reportingdetails(USER_ID);
  }, [USER_ID]);

  const Reportingdetails = (USER_ID) => {
    axios
      .get(config.serverURL + `/reporting/reportingdetail/${USER_ID}`, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          const managerTeamUsers = result["data"];
          setHistory(managerTeamUsers); // Set the registration state with the fetched data
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };










  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const getHistoryuserdetails = (USER_ID) => {
    axios
      .get(config.serverURL + `/use/manager/${USER_ID}`, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          const managerTeamUsers = result["data"];

          console.log(managerTeamUsers);

          setHistory(managerTeamUsers);
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    // Ask for confirmation before signing out
    const confirmSignOut = window.confirm("Are you sure you want to sign out?");

    if (confirmSignOut) {
      // Implement your logic for signing out
      setIsReported(false);
    }
  };

  return (
    <>
      <NavBar />
      <SideBar />

      {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

      <Box
        sx={{
          display: "flex",
          backgroundColor: "white",
          height: "47vw",
          paddingTop: "-92",
          marginTop: "-15px",
        }}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 7 }}>
          <Box sx={{ width: "95%" }}>
            <Box sx={{ border: "", textAlign: "center" }}>
              <Tabs
                sx={{
                  borderBottom: 0,
                  borderColor: "divider",
                  marginLeft: "600px",
                  marginTop: "20px",
                }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Reporting" {...a11yProps(0)} />
                <Tab label="Attendence" {...a11yProps(1)} />
                {/* <Tab label="History" {...a11yProps(2)} /> */}
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              {/* **************************************************************************** */}

              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
          
                  <div>
                    <h1>Reporting</h1>
                  </div>

                  <div>
                    <TextField
                      label=" Date"
                      type="text"
                      value={formData.currentDate}
                      readOnly
                      style={{
                        width: "80",
                        padding: "5px",
                        alignItems: "center",
                      }}
                      margin="normal"
                    />
                    <TextField
                      label="Reporting Time"
                      type="text"
                      style={{
                        width: "990",
                        padding: "5px",
                        alignItems: "center",
                      }}
                      value={formData.currentTime}
                      readOnly
                      margin="normal"
                    />

                    <TextField
                      label="Out Time"
                      type="text"
                      style={{
                        width: "990",
                        padding: "5px",
                        alignItems: "center",
                      }}
                      value={formData.OutTime}
                      readOnly
                      margin="normal"
                    />

                    <FormControl sx={{ width: "222px" }} margin="normal">
                      <InputLabel>Reporting</InputLabel>
                      <Select
                        value={formData.leaveType}
                        onChange={(e) =>
                          handleInputChange("Reporting", e.target.value)
                        }
                      >
                        <MenuItem value="Office">Office</MenuItem>
                        <MenuItem value="OutDoor">OutDoor</MenuItem>
                        <MenuItem value="WFM">Work From Home</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Reason"
                      value={formData.reason}
                      onChange={(e) =>
                        handleInputChange("reason", e.target.value)
                      }
                      // fullWidth
                      sx={{ width: "222px" }}
                      multiline
                      rows={1}
                      margin="normal"
                    />
                  </div>

                  <div>
                    {isReported ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          handleSignOut();
                          getCurrentDateTime();
                        }}
                      >
                        Sign Out
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleReport();
                          getCurrentDateTime();
                        }}
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <Box sx={{ width: "100%", alignContent:"center", alignItems:"center" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                  <EnhancedTableToolbar numSelected={selected.length} />
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={dense ? "small" : "medium"}
                    >
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {history.map((row, index) => {
                          // const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              sx={{
                                paddingLeft: "4px",
                                paddingRight: "0px",
                              }}
                              onClick={(event) => handleClick(event, row.id)}
                              role="checkbox"
                              // aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.R_Id}
                              // selected={isItemSelected}
                              // sx={{ cursor: "pointer", textAlign: "center", }}
                            >
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="auto"
                              >
                                {row.R_Id}
                              </TableCell>
                              {/* <TableCell align="right">{row.Id}</TableCell> */}
                              <TableCell align="center">
                                {row.Date}
                              </TableCell>
                              <TableCell align="center">{row.TimeIn}</TableCell>
                              <TableCell align="center">{row.Date}</TableCell>
                              <TableCell align="center">
                                {row.TimeOut}
                              </TableCell>
                              <TableCell align="center">
                                {row.Late_In}
                              </TableCell>
                              <TableCell align="center">
                                {row.EarlyOut}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Box>

              {/* **************************************************************************** */}
              {/* **************************************************************************** */}

              <div></div>
            </CustomTabPanel>

            {/* ********************************************************************************** */}
            {/* Pending Tab Here */}
            {/* ********************************************************************************** */}
            <CustomTabPanel value={value} index={1}>
              <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                  <EnhancedTableToolbar numSelected={selected.length} />
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={dense ? "small" : "medium"}
                    >
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {history.map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              sx={{
                                paddingLeft: "4px",
                                paddingRight: "10px",
                              }}
                              onClick={(event) => handleClick(event, row.id)}
                              role="checkbox"
                              // aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.R_Id}
                              selected={isItemSelected}
                              // sx={{ cursor: "pointer", textAlign: "center", }}
                            >
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="auto"
                              >
                                {row.R_Id}
                              </TableCell>
                              {/* <TableCell align="right">{row.Id}</TableCell> */}
                              <TableCell align="center">
                                {row.Date}
                              </TableCell>
                              <TableCell align="center">{row.TimeIn}</TableCell>
                              <TableCell align="center">{row.Date}</TableCell>
                              <TableCell align="center">
                                {row.TimeOut}
                              </TableCell>
                              <TableCell align="center">
                                {row.Late_In}
                              </TableCell>
                              <TableCell align="center">
                                {row.EarlyOut}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Box>
            </CustomTabPanel>

            {/* History Tab Herre */}
            {/* ************************************************** */}
            {/* ************************************************** */}

          </Box>
        </Box>
      </Box>
      {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

      {/* </div> */}

      {/* </div> */}
    </>
  );
};

export default Reporting;

<!-- ******************************************************************** -->
<!-- Apply leave table  -->
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";

const columns = [
  { field: "Rid", headerName: "ID", width: 130 },
  { field: "Reason", headerName: "Reason", width: 130 },
  { field: "ApplyFor", headerName: "Apply_For", width: 130 },
  { field: "StartDate", headerName: "Leave Type", width: 130 },
  { field: "EndDate", headerName: "Leave Type", width: 130 },
  { field: "ApplyStatus", headerName: "Leave Type", width: 130 },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const USER_ID = sessionStorage.getItem("userId");

  useEffect(() => {
    getuserdetails(USER_ID);
  }, [USER_ID]);

  const getuserdetails = (USER_ID) => {
    console.log("Fetching leave details for user: ", USER_ID);

    axios
      .get(config.serverURL + `/applyLeave/Pending/${USER_ID}`, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        console.log("Data is here: ", result);

        if (result.ApplyStatus === "approved") {
          const managerTeamUsers = result.data;

          // Check if the leave request status is pending
          if (managerTeamUsers.some((user) => user.ApplyStatus === "Pending")) {
            console.log("Leave request status is pending. Printing data...");
            console.log(managerTeamUsers);

            // Set the rows state with the fetched data
            setRows(managerTeamUsers);
          } else {
            console.log("Leave request status is not pending.");
            // Handle the case when there are no pending leave requests
            // You might want to update the UI accordingly or show a message
          }
        } else {
          toast.error(result.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching leave details:", error);
      });
  };

  return (
    <>
      <Card>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={rowsPerPage}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            pageSizeOptions={[5, 10]}
            getRowId={(row) => row.Rid}
          />
        </div>
      </Card>
    </>
  );
}





<!-- ******************************************************************** -->
<!-- ******************************************************************** -->
<!-- ******************************************************************** -->
<!-- ******************************************************************** -->
<!-- ******************************************************************** -->
<!-- ******************************************************************** -->
<!-- ******************************************************************** -->