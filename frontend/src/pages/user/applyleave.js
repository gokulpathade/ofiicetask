import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Sidebar from "../../components/sidebar";
import { toast } from "react-toastify";
import config from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import { MDBBadge } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ApplyLeave() {
  const [Name, setName] = useState("");
  const [Last_Name, setlasttname] = useState("");
  const [Rid, setRid] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Reason, setReason] = useState("");
  const [LDays, setLDays] = useState("");
  const [LType, setLType] = useState("");
  const [ApplyFor, setApplyFor] = useState([]);
  const appoptions = ["Full Day", "Half Day"];
  const [appleave, setApplyleave] = useState([]);
  const [appleave1, setApplyleave1] = useState([]);
  const [reportstatus, setreportstatus] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [ApplyId, setRegid] = useState();
  const USER_ID = sessionStorage.getItem("useRid");
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [ApplyStatus, setApplyStatus] = useState([]);

  const [pendingApplications, setPendingApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);
  const [approvedApplications, setApprovedApplications] = useState([]);

  const [registration, setRegistration] = useState([]);
  const [ManagerId, setManagerId] = useState("");
  // const [Rid,setRid]=useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const optionss = [
    "Earned Leave",
    "Casual Leave",
    "Special Sick Leave",
    "Maternity Leave",
    "Comp Off",
    "Loss Of Pay",
    "Outdoor Duty",
  ];

  const handleAccordionChange = (index) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
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

    getreportingdetails(USER_ID);

    // getApplyDetails1(USER_ID); //approved details get
  }, []);

  // **********************************************************************************
  //  Manager api use here
  // **********************************************************************************

  useEffect(() => {
    // user(USER_ID); //user details get

    leaves(USER_ID); //pending details get

    reporting(USER_ID);

    // ApplyData(USER_ID);
  }, []);

  useEffect(() => {
    UserDetails(USER_ID);
  }, [USER_ID]);

  const UserDetails = (USER_ID) => {
    axios
      .get(config.serverURL + "/use/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
  
        if (result["status"] === "success") {
          console.log("UserDetails Response from UserId: ", result);
  
          setRid(response.data.data[0].Rid); // backend rid
          setName(response.data.data[0].Name); // backend firstName
          setRegid(response.data.data[0].Rid);
          setRegistration(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };
  
  // const user = (USER_ID) => {
  //   axios
  //     .get(config.serverURL + "/use/" + USER_ID, {
  //       headers: { token: sessionStorage["token"] },
  //     })

  //     .then((response) => {
  //       const result = response.data;

  //       if (result["status"] === "success") {
  //         console.log("UserDetails Response from UseRid: ");

  //         console.log("then response ", result);

  //         // setempno(response.data.data[0].empno) //backend  Rid

  //         setName(response.data.data[0].Name);

  //         setRid(response.data.data[0].department); //backend  department name

  //         setlasttname(response.data.data[0].Last_Name);

  //         setRegid(response.data.data[0].Rid);

  //         // console.log("reid    :",response.data.data[0].Rid)

  //         // set the homes to the state member

  //         //  setRegistration(result['data'])
  //       } else {
  //         toast.error(result["error"]);
  //       }
  //     });
  // };

  const leaves = (USER_ID) => {
    axios

      .get(config.serverURL + "/applyLeave/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })

      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          console.log("get specific details from applyleave table ");

          console.log("then response ", result);

          // setApplyStatus(response.data.data)

          console.log("getapply pending", response.data.data);

          // set the homes to the state member

          setApplyleave(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  // const ApplyData = (USER_ID) => {
  //   axios
  //     .get(config.serverURL + "/applyLeave/approved/" + USER_ID, {
  //       headers: { token: sessionStorage["token"] },
  //     })
  //     .then((response) => {
  //       const result = response.data;

  //       if (result["status"] === "success") {
  //         console.log("Get specific details from applyleave table");
  //         console.log("Then response", result);

  //         const enddate = moment(result.data.EndDate).format("YYYY-MM-DD");
  //         console.log("EndDate:", enddate);

  //         const curdate = moment(new Date()).format("YYYY-MM-DD");
  //         console.log("Current Date:", curdate);

  //         console.log("Comparison Result:", enddate <= curdate);

  //         // Check if ApplyStatus is 'approved'
  //         if (result.data.ApplyStatus === "approved") {
  //           setApplyStatus("approved");
  //         } else if (result.data.ApplyStatus === "pending") {
  //           setApplyStatus("pending");
  //         } else if (result.data.ApplyStatus === "rejected") {
  //           setApplyStatus("rejected");
  //         }
  //       } else {
  //         toast.error(result["error"]);
  //       }
  //     });
  // };

  // Usage:
  // Assuming you have a state variable `ApplyStatus` to store the status.
  // You can use it to display the status in your UI.

  //get specific recored from reporting

  const reporting = (USER_ID) => {
    console.log("Manager's USER_ID: ", USER_ID);

    axios
      .get(
        config.serverURL + "/reporting/manage/" + USER_ID,

        {
          headers: { token: sessionStorage["token"] },
        }
      )
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          console.log("Get users reporting to manager:");

          console.log("Response: ", result);

          // Handle the data as needed
          const usersReportingToManager = result["data"];
          console.log("Users reporting to manager:", usersReportingToManager);
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching reporting data: ", error);
      });
  };

  // // Usage: Pass the manager's USER_ID as an argument to the function
  // reporting(managerUseRid);

  // // Usage: Pass the USER_ID of the manager you want to retrieve reporting data for.
  // const managerUseRid = 123; // Replace with the actual manager's USER_ID.
  // reporting(managerUseRid);

  // **********************************************************************************
  //  Manager Api End Here
  // **********************************************************************************

  const getuserdetails = (USER_ID) => {
    axios
      .get(config.serverURL + "/use/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })

      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          console.log("UserDetails Response from UseRid: ");

          console.log("then response ", result);

          // setempno(response.data.data[0].empno) //backend  Rid

          setName(response.data.data[0].Name);

          setRid(response.data.data[0].department); //backend  department name

          setlasttname(response.data.data[0].Last_Name);

          setRegid(response.data.data[0].Rid);

          // console.log("reid    :",response.data.data[0].Rid)

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
    } else if (ApplyFor === 0) {
      toast.error("please select apply for");
    } else if (Reason.length === 0) {
      toast.error("please mention Reason");
    } else if (LType.length === 0) {
      toast.error("please select leave type");
    } else {
      const start = new Date(StartDate);

      const end = new Date(EndDate);

      const timeDifference = end - start;

      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;

      setLDays(daysDifference);

      console.log(LDays);

      const body = {
        StartDate,

        EndDate,

        Reason,

        ApplyId,

        ApplyFor,

        LDays: daysDifference,

        LType,

        Rid,
      };

      console.log("Apply for : ", ApplyFor);

      console.log("leave days : ", LDays);

      console.log("body : ", body);

      axios

        .post(config.serverURL + "/applyLeave/leave", body, {
          headers: { token: sessionStorage["token"] },
        })

        .then((response) => {
          // get the data returned by server

          const result = response.data;

          console.log(response.data);

          if (result.error) {
            toast.error(result.error);
          } else {
            toast.success("Successfully applied leave");
            navigate("/home");
          }
        })

        .catch((error) => {
          console.error("Error:", error);
          toast.error("An error occurred while processing your request");
        });
    }
  };

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;

    setStartDate(newStartDate);

    // Calculate and set leave days if both Start Date and End Date are selected

    if (newStartDate && EndDate) {
      calculateAndSetLDays(newStartDate, EndDate);
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

    // Calculate and set leave days if both Start Date and End Date are selected

    if (StartDate && newEndDate) {
      calculateAndSetLDays(StartDate, newEndDate);
    }
  };

  const calculateAndSetLDays = (startDate, endDate) => {
    const start = new Date(startDate);

    const end = new Date(endDate);

    const timeDifference = end - start;

    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;

    setLDays(daysDifference);
  };

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

          getapplydetails();

          // getApplyDetails1(USER_ID);

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

  // ****************************************************************************
  //get leave details from applyleave table
  // get details of the leave application approve or not here
  // ****************************************************************************
  const getapplydetails = () => {
    axios
      .get(config.serverURL + "/applyLeave/", {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          console.log("get specific details from applyleave table ");
          console.log("then response ", result);

          const approvedApplications = result["data"].filter(
            (emps) => emps.ApplyStatus === "approved"
          );
          const rejectedApplications = result["data"].filter(
            (emps) => emps.ApplyStatus === "rejected"
          );
          const pendingApplications = result["data"].filter(
            (emps) => emps.ApplyStatus === "pending"
          );

          // Set the filtered data to state members
          setApprovedApplications(approvedApplications);
          setRejectedApplications(rejectedApplications);
          setPendingApplications(pendingApplications);
        } else {
          toast.error(result["error"]);
        }
      });
  };
  // ****************************************************************************
  //get leave details from applyleave table
  // get details of the leave application approve or not here
  //     END HERE
  // ****************************************************************************

  // const getApplyDetails1 = (USER_ID) => {
  //   axios
  //     .get(config.serverURL + "/applyLeave/approved/" + USER_ID, {
  //       headers: { token: sessionStorage["token"] },
  //     })
  //     .then((response) => {
  //       const result = response.data;

  //       if (result["status"] === "success") {
  //         console.log("Get specific details from applyleave table");
  //         console.log("Then response", result);

  //         const enddate = moment(result.data.EndDate).format("YYYY-MM-DD");
  //         console.log("EndDate:", enddate);

  //         const curdate = moment(new Date()).format("YYYY-MM-DD");
  //         console.log("Current Date:", curdate);

  //         console.log("Comparison Result:", enddate <= curdate);

  //         // Check if ApplyStatus is 'approved'
  //         if (result.data.ApplyStatus === "approved") {
  //           setApplyStatus("approved");
  //         } else if (result.data.ApplyStatus === "pending") {
  //           setApplyStatus("pending");
  //         } else if (result.data.ApplyStatus === "rejected") {
  //           setApplyStatus("rejected");
  //         }
  //       } else {
  //         toast.error(result["error"]);
  //       }
  //     });
  // };

  // Usage:
  // Assuming you have a state variable `ApplyStatus` to store the status.
  // You can use it to display the status in your UI.

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

          // setApplyStatus(response.data.data)

          //  console.log("Reporting details from  ppppppppppp",response.data.data)

          setreportstatus(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  // *********************************************************************************************************
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Function to get the current date in "YYYY-MM-DD" format
    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setCurrentDate(getCurrentDate());
  }, []);

  // **************************************************************************************************
  return (
    <>
      <Sidebar />

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 0,
              borderColor: "divider",
              marginLeft: "800px",
              marginTop: "20px",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Apply Leave" value="1" style={{ fontSize: 20 }} />

              <Tab label="Pending" value="2" style={{ fontSize: 20 }} />

              <Tab label="Approve" value="3" style={{ fontSize: 20 }} />

              <Tab label="Rejected" value="4" style={{ fontSize: 20 }} />
            </TabList>
          </Box>

          {/* ******************************************************************************** */}
          {/* apply tab Here  */}
          {/* ******************************************************************************** */}
          <TabPanel value="1">
            <div className="row justify-content-center" style={{}}>
              <div className="col-4" style={{ fontSize: 20 }}>
                <label>First Name</label>

                <input
                  value={Name}
                  name="Name"
                  id="id_Name"
                  style={{ borderStyle: "none" }}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  className="form-control"
                  type="text"
                  readOnly
                />

                {/* <label>manager</label>

                <input
                  value={Rid}
                  name="Department1"
                  id="id_Department1"
                  style={{ borderStyle: "none" }}
                  onChange={(event) => {
                    setRid(event.target.value);
                  }}
                  className="form-control"
                  type="text"
                  readOnly
                />
                */}

                <label>Manager</label>
                <select
                  className="form-control"
                  name="department"
                  id="id_department"
                  disabled={false}
                  value={Rid}
                  onChange={(event) => setManagerId(event.target.value)}
                >
                  <option value="">Select Manager</option>

                  {registration
                    .filter((emps) => emps.Role === "manager") // Assuming 'role' is the key for the role information
                    .map((emps) => (
                      <option
                        key={emps.Rid}
                        value={`${emps.Rid} 
      `}
                      >
                        {emps.Rid}
                        {/* - {emps.Name} */}

                        <span> {emps.Name}</span>
                      </option>
                    ))}
                </select>

                <label>Leave Days</label>

                <input
                  name="LDays"
                  id="id_LDays"
                  value={LDays}
                  className="form-control"
                  type="text"
                  readOnly
                />

                <label>Leave Type</label>

                <select
                  className="form-control"
                  name="LType"
                  id="id_LType"
                  value={LType}
                  onChange={(event) => setLType(event.target.value)}
                >
                  <option>select</option>

                  {optionss.map((item) => (
                    <option>{item}</option>
                  ))}
                </select>

                <label>Start Date</label>
                <input
                  name="startdate"
                  id="id_startdate"
                  // onChange={(event) => {
                  //   setStartDate(event.target.value)
                  // }}
                  onChange={handleStartDateChange}
                  className="form-control"
                  type="date"
                />
              </div>

              <div
                className="col-4"
                style={{
                  borderLeftStyle: "solid",
                  borderRightColor: "lightgray",
                  fontSize: 20,
                }}
              >
                <label>Last Name</label>

                <input
                  value={Last_Name}
                  name="Last_Name"
                  id="id_Last_Name"
                  style={{ borderStyle: "none" }}
                  onChange={(event) => {
                    setlasttname(event.target.value);
                  }}
                  className="form-control"
                  type="text"
                  readOnly
                />

                <label>Apply for</label>

                <select
                  className="form-control"
                  value={ApplyFor}
                  name="ApplyFor"
                  id="id_ApplyFor"
                  onChange={(event) => setApplyFor(event.target.value)}
                >
                  <option>select</option>

                  {appoptions.map((item) => (
                    <option>{item}</option>
                  ))}
                </select>

                <label> Apply for Reason</label>

                <textarea
                  rows={4}
                  cols={40}
                  onChange={(event) => {
                    setReason(event.target.value);
                  }}
                  className="form-control"
                  type="text"
                  name="ApplyForReason"
                  id="id_ApplyForReason"
                />

                <label> End Date</label>

                <input
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
            </div>
          </TabPanel>
          {/* ******************************************************************************** */}
          {/* apply tab end Here  */}
          {/* ******************************************************************************** */}

          {/* ******************************************************************************** */}
          {/* pending tab Here  */}
          {/* ******************************************************************************** */}

          <TabPanel value="2">
            <div className="container">
              {pendingApplications &&
                pendingApplications.map((emps, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index + 1}-content`}
                      id={`panel${index + 1}-header`}
                    >
                      <div
                        className="container-sm"
                        style={{ marginLeft: "1px" }}
                      >
                        <table className="table align-middle mb-0 bg-white">
                          <tbody>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">Leave Type:</p>

                                    <p className="text-muted mb-0">
                                      {emps.LType}{" "}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <p className="fw-bold mb-1">No.of days</p>

                                <p className="text-muted mb-0">{emps.LDays}</p>
                              </td>

                              <td>
                                <MDBBadge
                                  style={{ fontSize: 15 }}
                                  color={
                                    emps.ApplyStatus === "pending"
                                      ? "warning"
                                      : emps.ApplyStatus === "rejected"
                                      ? "danger"
                                      : emps.ApplyStatus === "approved"
                                      ? "success"
                                      : "primary"
                                  }
                                  pill
                                >
                                  {emps.ApplyStatus}
                                </MDBBadge>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionSummary>

                    <AccordionDetails>
                      <div className="container" style={{ marginLeft: "1px" }}>
                        <table className="table table-bordered">
                          <tbody>
                            <tr>
                              <td colspan="2">
                                <div className="d-flex align-items-center">
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">Duration :</p>

                                    <p className="fw-bold mb-1">Reason :</p>
                                  </div>

                                  <div className="ms-3">
                                    <p className="text-muted mb-0">
                                      {moment(emps.StartDate).format(
                                        "YYYY-MM-DD"
                                      )}{" "}
                                      <span
                                        style={{
                                          color: "black",
                                          fontweight: "bold",
                                        }}
                                      >
                                        to
                                      </span>{" "}
                                      {moment(emps.EndDate).format(
                                        "YYYY-MM-DD"
                                      )}
                                    </p>

                                    <p className="text-muted mb-0">
                                      {emps.Reason}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td></td>
                            </tr>

                            <tr>
                              <td colspan="2">
                                <div className="d-flex align-items-center">
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">Applied On :</p>

                                    <p className="text-muted mb-0">
                                      {moment(emps.CreationDatee).format(
                                        "YYYY-MM-DD"
                                      )}{" "}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td style={{ fontSize: 10 }}>
                                {/* <button  name='deleteleave' className="btn btn-primary"

               

                  onClick={() => handleShow1(emps)}

                  style={{marginRight:50,border:'none' ,backgroundColor:'none',fontSize:15}}

                 >

                 

               Withdraw  

                   

                </button> */}
                                <button
                                  style={{ border: "none", marginRight: 50 }}
                                  disabled={
                                    moment(emps.EndDate).format("YYYY-MM-DD") <=
                                    moment(new Date()).format("YYYY-MM-DD")
                                      ? "red"
                                      : ""
                                  }
                                >
                                  <MDBBadge
                                    onClick={() => handleShow1(emps)}
                                    style={{ fontSize: 15, color: "white" }}
                                    pill
                                  >
                                    Withdraw
                                  </MDBBadge>
                                </button>
                                <Modal
                                  show={show1}
                                  onHide={handleClose1}
                                  animation={false}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Withdraw Request</Modal.Title>
                                  </Modal.Header>

                                  <Modal.Body>
                                    Are you sure you want to withdraw this
                                    application
                                  </Modal.Body>

                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={handleClose1}
                                    >
                                      Close
                                    </Button>

                                    <Button
                                      variant="danger"
                                      onClick={() => handleDelete1(emps)}
                                    >
                                      Withdraw
                                    </Button>
                                  </Modal.Footer>
                                </Modal>{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>
          </TabPanel>
          {/* ******************************************************************************** */}
          {/* pending tab end Here   */}
          {/* ******************************************************************************** */}

          {/* ******************************************************************************** */}
          {/* approve  tab Here  */}
          {/* ******************************************************************************** */}

          <TabPanel value="3">
            <div className="container">
              {approvedApplications &&
                approvedApplications.map((emps, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index + 1}-content`}
                      id={`panel${index + 1}-header`}
                    >
                      <div
                        className="container-sm"
                        style={{ marginLeft: "1px" }}
                      >
                        <table className="table align-middle mb-0 bg-white">
                          <tbody>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">Leave Type:</p>

                                    <p className="text-muted mb-0">
                                      {emps.LType}{" "}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <p className="fw-bold mb-1">No.of days</p>

                                <p className="text-muted mb-0">{emps.LDays}</p>
                              </td>

                              <td>
                                <MDBBadge
                                  style={{ fontSize: 15 }}
                                  color={
                                    emps.ApplyStatus === "pending"
                                      ? "warning"
                                      : emps.ApplyStatus === "rejected"
                                      ? "danger"
                                      : emps.ApplyStatus === "approved"
                                      ? "success"
                                      : "primary"
                                  }
                                  pill
                                >
                                  {emps.ApplyStatus}
                                </MDBBadge>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionSummary>

                    <AccordionDetails>
                      <div className="container" style={{ marginLeft: "1px" }}>
                        <table className="table table-bordered">
                          <tbody>
                            <tr>
                              <td colspan="2">
                                <div className="d-flex align-items-center">
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">Duration :</p>

                                    <p className="fw-bold mb-1">Reason :</p>
                                  </div>

                                  <div className="ms-3">
                                    <p className="text-muted mb-0">
                                      {moment(emps.StartDate).format(
                                        "YYYY-MM-DD"
                                      )}{" "}
                                      <span
                                        style={{
                                          color: "black",
                                          fontweight: "bold",
                                        }}
                                      >
                                        to
                                      </span>{" "}
                                      {moment(emps.EndDate).format(
                                        "YYYY-MM-DD"
                                      )}
                                    </p>

                                    <p className="text-muted mb-0">
                                      {emps.Reason}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td></td>
                            </tr>

                            <tr>
                              <td colspan="2">
                                <div className="d-flex align-items-center">
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">Applied On :</p>

                                    <p className="text-muted mb-0">
                                      {moment(emps.CreationDatee).format(
                                        "YYYY-MM-DD"
                                      )}{" "}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td style={{ fontSize: 10 }}>
                                {/* <button  name='deleteleave' className="btn btn-primary"

                 

                    onClick={() => handleShow1(emps)}

                    style={{marginRight:50,border:'none' ,backgroundColor:'none',fontSize:15}}

                   >

                   

                 Withdraw  

                     

                  </button> */}
                                <button
                                  style={{ border: "none", marginRight: 50 }}
                                  disabled={
                                    moment(emps.EndDate).format("YYYY-MM-DD") <=
                                    moment(new Date()).format("YYYY-MM-DD")
                                      ? "red"
                                      : ""
                                  }
                                >
                                  <MDBBadge
                                    onClick={() => handleShow1(emps)}
                                    style={{ fontSize: 15, color: "white" }}
                                    pill
                                  >
                                    Withdraw
                                  </MDBBadge>
                                </button>
                                <Modal
                                  show={show1}
                                  onHide={handleClose1}
                                  animation={false}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Withdraw Request</Modal.Title>
                                  </Modal.Header>

                                  <Modal.Body>
                                    Are you sure you want to withdraw this
                                    application
                                  </Modal.Body>

                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={handleClose1}
                                    >
                                      Close
                                    </Button>

                                    <Button
                                      variant="danger"
                                      onClick={() => handleDelete1(emps)}
                                    >
                                      Withdraw
                                    </Button>
                                  </Modal.Footer>
                                </Modal>{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>
          </TabPanel>
          {/* ******************************************************************************** */}
          {/* approve  tab end Here  */}
          {/* ******************************************************************************** */}

          {/* ******************************************************************************** */}
          {/* rejected   tab end Here  */}
          {/* ******************************************************************************** */}

          <TabPanel value="4">
            <div className="container">
              {rejectedApplications &&
                rejectedApplications.map((emps, index) => (
                  // Render the rejected application content here

                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index + 1}-content`}
                      id={`panel${index + 1}-header`}
                    >
                      <div
                        className="container-sm"
                        style={{ marginLeft: "1px" }}
                      >
                        <table className="table align-middle mb-0 bg-white">
                          <tbody>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">Leave Type:</p>

                                    <p className="text-muted mb-0">
                                      {emps.LType}{" "}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <p className="fw-bold mb-1">No.of days</p>

                                <p className="text-muted mb-0">{emps.LDays}</p>
                              </td>

                              <td>
                                <MDBBadge
                                  style={{ fontSize: 15 }}
                                  color={
                                    emps.ApplyStatus === "pending"
                                      ? "warning"
                                      : emps.ApplyStatus === "rejected"
                                      ? "danger"
                                      : emps.ApplyStatus === "approved"
                                      ? "success"
                                      : "primary"
                                  }
                                  pill
                                >
                                  {emps.ApplyStatus}
                                </MDBBadge>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionSummary>

                    <AccordionDetails>
                      <div className="container" style={{ marginLeft: "1px" }}>
                        <table className="table table-bordered">
                          <tbody>
                            <tr>
                              <td colspan="2">
                                <div className="d-flex align-items-center">
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">Duration :</p>

                                    <p className="fw-bold mb-1">Reason :</p>
                                  </div>

                                  <div className="ms-3">
                                    <p className="text-muted mb-0">
                                      {moment(emps.StartDate).format(
                                        "YYYY-MM-DD"
                                      )}{" "}
                                      <span
                                        style={{
                                          color: "black",
                                          fontweight: "bold",
                                        }}
                                      >
                                        to
                                      </span>{" "}
                                      {moment(emps.EndDate).format(
                                        "YYYY-MM-DD"
                                      )}
                                    </p>

                                    <p className="text-muted mb-0">
                                      {emps.Reason}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td></td>
                            </tr>

                            <tr>
                              <td colspan="2">
                                <div className="d-flex align-items-center">
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">Applied On :</p>

                                    <p className="text-muted mb-0">
                                      {moment(emps.CreationDatee).format(
                                        "YYYY-MM-DD"
                                      )}{" "}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td style={{ fontSize: 10 }}>
                                {/* <button  name='deleteleave' className="btn btn-primary"

     

        onClick={() => handleShow1(emps)}

        style={{marginRight:50,border:'none' ,backgroundColor:'none',fontSize:15}}

       >

       

     Withdraw  

         

      </button> */}
                                <button
                                  style={{ border: "none", marginRight: 50 }}
                                  disabled={
                                    moment(emps.EndDate).format("YYYY-MM-DD") <=
                                    moment(new Date()).format("YYYY-MM-DD")
                                      ? "red"
                                      : ""
                                  }
                                >
                                  <MDBBadge
                                    onClick={() => handleShow1(emps)}
                                    style={{ fontSize: 15, color: "white" }}
                                    pill
                                  >
                                    Withdraw
                                  </MDBBadge>
                                </button>
                                <Modal
                                  show={show1}
                                  onHide={handleClose1}
                                  animation={false}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Withdraw Request</Modal.Title>
                                  </Modal.Header>

                                  <Modal.Body>
                                    Are you sure you want to withdraw this
                                    application
                                  </Modal.Body>

                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={handleClose1}
                                    >
                                      Close
                                    </Button>

                                    <Button
                                      variant="danger"
                                      onClick={() => handleDelete1(emps)}
                                    >
                                      Withdraw
                                    </Button>
                                  </Modal.Footer>
                                </Modal>{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>
          </TabPanel>
          {/* ******************************************************************************** */}
          {/* rejected tab end Here  */}
          {/* ******************************************************************************** */}
        </TabContext>
      </Box>
    </>
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

    borderColor: "#8275a5",

    borderRadius: 10,

    broderWidth: 1,

    borderStyle: "solid",

    boxShadow: "1px 1px 20px 5px #C9C9C9",

    display: "flex",

    justifycontent: "center",
  },

  signinButton: {
    position: "relative",

    width: "100%",

    height: 40,

    backgroundColor: "#8275a5",

    color: "white",

    borderRadius: 5,

    border: "none",

    marginTop: 10,
  },
};
