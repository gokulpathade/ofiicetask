import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as IconName from "react-icons/fi";
import { SidebarData } from "./sidebardata";
import { SidebarData2 } from "./sidebar2";
import SubMenu from "./submenu";
import { IconContext, icons } from "react-icons/lib";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../slices/authSlice";
import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";
import { SidebarData1 } from "./sidebardata1";
import * as RiIcons from "react-icons/ri";
import ReactRoundedImage from "react-rounded-image";
import Button from "react-bootstrap/Button";
import * as io from "react-icons/io";
import back from "../images/c.png";
import { Badge } from "@mui/material";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Box";

//import Button from '@mui/material/Button';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// or

import Paper from "@mui/material/Paper";

import Modal from "@mui/material/Modal";
import ManagerDashboard from "../pages/dashboard/managerdashboard";

const Nav = styled.div`
  background: #8275a5;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const NavIconn = styled(Link)`
  margin-left: 12rem;
  font-size: 2rem;
  height: 80px;
  //  display: flex;
  //  justify-content: flex-start;
  // align-items: center;
`;

const SidebarNav = styled.nav`
  background: #61518e;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
const Sidebar = ({ getuserdetails2 }) => {
  // const signinStatus = useSelector((state) => state.authSlice.status)
  const signinStatus = true;
  const [getrows, setrows] = useState([]);
  const [loadData, setData] = useState([]);
  const [stauss, setStatuss] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const [basicModal, setBasicModal] = useState(false);
  const handleClose2 = () => {
    setBasicModal(false);
  };
  const handleShow2 = () => {
    setBasicModal(true); // Show the modal Time in
  };

  const [basicModal3, setBasicModal3] = useState(false);
  const handleClose3 = () => setBasicModal3(false);
  const handleShow3 = () => {
    setBasicModal3(true); // Show the modal Time Out
  };

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [registration, setRegistration] = useState([]);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose1 = () => setShow(false);
  const handleShow = () => setShow(true);
  const [id, setid] = useState();
  const [firstName, setFirstName] = useState();
  const [regid, setRegid] = useState();
  const [TimeIn, setTimeIn] = useState("");
  const [TimeOut, setTimeOut] = useState("");
  const [TodayDate, setTodayDate] = useState("");
  //timeout
  const [timein, settimein] = useState();
  const navigate = useNavigate();

  const USER_ID = sessionStorage.getItem("userId");

  //console.log("Data from UserId in Time Page ");

  // console.log("id:  ",USER_ID);

  useEffect(() => {
    getuserdetails1(USER_ID); //time.js
    getuserdetailstimeout(USER_ID); //Attendancedetails.js page
    //  getuserdetails(USER_ID)//only setregistration data all
    getapplyleavedetailsstatus();
    getapplyleavestatus();
  }, []);

  const disbleit = timein;

  const timeinbutton = (e) => {
    e.currentTarget.disabled = true;

    const today = new Date();

    const curTime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(curTime);
    setTimeIn(curTime);
  };
  const timeoutbutton = (e) => {
    e.currentTarget.disabled = true;
    const today = new Date();
    const curTimee =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(curTimee);
    setTimeOut(curTimee);
  };

  const getuserdetailstimeout = (USER_ID) => {
    const showdate1 = new Date();
    const displaytodaysdate1 =
      showdate1.getFullYear() +
      "-" +
      (showdate1.getMonth() + 1) +
      "-" +
      showdate1.getDate();
    // console.log("inside from getuserdetails: ",displaytodaysdate1);
    //console.log("id from getuserdetails : ",USER_ID)
    axios
      .get(
        config.serverURL + "/timereg/" + USER_ID + "/" + displaytodaysdate1,
        {
          headers: { token: sessionStorage["token"] },
        }
      )
      .then((response) => {
        const result = response.data;

        console.log(response.data.data);

        if (result["status"] === "success") {
          //  console.log("then response with timein :",result)

          setid(response.data.data[0]?.rid);
          setFirstName(response.data.data[0]?.firstName);
          settimein(response.data.data[0]?.TimeIn);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  // time out

  const timeIn = (USER_ID) => {
    sessionStorage.setItem("timeout", "true");

    const showdate1 = new Date();
    const displaytodaysdate1 =
      showdate1.getFullYear() +
      "-" +
      (showdate1.getMonth() + 1) +
      "-" +
      showdate1.getDate();
    console.log("inside from timeIn :", displaytodaysdate1);
    console.log("id from timeIn :", USER_ID);

    if (TimeOut.length === 0) {
      toast.error("please enter TimeOut");
    } else {
      const body = {
        TimeOut,
      };

      body.TimeOut = TimeOut;

      console.log("body TimeOut : ", body);
      axios
        .put(
          config.serverURL + "/timereg/" + USER_ID + "/" + displaytodaysdate1,
          body,
          {
            headers: { token: sessionStorage["token"] },
          }
        )
        .then((response) => {
          const result = response.data;
          console.log("response from timeIn put : ", result);

          if (result["status"] === "error") {
            toast.error("not insertd");
          } else {
            getuserdetails2(sessionStorage.getItem("userId"));
            toast.success("Successfully inserted");
            navigate("/inout");
            handleClose3();
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };

  //Time In

  const timeinn = () => {
    console.log("today", TodayDate);
    let status = "";
    sessionStorage.setItem("time", "true");

    if (TimeIn.length === 0) {
      toast.error("please enter Timein");
    } else if (TodayDate.length === 0) {
      toast.error("please select date");
    } else {
      console.log("inside else", TimeIn, TodayDate);
      const body = {
        TimeIn,
        TimeOut,
        TodayDate,
        regid,
        status,
      };

      axios
        .post(config.serverURL + "/timereg/time", body, {
          headers: { token: sessionStorage["token"] },
        })
        .then((response) => {
          const result = response.data;
          console.log("time details user : ", response.data);

          if (result["status"] === "error") {
            toast.error("not insertd");
          } else {
            toast.success("Successfully inserted ");

            navigate("/inout");

            handleClose2();
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };

  const getuserdetails1 = (USER_ID) => {
    axios
      .get(config.serverURL + "/use/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          // console.log("UserDetails Response from UserId: ")
          //   console.log("then response ",result)
          setid(response.data.data[0].rid); //backend  rid
          setFirstName(response.data.data[0].firstName); //backend firstName
          setRegid(response.data.data[0].rid);
          setRegistration(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  //  useEffect(() => {
  //    getapplyleavedetailsstatus()// show data after clicking notification icon
  //   getuserdetails(USER_ID)
  //   getapplyleavestatus()

  // }, [])

  // const getuserdetails = (USER_ID) => {
  //   axios
  //     .get(config.serverURL + '/use/'+ USER_ID, {
  //       headers: { token: sessionStorage['token'] },
  //     })
  //     .then((response) => {
  //       const result = response.data
  //       console.log("......",result)

  //       if (result['status'] === 'success') {
  //         console.log("UserDetails Response from UserId: ")
  //         console.log("then response ",result)
  //         // set the homes to the state member
  //         setRegistration(result['data'])
  //       } else {
  //         toast.error(result['error'])
  //       }
  //     })
  // }

  const getapplyleavestatus = () => {
    axios
      .get(config.serverURL + "/applyLeave/applyleavestatus/count/", {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response;
        //   console.log("totoal applyleave status count: ", result)
        // console.log("status",result.data.status);

        if (result.data.status === "success") {
          setrows(response.data.data[0].counter);
        } else {
          toast.error(result.data.status);
        }
      });
  };

  //apply leave details all
  const getapplyleavedetailsstatus = () => {
    axios
      .get(config.serverURL + "/applyLeave/ss/", {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        //     console.log("get all details of applyleaves sidebar file : ",result)

        if (result["status"] === "success") {
          //setstatus(response.data.data)//applyStatus
          //  setappid(response.data.data[0].leaveid)////just commented for leaveid error line 62 inspect
          //    console.log("apply status from getdetails mehod sidebar file:",response.data.data)
          //    console.log("appid get all details : ",response.data.data[0].leaveid) //justn 17-07-2023 commented for leaveid error line 62 inspect
          // console.log(result)
          // set the homes to the state member
          setData(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  const updateNotification = () => {
    const body = { stauss };
    setOpen(false);
    axios
      .put(config.serverURL + "/applyLeave/applyleavestatus/", body, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        //  console.log("resp",response.data.status)
        const result = response.data.data[0].stauss;
        //   console.log("succesfully added data ",result)
        if (result["status"] === "success") {
          setStatuss(response.data.data[0].stauss);
          // console.log("ooooooooooooooooooooo",response.data.data.stauss)

          getapplyleavedetailsstatus();
          toast.success("successfully Upated...........");
          //   console.log("get method call i side updatenotification")
        } else {
          toast.error(result["error"]);
          toast.error("not updated");
        }
      })
      .catch((error) => {
        //console.log('error')
        console.log(error);
      });
    getapplyleavedetailsstatus();
    getapplyleavestatus();

    toast.success("sccessfullty");

    navigate("/managerdashboard");
    // navigate('/admindashboard')
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 250 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        {/* <TableCell component="th" ><b>Student Name</b></TableCell>
                                    <TableCell component="th"><b>Description</b></TableCell> */}
                        <TableCell component="th">Emp No</TableCell>
                        <TableCell component="th">Name</TableCell>
                        <TableCell component="th">Department</TableCell>
                        <TableCell component="th">Start Date</TableCell>
                        <TableCell component="th">End Date</TableCell>
                        <TableCell component="th">reason</TableCell>
                        <TableCell component="th">Leave Type</TableCell>
                        <TableCell component="th">Apply for</TableCell>
                        {/* <TableCell component="th">Apply Status</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {loadData.map((row) => (
                               <TableRow style={{ backgroundColor: row.status == "0" ? "#ccffcc" : "white"}}>
                                    <TableCell> {row.firstName} </TableCell>
                                    <TableCell>{row.applyStatus}</TableCell>
                               </TableRow>
                            ))} */}

                      {loadData.map((emps) => {
                        return (
                          //  <tr style={{ backgroundColor: emps.stauss == "0" ? "#ccffcc" : "white"}} onClick={() => {
                          //   // go to signin page
                          //   navigate('/admindashboard') }}>
                          <tr
                            style={{
                              backgroundColor:
                                emps.stauss == "0" ? "#ccffcc" : "white",
                            }}
                          >
                            <TableCell>{emps.empno}</TableCell>
                            <TableCell>{emps.firstName}</TableCell>
                            <TableCell>{emps.department}</TableCell>

                            <TableCell>{emps.StartDate}</TableCell>
                            <TableCell>{emps.EndDate}</TableCell>
                            <TableCell>{emps.reason}</TableCell>
                            <TableCell>{emps.leavetype}</TableCell>
                            <TableCell>{emps.applyfor}</TableCell>
                            <TableCell
                              style={{ color: "f2f2f2", backgroundColor: "" }}
                              className="dropdown"
                            ></TableCell>

                            <td></td>
                          </tr>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <br />
            <br />
            <Box textAlign="center">
              {" "}
              <Button
                name="btn_updatenotification"
                id="id_btn_updatenotification"
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => updateNotification()}
              >
                Ok
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>

      {signinStatus && (
        <IconContext.Provider value={{ color: "#fff" }}>
          <Nav id="id_nav" name="nav">
            <NavIcon to="#" id="id_navicon" name="navicon" onClick={handleShow}>
              <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>

            {(window.sessionStorage.getItem("userRole").toLowerCase() ===
              "admin" ||
              window.sessionStorage.getItem("userRole").toLowerCase() ===
                "manager") &&
            signinStatus ? (
              <div style={{ marginLeft: "1480px" }}>
                <button
                  name="btn_notification"
                  id="id_btn_notification"
                  style={{ border: "none", backgroundColor: "#8275a5" }}
                  onClick={handleOpen}
                >
                  <Badge
                    badgeContent={getrows == "0" ? "0" : getrows}
                    color="error"
                  >
                    <io.IoMdNotifications size={"40px"} />
                  </Badge>
                </button>
              </div>
            ) : (
              <></>
            )}

            <div style={{ marginLeft: "1300px" }} className="ml-auto">
              

              {(window.sessionStorage.getItem("userRole").toLowerCase() ===
                "user" ||
                window.sessionStorage.getItem("userRole").toLowerCase() ===
                  "manager") &&
              signinStatus ? (
                <>
                  <button
                    name="btn_siderbar_timein"
                    id="id_btn_siderbar_timein"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: 18,
                      marginLeft: 7,
                      fontWeight: "bold",
                      marginTop: 2,
                    }}
                    // onClick={() => {
                    //   navigate('/timer') }}
                    onClick={handleShow2}
                    className="btn btn-warning"
                    aria-current="page"
                    disabled={
                      window.sessionStorage.getItem("time") === "true"
                        ? true
                        : false
                    }
                  >
                    Time In
                  </button>

                  {/* Add manager-specific reporting button or link here */}
                  {/* Example:
    <button
      name='btn_siderbar_reporting'
      id='id_btn_siderbar_reporting'
      style={{
        textDecoration: 'none',
        color: 'white',
        fontSize: 18,
        marginLeft: 7,
        fontWeight: 'bold',
        marginTop: 2,
      }}
      onClick={handleManagerReporting}
      className="btn btn-primary"
      aria-current='page'
      disabled={window.sessionStorage.getItem("time") === "true" ? true : false} >
      Manager Reporting
    </button>
    */}
                </>
              ) : (
                <></>
              )}

              <MDBModal
                show={basicModal}
                onHide={handleClose2}
                centered
                animation={false}
              >
                <MDBModalDialog
                  className="modal-dialog-centered"
                  style={{ maxWidth: "500px", maxHeight: "80vh" }}
                >
                  <MDBModalContent>
                    <MDBModalHeader>
                      <MDBModalTitle>
                        <IconName.FiClock size="40px" color="#8275a5" />
                      </MDBModalTitle>
                      <MDBBtn
                        className="btn-close"
                        id="id_close2"
                        name="btn_close2"
                        color="none"
                        onClick={handleClose2}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                      {/* <div className='container-sm' style={{width:'400px',height:'320px'}}> */}

                      <div className="row" style={{ marginTop: 5, padding: 5 }}>
                        <div className="col">
                          <div class="form-floating">
                            <div className="form-floating">
                              <input
                                className="form-control"
                                type="text"
                                readOnly
                                name="USERID"
                                id="id_USERID"
                                value={id}
                                onChange={(event) => {
                                  setid(event.target.value);
                                }}
                              />
                              <label for="floatingPassword">USER ID</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: 5, padding: 5 }}>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              value={firstName}
                              name="time_firstname"
                              id="id_time_firstname"
                              onChange={(event) => {
                                setFirstName(event.target.value);
                              }}
                              className="form-control"
                              type="text"
                              readOnly
                              placeholder="First Name"
                            />

                            <label for="floatingSelect">First Name</label>
                          </div>
                        </div>
                      </div>

                      <div className="row" style={{ marginTop: 5, padding: 5 }}>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              value={TimeIn}
                              name="time_timein"
                              id="id_time_timein"
                              onChange={(event) => {
                                setTimeIn(event.target.value);
                              }}
                              className="form-control"
                              type="text"
                              placeholder="Time In"
                            />
                            <label for="floatingPassword">Time In</label>
                          </div>
                        </div>
                      </div>

                      <div className="row" style={{ marginTop: 3, padding: 5 }}>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              name="time_todaydate"
                              id="id_time_todaydate"
                              onChange={(event) => {
                                setTodayDate(event.target.value);
                              }}
                              className="form-control"
                              type="date"
                            />
                            <label for="floatingSelect">Today Date</label>
                          </div>
                        </div>
                      </div>

                      <div className="row" style={{ marginTop: 3, padding: 5 }}>
                        <div className="col">
                          <div class="form-floating">
                            <button
                              name="btn_timeinbutton"
                              id="id_btn_timeinbutton"
                              onClick={(e) => timeinbutton(e)}
                              className="btn btn-success"
                            >
                              Time IN
                            </button>
                          </div>
                        </div>

                        {/* </div> */}
                      </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                      <Button
                        id="id_timeclose"
                        name="btn_timeclose"
                        variant="danger"
                        onClick={handleClose2}
                      >
                        Close
                      </Button>
                      <Button
                        id="id_timeadd"
                        name="btn_timeadd"
                        variant="success"
                        onClick={timeinn}
                      >
                        Submit
                      </Button>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
              {window.sessionStorage.getItem("time") === "true" &&
              signinStatus ? (
                <button
                  name="btn_timedetails"
                  id="id_btn_timedetails"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: 18,
                    marginLeft: 20,
                    fontWeight: "bold",
                    marginTop: 3,
                  }}
                  //  onClick={() => {

                  //    navigate('/timedetails')

                  //  }}
                  onClick={handleShow3}
                  className="btn btn-warning"
                  // TimeOut  button disabled
                  aria-current="page"
                  disabled={
                    window.sessionStorage.getItem("timeout") === "true"
                      ? true
                      : false
                  }
                >
                  Time Out
                </button>
              ) : (
                <></>
              )}

              <MDBModal
                show={basicModal3}
                onHide={handleClose3}
                centered
                animation={false}
              >
                <MDBModalDialog
                  className="modal-dialog-centered"
                  style={{ maxWidth: "500px", maxHeight: "80vh" }}
                >
                  <MDBModalContent>
                    <MDBModalHeader>
                      <MDBModalTitle>
                        <IconName.FiClock size="40px" color="#8275a5" />
                      </MDBModalTitle>
                      <MDBBtn
                        className="btn-close"
                        id="id_close2"
                        name="btn_close2"
                        color="none"
                        onClick={handleClose2}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                      <div className="row" style={{ marginTop: 5, padding: 5 }}>
                        <div className="col">
                          <div class="form-floating">
                            <div className="form-floating">
                              <input
                                value={id}
                                name="empid"
                                id="id_empid"
                                onChange={(event) => {
                                  setid(event.target.value);
                                }}
                                className="form-control"
                                type="text"
                                readOnly
                              />
                              <label for="floatingPassword">USER ID</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: 5, padding: 5 }}>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              value={firstName}
                              name="FirstNAME"
                              id="id_FirstNAME"
                              onChange={(event) => {
                                setFirstName(event.target.value);
                              }}
                              className="form-control"
                              type="text"
                              readOnly
                            />

                            <label for="floatingSelect">First Name</label>
                          </div>
                        </div>
                      </div>

                      <div className="row" style={{ marginTop: 5, padding: 5 }}>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              value={timein}
                              onChange={(event) => {
                                setTimeIn(event.target.value);
                              }}
                              className="form-control"
                              type="text"
                              readOnly
                              name="TIMEIN"
                              id="id_TIMEIN"
                            />
                            <label for="floatingPassword">Time In</label>
                          </div>
                        </div>
                      </div>

                      <div className="row" style={{ marginTop: 3, padding: 5 }}>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              value={TimeOut}
                              onChange={(event) => {
                                setTimeOut(event.target.value);
                              }}
                              className="form-control"
                              type="text"
                              name="TIMEOUT"
                              id="id_TIMEOUT"
                            />
                            <label for="floatingSelect">Time Out</label>
                          </div>
                        </div>
                      </div>

                      <div className="row" style={{ marginTop: 3, padding: 5 }}>
                        <div className="col">
                          <div class="form-floating">
                            <button
                              name="TIMEOUT_btn"
                              id="id_TIMEOUT_btn"
                              onClick={(e) => timeoutbutton(e)}
                              className="btn btn-success"
                              disabled={disbleit ? false : true}
                            >
                              Time Out
                            </button>
                          </div>
                        </div>
                      </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                      <Button
                        id="id_timeoutclose"
                        name="btn_timeoutclose"
                        variant="danger"
                        onClick={handleClose3}
                      >
                        Close
                      </Button>
                      <Button
                        name="submit_btn"
                        id="id_submit_btn"
                        variant="success"
                        onClick={() => timeIn(USER_ID)}
                      >
                        Submit
                      </Button>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </div>
          </Nav>

          <SidebarNav
            sidebar={sidebar}
            id="id_sidebarNav"
            name="SidebarNav"
            show={show}
            onHide={handleClose1}
          >
            <SidebarWrap>
              <NavIconn
                to="#"
                id="id_sidebarnaviconn"
                name="sidebarnaviconn"
                onClick={showSidebar}
              >
                <AiIcons.AiOutlineClose />
              </NavIconn>
              <div>
                <div
                  className="mb-3"
                  style={{ position: "center", marginLeft: 50, marginTop: 5 }}
                >
                  {/* <h3 style={styles.h3}>Profile</h3> */}
                  {registration.map((emps) => {
                    const imageUrl = config.serverURL + "/" + emps.image;
                    return (
                      <div>
                        <ReactRoundedImage
                          image={imageUrl}
                          roundedColor="#66A5CC"
                          imageWidth="120"
                          imageHeight="120"
                          roundedSize="5"
                          id="id_roundedimg"
                          name="roundedimg"
                          // borderRadius="18"
                        />
                        <div style={{ marginLeft: 29 }}>
                          <h5 style={{ color: "white" }}>{emps.firstName}</h5>
                        </div>{" "}
                        <h6 style={{ color: "white", marginLeft: 1 }}>
                          {emps.email}
                        </h6>
                      </div>
                    );
                  })}
                </div>
                <hr style={{ color: "white", height: "3px" }} />

                {window.sessionStorage.getItem("userRole").toLowerCase() ===
                "user" ? (
                  <>
                    {SidebarData2.map((item, index) => {
                      return <SubMenu item={item} key={index} />;
                    })}
                  </>
                ) : window.sessionStorage.getItem("userRole").toLowerCase() ===
                  "manager" ? (
                  <>
                    {SidebarData1.map((item, index) => {
                      return <SubMenu item={item} key={index} />;
                    })}
                  </>
                ) : (
                  <>
                    {SidebarData.map((item, index) => {
                      return <SubMenu item={item} key={index} />;
                    })}
                  </>
                )}

                {window.sessionStorage.getItem("time") === "true" &&
                signinStatus ? (
                  <div style={{ marginLeft: "20px" }}>
                    <BsIcons.BsFillCalendar2CheckFill />
                    <button
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontSize: 18,
                        marginLeft: 5,
                      }}
                      onClick={() => {
                        navigate("/inout");
                      }}
                      className="btn btn-link"
                      aria-current="page"
                    >
                      Attendance details
                    </button>{" "}
                  </div>
                ) : (
                  <></>
                )}

                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  <RiIcons.RiLogoutCircleFill />
                  {signinStatus && (
                    <button
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontSize: 18,
                        marginLeft: 5,
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        // go to signin page
                        navigate("/");

                        // send the action to let the user signout
                        dispatch(signout());
                      }}
                      className="btn btn-link"
                      aria-current="page"
                    >
                      Signout
                    </button>
                  )}
                </div>
              </div>
            </SidebarWrap>
          </SidebarNav>
        </IconContext.Provider>
      )}
    </>
  );
};
const styles = {
  h3: {
    textAlign: "center",
    margin: 20,
    fontWeight: 50,
    color: "white",
    marginRight: 95,
  },
  button: {
    marginRight: 10,
  },
};
export default Sidebar;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 950,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
