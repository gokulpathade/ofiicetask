import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { Paper,Typography,Grid, TextField} from '@material-ui/core'
import { Stack } from '@mui/material'
import React from 'react'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';


import { styled } from '@mui/system';






function Reporting() {











  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState(getCurrentDate());
  const [rid, setRid] = useState("");
  const [department, setDepartment] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const USER_ID = sessionStorage.getItem("userId");
  const navigate = useNavigate();









  // *************************************************************
  
  const [value, setValue] = React.useState(null);
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };
  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );
// 888888888888***********************************************************************************

  useEffect(() => {
    getuserdetails(USER_ID);
  }, [USER_ID]);










  // 


  const getuserdetails = (USER_ID) => {
    axios
      .get(config.serverURL + "/use/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        if (result["status"] === "success") {
          setRid(response.data.data[0].rid);
          setFirstName(response.data.data[0].firstName);
          setDepartment(response.data.data[0].department);
        } else {
          toast.error(result["error"]);
        }
      });
  };




  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }


  // ... Your other functions

  const signIn = () => {
    setIsSignedIn(true);
  };

  const signOut = () => {
    setIsSignedIn(false);
  };

  const report = () => {
    

    if (timeIn.length === 0) {
      toast.error("Please enter In Time");
    } else if (department.length === 0) {
      toast.error("Please select Department");
    } else if (date.length === 0) {
      toast.error("Please select Date");
    } else if (reason.length === 0) {
      toast.error("Please mention Reason");
    } else if (timeOut.length === 0) {
      toast.error("Please select Out Time");
    } else {
      const body = {
        timeIn,
        timeOut,
        date,
        reason,
        rid,
        department,
      };

      axios
        .post(config.serverURL + "/reporting/report", body, {
          headers: { token: sessionStorage["token"] },
        })
        .then((response) => {
          const result = response.data;

          if (result["status"] === "error") {
            toast.error("Reporting not successful.");
          } else {
            toast.success("Reporting successful.");
            // Navigate to the desired page using your routing library or component
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  }



  
  const getdetails = (USER_ID) => {
    axios
      .get(config.serverURL + "/reporting/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        if (result["status"] === "success") {
          setRid(response.data.data[0].rid);
          setFirstName(response.data.data[0].firstName);
          setDepartment(response.data.data[0].department);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  return (
    <>
      <Sidebar />
      <Grid item xs={12} sm={8} md={6}>
      <Paper elevation={7} style={{ padding: '20px',marginTop:'70px' 
      ,width:'480px',height:'440px',marginLeft:'350px',borderRadius:'50px'}}>
        <Typography variant='h5' gutterBottom>Reporting</Typography>
        <hr />
        <Stack direction="row" spacing={2} style={{marginTop:'20px'}}>
         <TextField id="outlined-basic" 
         label="Employee No" variant="outlined"
         style={{width:'230px'}} >
          </TextField>


       <TextField  id="outlined-basic" 
         label="Employee Name"
          variant="outlined"
          style={{width:'230px'}}>

       </TextField>

       
       </Stack>
<br></br>
<Stack direction="row" spacing={3} style={{marginTop:'2px'}}>

      
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker', 'TimePicker']}>
        <TimePicker
          label="In Time"
        />
        <TimePicker
          label="Out Time"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>

    </Stack>
    <br></br>
    <Stack direction="row" spacing={3} style={{marginTop:'2px',width:'513px'}}>
    {/* <div style={{marginRight:'230px',width:'233px',marginTop:'5px'}}> */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DatePicker
                    label="Date"
                    //  value={value}
                    //      onChange={(newValue) => {
                    //       setValue(newValue);}}

                             renderInput={(params) => <TextField {...params}
                            />}
                 />
    </LocalizationProvider>
    <Stack direction="row" spacing={0} style={{marginTop:'0px',width:'290px'}}>
    <TextField  id="outlined-basic" 
         label="Department"
          variant="outlined"
          style={{width:'227px'}}>

       </TextField>
       </Stack>
{/* </div> */}
</Stack>
<br></br>
<StyledTextarea
      aria-label="Reason"
      minRows={3}
      placeholder="Reason"
    />
<br></br>
    <br></br>
    <Button variant="contained" 
     style={{borderRadius:'50px',backgroundColor:'#8275a5',width:'160px'}}>
        Submit
      </Button>
 
<br></br>
        </Paper>
        </Grid>
    </>
  );
}

const styles = {
  container: {
    width: 100,
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
  signoutButton: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "red",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};

export default Reporting;


// const Timereg = () => {
//  // get user inputs
//  const[enable,setenable]=useState()
//  const [disbled,setdiabled]=useState()
//   const[id,setid]=useState()
//  const[firstName,setFirstName]=useState()
//  const[regid,setRegid]=useState()

//  const [TimeIn, setTimeIn] = useState('')
//  const[TimeOut,setTimeOut] = useState('')
//  const [TodayDate, setTodayDate] = useState('')
//  const[curTime,setcurTime]=useState('')
// //  const [registration, setRegistration] = useState([])

// const time=sessionStorage.getItem("time")
// console.log("session storage value",time)

//  const USER_ID = sessionStorage.getItem("userId");
//  const Name=sessionStorage.getItem("userName");
//  const Email=sessionStorage.getItem("userEmail");
// console.log("Data from UserId in Time Page ");

//        console.log("id:  ",USER_ID);
//        console.log("Name: ",Name);
//        console.log("Email: ",Email);

//  useEffect(() => {

//   getuserdetails(USER_ID)

// }, [])
//  var showdate=new Date();
//  var displaytodaysdate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();

// const disbleit=TimeIn

// //  const handlechange=()=>{
// //     if(displaytodaysdate===timeinbutton)
// //     {
// //         setenable(true)
// //     }else{
// //         setenable(false)
// //     }
// //  }
//    // this function is used to navigate from one component to another programmatically
//   // userNavigate() returns a function reference
//   const navigate = useNavigate()

//   const timeinbutton=(e)=>{
//     e.currentTarget.disabled=true;

//     const today = new Date();

//    const curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
//     console.log(curTime);
//     setTimeIn(curTime);

//   }

//   const timeoutbutton=(e)=>{
//     e.currentTarget.disabled=true;

//     const today = new Date();

//    const curTimee = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
//    // console.log(curTimee);
//     setTimeOut(curTimee);

//   }

//     return (

//       <div>
//         <Sidebar/>
//  <div style={{ marginTop: 100 }}>
//       <div style={styles.container}>

//        <div className='mb-3'>
//       {/* <tbody>
//           {registration.map((emps) => {

//             return (

//               <>
//                 <div className='mb-3'>
//                <label>ID</label>

//               <input type='text' value={emps.rid} />
//                </div>

//                 </>

//             )
//           })}
//         </tbody>*/}

//  <label>User Id</label>
//           <input  value={id}
//             onChange={(event) => {
//                 setid(event.target.value)
//             }}
//             className='form-control'
//             type='text' readOnly
//           />
//       </div>
//        <div className='mb-3'>
//       <label>First Name</label>
//           <input  value={firstName}
//             onChange={(event) => {
//                 setFirstName(event.target.value)
//             }}
//             className='form-control'
//             type='text' readOnly
//           />
//       </div>

//           <div className='mb-3'>
//           <label>Time In</label>
//           <input  value={TimeIn}
//             onChange={(event) => {
//                 setTimeIn(event.target.value)
//             }}
//             className='form-control'
//             type='text'
//           />
//         </div>
//         {/* <div className='mb-3'>
//           <label>Time Out</label>
//           <input  value={TimeOut}
//             onChange={(event) => {
//                 setTimeIn= setTimeOut(event.target.value)

//             }}
//             className='form-control'
//             type='text'
//           />
//         </div> */}

//         <div className='mb-3'>
//           <label>Today Date</label>
//           <input
//             onChange={(event) => {
//               setTodayDate(event.target.value)
//             }}
//             className='form-control'
//             type='date'
//           />
//         </div>

//         <div className='mb-3' style={{ marginTop: 40 }}>

//           <button onClick={(e)=>timeinbutton(e)} className="btn btn-success"                                                              >
//             TimeIN
//           </button>&nbsp;&nbsp;&nbsp;
// {/* wokring fine button disbled after once clicking */}
//           {/* <button onClick={timeinbutton} className="btn btn-success"     disabled={TimeIn}                                                         >
//             TimeIN
//           </button> */}

//           {/* <button onClick={(e)=>timeoutbutton(e)} className="btn btn-success"   disabled={disbleit ? false:true}                                                              >
//             TimeOUT
//           </button> */}

//         </div>

//         <div className='mb-3' style={{ marginTop: 40 }}>

//           <button onClick={timein} style={styles.signinButton}>
//             submit
//           </button>
//         </div>

//       </div>
//     </div>
//      </div>
//     )
//   }
//   const styles = {
//     container: {
//       width: 400,
//       height: 620,
//       padding: 20,
//       position: 'relative',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       margin: 'auto',
//       borderColor: '#db0f62',
//       borderRadius: 10,
//       broderWidth: 1,
//       borderStyle: 'solid',
//       boxShadow: '1px 1px 20px 5px #C9C9C9',
//     },
//     signinButton: {
//       position: 'relative',
//       width: '100%',
//       height: 40,
//       backgroundColor: '#db0f62',
//       color: 'white',
//       borderRadius: 5,
//       border: 'none',
//       marginTop: 10,
//     },
//   }

//   export default Timereg

























// **************************************************************?

// {/* <div
// className="container"
// style={{
//   marginTop: 30,
//   border: "inline",
//   borderBlockColor: "ActiveBorder",
// }}
// onload="addDate();"
// >
// <h3 style={{ textAlign: "center", marginBottom: 50 }}>Reporting</h3>
// <div className="row justify-content-center" style={{}}>
//   <div className="col-4" style={{ fontSize: 20 }}>
//     <label>Emp No</label>
//     <input
//       value={rid}
//       name="reporting_rid"
//       id="id_reporting_rid"
//       onChange={(event) => {
//         setRid(event.target.value);
//       }}
//       className="form-control"
//       type="text"
//       readOnly
//     />

//     <label> Department</label>
//     <select
//       value={department}
//       name="reporting_department"
//       id="id_reporting_department"
//       onChange={(event) => {
//         setDepartment(event.target.value);
//       }}
//       className="form-control"
//     >
    //   <option value="">Select Department</option>
    //   <option value="Office">Office</option>
    //   <option value="WFH">WFH</option>
    //   <option value="OutDoor">Out Door</option>
    //   {/* Add more department options as needed */}
    // // </select>

    // <label>In Time</label>
    // <input
    //   name="reporting_timein"
    //   id="id_reporting_timein"
    //   onChange={(event) => {
    //     setTimeIn(event.target.value);
    //   }}
    //   className="form-control"
    //   type="time"
    //   value={timeIn}
    // />

  //   {timeIn && (
  //     // Conditionally render the "Out Time" input if "In Time" has a value
  //     <>
  //       <label>Out Time</label>
  //       <input
  //         name="reporting_outtime"
  //         id="id_reporting_outtime"
  //         onChange={(event) => {
  //           setTimeOut(event.target.value);
  //         }}
  //         className="form-control"
  //         type="time"
  //         value={timeOut}
  //       />
  //     </>
  //   )}
  //   {/* style={{borderStyle:'none'}} */}
  // </div>

  // <div
  //   className="col-4"
  //   style={{
  //     borderLeftStyle: "solid",
  //     borderRightColor: "lightgray",
  //     fontSize: 20,
  //   }}
  // >
  //   <label>First Name</label>
  //   <input
  //     value={firstName}
  //     name="reporting_firstname"
  //     id="id_reporting_firstname"
  //     onChange={(event) => {
  //       setfirstname(event.target.value);
  //     }}
  //     className="form-control"
  //     type="text"
  //     readOnly
  //   />
  //   <label>Reason</label>
  //   <textarea
  //     rows={4}
  //     cols={40}
  //     name="reporting_reason"
  //     id="id_reporting_reason"
  //     onChange={(event) => {
  //       setreason(event.target.value);
  //     }}
  //     className="form-control"
  //     type="text"
  //   />

//     <label>Date</label>
//     <input
//       name="reporting_date"
//       id="id_reporting_date"
//       onChange={(event) => {
//         setDate(event.target.value);
//       }}
//       className="form-control"
//       type="date"
//       value={date} // Set the value attribute to the date state
//     />
//   </div>
// </div>
// <div className="row justify-content-center">
//   <div className="col-4">
//     <button
//       name="btn_reporting"
//       id="id_btn_reporting"
//       onClick={report}
//       style={styles.signinButton}
//     >
//       Submit
//     </button>
//   </div>
// </div>
// </div>
// </>
// );
// } */}