import React from "react";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as AiIcons from "react-icons/ai";
// import Sidebar from "../../components/sidebar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import b from "../../images/e.png";
import d from "../Ceinsys Tech Ltd New Logo 3.jpg";
// import s from "../../images/team.png";
// import { sidebar } from "../../components/sidebar";
import moment from "moment";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
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
import NavBar from "./NavBar";
import UserSideBar from "./UserSideBar";
import SideBar from "../dashboard/SideBar";

function UserDashboard() {
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
    // getuserdetailss1();
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
  const [applystatus, setApplyStatus] = useState("");
  const [emps, setEmps] = useState("");

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




   // *******************************************************
   const [show, setShow] = useState(false);
   const handleClose1 = () => setShow(false);
   const handleShow = () => setShow(true);
   const [id, setid] = useState();
   const [firstName, setFirstName] = useState();
   const [regid, setRegid] = useState();
   const [registration, setRegistration] = useState([]);

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
  // *******************************************************

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
    <NavBar />
    <SideBar />

    <div class="card">
  <div class="card-body"> {registration.map((emps) => {
    return (
  <h1>Welcome....!    {emps.Name}</h1>
  );
})}
  </div>
</div>
<Card
        sx={{
          // maxWidth: 1000,
          textAlign: "start",
          marginTop: "15px",
          width: "12%",
          alignContent: "center",
          alignItems: "center",
          height: "200px",
          marginLeft: "0%",
          marginRight: "3%",
          // margin: "auto",
          // padding: '90px',
          paddingLeft: "13px",
          // paddingTop: "20px",
        }}
      >
       <Button>Reporting</Button>
        <Button>Apply Leave</Button>
        <Button>Leave Balance </Button>
        <Button>Attendence</Button>
    
        {/* <Button>Team Status</Button> */}
      </Card>



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

export default UserDashboard;
