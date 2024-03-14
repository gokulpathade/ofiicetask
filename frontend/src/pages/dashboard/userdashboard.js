import React from "react";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as AiIcons from "react-icons/ai";
import Sidebar from "../../components/sidebar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import b from "../../images/e.png";
import d from "../../images/employees-icon.png";
import s from "../../images/team.png";
// import { sidebar } from "../../components/sidebar";
import moment from "moment";

import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
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






export default function UserDashboard() {






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
  const USER_ID = sessionStorage.getItem("userId");

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

  // *********************************************************************************************
  //   Manager Api Here
  // *********************************************************************************************
  // GET LEAVE WHO REPORTING TO THE MANAGER

  // useEffect(() => {
  //   getApplyLeave();
  // }, []);

  // const getApplyLeave = (managerId) => {
  //   // Make an HTTP request to retrieve pending leave requests for a specific managerId.
  //   axios
  //     .get(config.serverURL + `/applyLeave/manage/?managerId=${managerId}`, {
  //       headers: { token: sessionStorage["token"] },
  //     })
  //     .then((response) => {
  //       const result = response.data;

  //       if (result["status"] === "success") {
  //         console.log(result);
  //         // Set the pending leave requests to the state member or process the data as needed.
  //         setData(result["data"]);
  //       } else {
  //         toast.error(result["error"]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching leave details: " + error);
  //     });
  // };

  // Call the function with the managerId you want to retrieve pending leave requests for.
  // const managerId = sessionStorage; // Replace with the actual managerId.
  // getApplyLeave(managerId);

  // *********************************************************************************************
  //   Manager Api end Here
  // *********************************************************************************************

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
      const regid = data.reid; //
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
      reid: reportingData[0].reid,

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
      .get(config.serverURL + "/applyLeave/" + USER_ID, {
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








  const [managerid, setManagerid] = useState([]);
  const [applystatus, setApplyStatus] = useState('');
  const [emps, setEmps ] = useState('');

  // useEffect(() => {
  //   getEmployeeDetails(managerid);
  // }, [managerid]);
  

  // const USER_ID = sessionStorage.getItem("empno");

  const handleApplyStatusChange = (event, emps) => {
    
    const newApplyStatus = event.target.value;
    setApplyStatus(newApplyStatus);
  
  };
  




  // const getEmployeeDetails = (managerid) => {
  //   axios
  //     .get(config.serverURL + `/applyLeave/manage/${managerid}`, {
  //       headers: { token: sessionStorage["token"] },
  //     })
  //     .then((response) => {
  //       const result = response.data;
  //       console.log("Employee details: ", result);

  //       if (result["status"] === "success") {
  //         // Handle the employee details here
  //         console.log(
  //           "apply status from getdetails mehod sidebar file:",
  //           response.data.data
  //         );
  //         //    console.log("appid get all details : ",response.data.data[0].leaveid) //justn 17-07-2023 commented for leaveid error line 62 inspect
  //         console.log(result);
  //         // set the homes to the state member
  //         setData(result["data"]);
  //       } else {
  //         toast.error(result["error"]);
  //       }
  //     });
  // };






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
          navigate("/managerdashboard");
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

  return (
    <>
      <Sidebar/>
      <div className="Home" style={{ marginLeft: 60, marginTop: 30 }}>
        {/* <div className='container-sm container-fluid' style={{width:'400px',height:'200px', color:'white',backgroundColor:' #8275a5',marginLeft:'70px'}}> 
  
   
     <h3 style={styles.h3}>Total Employee   {registrationss} </h3>
     <div style={{marginLeft:0,marginTop:5}}><FaIcons.FaUserFriends size={'100px'}/></div> */}

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
          <MDBTable striped>
            <MDBTableHead>
              <tr style={{ backgroundColor: "#8275a5", color: "white" }}>
                <th scope="col">Emp No</th>
                <th scope="col">Name</th>
                {/* <th scope="col">Department</th> */}
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
                    {/* <td>{emps.department}</td> */}

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
                <th scope="col">Emp Register Id </th>
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
                  <td>{r.rid}</td>
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
                    {/* <select
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
                    </select> */}

                    <select
                      style={{
                        border: "none",
                        backgroundColor: "#ff9999",
                        fontSize: 18,
                      }}
                      value={applystatus} // Use the state variable here
                      onChange={(event) => handleApplyStatusChange(event, emps)}
                    >
                      <option style={{ color: "red" }}>
                        {emps.applyStatus}
                      </option>
                      {appoptions.map((item) => (
                        <option key={item}>{item}</option> // Ensure each option has a unique key
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
