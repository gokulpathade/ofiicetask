
// import React from 'react'
// import { useState,useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import config from '../../config'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import Sidebar from '../../components/sidebar'
// import moment from "moment";
// //import Navbar from '../../components/navbar'

// //import { Button } from '@material-ui/core'



// const TimeInOutDetails = () => {
//  // get user inputs

//   const[id,setid]=useState()
//  const[firstName,setFirstName]=useState()
//  const[regid,setRegid]=useState()
//  const[timein,settimein]=useState()
//  const[status,setStatus]=useState()


 
//  const [TimeIn, setTimeIn] = useState('')
//  const[TimeOut,setTimeOut] = useState('')
//  const [TodayDate,setTodayDate] = useState('')
//  const[curTime,setcurTime]=useState('')
//   const [registration, setRegistration] = useState([])

//  const USER_ID = sessionStorage.getItem("userId");
//  const Name=sessionStorage.getItem("userName");
//  const Email=sessionStorage.getItem("userEmail");
// console.log("Data from UserId in Attendetails Page After Login");


//        console.log("id:  ",USER_ID);
//        console.log("Name: ",Name);
//        console.log("Email: ",Email);
//        console.log("time in ",timein)

//  useEffect(() => {
//     getuserdetails(USER_ID)
// }, [])


// //     let showdate=new Date();
// //  let displaytodaysdate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();

// // console.log("Today Current Date : ",displaytodaysdate)

//  const disbleit=timein
//  const navigate = useNavigate()

// //   const timeinbutton=(e)=>{
// //     e.currentTarget.disabled=true;

// //     const today = new Date();

// //    const curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
// //     console.log(curTime);
// //     setTimeIn(curTime);


// //   }

// //   const timeoutbutton=(e)=>{
// //     e.currentTarget.disabled=true;
// //      const today = new Date();
// //      const curTimee = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
// //      console.log(curTimee);
// //      setTimeOut(curTimee);
// // }

// //   const timeIn = (USER_ID) => {
    
// //     const showdate1 = new Date();
// //     const displaytodaysdate1 = showdate1.getFullYear()+ '-' + (showdate1.getMonth()+1)+ '-' + showdate1.getDate();
// //    console.log("inside from timeIn :",displaytodaysdate1);
// //    console.log("id from timeIn :",USER_ID)

// //     // check if user has really entered any value
// //     if (TimeOut.length === 0) {
// //       toast.error('please enter TimeOut')
// //     }  else{
        
// //         const body={
// //             TimeOut
// //         }
// //         // body.name=name;
// //         // body.TimeIn=curTime;
// //         // body.TodayDate=TodayDate;
// //         body.TimeOut=TimeOut
// //       // make the API call to check if user exists
// //       console.log("body TimeOut : ",body)
// //       axios
// //         .put(config.serverURL + '/timereg/' + USER_ID + "/" + displaytodaysdate1,body,{
// //             headers: { token: sessionStorage['token'] },
          
// //          })
// //         .then((response) => {
// //           // get the data returned by server
// //           const result = response.data
// //           console.log("response from timeIn put : ",result)

// //           // check if user's authentication is successfull
// //           if (result['status'] === 'error') {
// //             toast.error('not insertd')
// //           } else {
// //             toast.success('successfully inserted')

// //             // navigate to the singin page
// //              navigate('/sidebar')
// //           }
// //         })
// //         .catch((error) => {
// //           console.log('error')
// //           console.log(error)
// //         })
// //     }
// //   }


//   const getuserdetails = (USER_ID) => {
   
//     const showdate1 = new Date();
//     const displaytodaysdate1 = showdate1.getFullYear()+ '-' + (showdate1.getMonth()+1)+ '-' + showdate1.getDate();
//    console.log("inside from getuserdetails: ",displaytodaysdate1);
//    console.log("id from getuserdetails : ",USER_ID)
//     axios
//       .get(config.serverURL + '/timereg/get/' + USER_ID + "/" + displaytodaysdate1,{
//         headers: { token: sessionStorage['token'] },
//       })
//       .then((response) => {
//         const result = response.data
      
//         console.log("responsee",response.data.data)
  
//         if (result['status'] === 'success') {
         
//           console.log("then response with timein :",result)
//            setid(response.data.data[0].rid) //backend  rid
//            setFirstName(response.data.data[0].firstName)
//            settimein(response.data.data[0].TimeIn)
//            setTimeOut(response.data.data[0].TimeOut)
//            setTodayDate((response.data.data[0].TodayDate))
//           // setTodayDate(new Date(response.data.data[0].TodayDate).toISOString().split('T')[0]);
//           setStatus(response.data.data[0].status)
//           console.log("datee",(response.data.data[0].TodayDate))

//            //backend firstName
//          // setRegid(response.data.data[0].rid)
          
//           setRegistration(result['data'])
//         } else {
//           toast.error(result['error'])
//         }
//       })
//   }






//     return (
      
//       <div>
//         <Sidebar/>
//  {/* here paste */}
//      <div>
//       <div className='container'>
//       <h3 style={styles1.h3}>Attendance Details</h3>
//       <table className='table table-striped'>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>FirstName</th>
//             <th>Time In</th>
//             <th>Time Out</th>
//             <th>Date</th>
//             <th>Status</th>
//            </tr>
//         </thead>
//         <tbody>
//           {registration.map((reg) => {
          
//             return (
//               <tr>
//                 <td>{reg.rid}</td>
//                 <td>{reg.firstName}</td>
//                 <td>{reg.TimeIn}</td>
//                 <td>{reg.TimeOut}</td>
//                 <td>{(new Date(reg.TodayDate).toISOString().split('T')[0])}</td>
//                 <td style={{color:'green',fontSize:20,fontFamily:'solid-bold'}}>{reg.status}</td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//     </div>
     
//       </div>


































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

//   const styles1 = {
//     h3: {
//       textAlign: 'center',
//       margin: 20,
//     },
//     button: {
//       marginRight: 10,
//     },
//   }
  
//   export default TimeInOutDetails



import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import config from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import moment from 'moment';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TimeInOutDetails = () => {
  
  const [total_hours, setTotalHours] = useState([]); //getuserdetails2
  const[details,setDetails]=useState([]);//getuserdetails3
  const[regdetails,setRegDetails]=useState([]);//getregistration1
  const[total_hourss,setTotalHourss]=useState('') 
  const[statuss,setStatus]=useState('');
  const[timeoutvalue, settimeoutvalue]=useState('') 
  const[Late_In,setLateIn]=useState('')
  const[EarlyOut,setEarlyOut]=useState('')
  const[ExtraTime,setExtraTime]=useState('')
  const[shortfall_hrs,setShortFallhrs]=useState('')
  const[session1,setSession1]=useState([])

  
  const USER_ID = sessionStorage.getItem('userId');
  const navigate = useNavigate();



  // useEffect(() => {
  
  //   //console.log("TimeInOutDetails useeffect method called 1 : ")
  //    getuserdetails2(USER_ID);
    
  // }, []);

  useEffect(() => {
    getuserdetails2(USER_ID);
    getuserdetails3(USER_ID);
    updateLatein(USER_ID);
    UpdateEarlyOut(USER_ID);
    UpdateExtraTime(USER_ID);
    UpdateShortfallhrs(USER_ID)
     getregistration1(USER_ID);
     getregistrationn(USER_ID);
    // Check if timeoutvalue exists and is not "00:00:00"
    if (timeoutvalue && timeoutvalue !== "00:00:00") {
      updateTotaltime(USER_ID, total_hourss, statuss);
    }

   // const timee='12:15:00'
   // console.log("timeoutttttttt value :: ",timeoutvalue)
    // if (timeoutvalue && timeoutvalue <= timee) {
    //   console.log("inside useEffect session1 details ")
    //   getregistrationn(USER_ID);
    // }


  }, [timeoutvalue]); 

  const getuserdetails3 = (USER_ID) => {
    console.log("inside TimeInOutDeatils.js Page from getuserdetails2 ::");
    const showdate1 = new Date();
    const displaytodaysdate1 =
      showdate1.getFullYear() + '-' + (showdate1.getMonth() + 1) + '-' + showdate1.getDate();
   
    axios
      .get(config.serverURL + '/registration1/totaldetails/' + USER_ID + '/' + displaytodaysdate1, {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data;
        if (result['status'] === 'success') {
          setDetails(result['data']);
          console.log(" getuserdetials3 data ::::",result['data'])
           } else {
          toast.error(result['error']);
        }
      });
  };
  const getregistration1 = (USER_ID) => {
    console.log("inside TimeInOutDeatils.js Page from getregistration1 ::");
    const showdate1 = new Date();
    const displaytodaysdate1 =
      showdate1.getFullYear() + '-' + (showdate1.getMonth() + 1) + '-' + showdate1.getDate();
   
    axios
      .get(config.serverURL + '/registration1/details/' + USER_ID , {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data;
        if (result['status'] === 'success') {
          setRegDetails(result['data']);
          console.log(" getregistration1 data ::::",result['data'])

           } else {
          toast.error(result['error']);
        }
      });
  };
  const getregistrationn = (USER_ID) => {
    console.log("inside TimeInOutDeatils.js Page from getregistration1 ::");
    const showdate1 = new Date();
    const displaytodaysdate1 =
      showdate1.getFullYear() + '-' + (showdate1.getMonth() + 1) + '-' + showdate1.getDate();
   
    axios
      .get(config.serverURL + '/registration1/details/' + USER_ID , {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data;
        if (result['status'] === 'success') {
          setSession1(result['data']);
          console.log(" getregistrationn ",result['data'])
           } else {
          toast.error(result['error']);
        }
      });
  };
  const getuserdetails2 = (USER_ID) => {
    console.log("inside TimeInOutDeatils.js Page from getuserdetails2 ::");
    const showdate1 = new Date();
    const displaytodaysdate1 =
      showdate1.getFullYear() + '-' + (showdate1.getMonth() + 1) + '-' + showdate1.getDate();
   
    axios
      .get(config.serverURL + '/registration1/totalhours/' + USER_ID + '/' + displaytodaysdate1, {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data;
        if (result['status'] === 'success') {
          setTotalHours(result['data']);
          console.log(" all dataaaaaaaaa ::::",result['data'])
          const totalHourssValue = response.data.data[0].total_hours; 
        settimeoutvalue(response.data.data[0].TimeOut);
      
       console.log("timeOUT value ::",timeoutvalue)
         setTotalHourss(totalHourssValue);
         console.log("Total Time : = ", totalHourssValue);
        //  const timeoutvalue1=response.data.data[0].TimeOut;
        //  if (timeoutvalue1 !== "00:00:00") {
        //   updateTotaltime(USER_ID, totalHourssValue); 
        // }

         
          
        } else {
          toast.error(result['error']);
        }
      });
  };
  
  //Late_In time calculate

  const updateLatein = (USER_ID) => {
    //console.log("inside update Late In ::");
    const showdate1 = new Date();
    const displaytodaysdate1 =
      showdate1.getFullYear() + '-' + (showdate1.getMonth() + 1) + '-' + showdate1.getDate();
   const body={Late_In

   }
    axios
      .put(config.serverURL + '/timereg/latein/' + USER_ID + '/' + displaytodaysdate1, body,{
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data;
        if (result['status'] === 'success') {
         
       //   console.log(" late in  data ::::",result['data'])
          
           } else {
          toast.error(result['error']);
        }
      });
  };

  //EarlyOut Time Calculate
  const UpdateEarlyOut = (USER_ID) => {
   // console.log("inside update Late In ::");
    const showdate1 = new Date();
    const displaytodaysdate1 =
      showdate1.getFullYear() + '-' + (showdate1.getMonth() + 1) + '-' + showdate1.getDate();
   const body={EarlyOut

   }
    axios
      .put(config.serverURL + '/timereg/earlyout/' + USER_ID + '/' + displaytodaysdate1, body,{
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data;
        if (result['status'] === 'success') {
         
         // console.log(" EarlyOut in  data ::::",result['data'])
          
           } else {
          toast.error(result['error']);
        }
      });
  };

  //Extra Time calculate
  const UpdateExtraTime = (USER_ID) => {
   // console.log("inside update Late In ::");
    const showdate1 = new Date();
    const displaytodaysdate1 =
      showdate1.getFullYear() + '-' + (showdate1.getMonth() + 1) + '-' + showdate1.getDate();
   const body={shortfall_hrs

   }
    axios
      .put(config.serverURL + '/timereg/extratime/' + USER_ID + '/' + displaytodaysdate1, body,{
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data;
        if (result['status'] === 'success') {
         
        //  console.log(" Extra Time in  data ::::",result['data'])
          
           } else {
          toast.error(result['error']);
        }
      });
  };

//Shortfall Hours
  const UpdateShortfallhrs = (USER_ID) => {
  //  console.log("inside update Late In ::");
    const showdate1 = new Date();
    const displaytodaysdate1 =
      showdate1.getFullYear() + '-' + (showdate1.getMonth() + 1) + '-' + showdate1.getDate();
   const body={ExtraTime

   }
    axios
      .put(config.serverURL + '/timereg/shortfallhrs/' + USER_ID + '/' + displaytodaysdate1, body,{
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data;
        if (result['status'] === 'success') {
         
        //  console.log(" Shortfallhrs in  data ::::",result['data'])
          
           } else {
          toast.error(result['error']);
        }
      });
  };


  const updateTotaltime = (USER_ID, totalHourssValue,statuss) => {
    const showdate1 = new Date();
    const displaytodaysdate1 =
      showdate1.getFullYear() + '-' + (showdate1.getMonth() + 1) + '-' + showdate1.getDate();
    //  const maxWorkingTimeInSeconds = 2 * 60 * 60;
    const maxWorkingTimeInSeconds ='02:00:00'

    // Calculate the status based on totalHourssValue
    //console.log("UpdateTotalTime method called  ::",totalHourssValue)
    const status = totalHourssValue >= maxWorkingTimeInSeconds ? 'Present' : 'absent';
  
    const body = {
      total_hourss: totalHourssValue,
      status: status, // Include the calculated status in the request body
    };
  
    axios
      .put(
        config.serverURL + '/timereg/totaltimee/' + USER_ID + "/" + displaytodaysdate1,
        body,
        {
          headers: { token: sessionStorage['token'] },
        }
      )
      .then((response) => {
        const result = response.data;
        if (result['status'] === 'error') {
          toast.error('not inserted');
        } else {
          //toast.success('successfully inserted');
          getuserdetails3(USER_ID)
        }
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
  };

 const addsession1 = () =>{

 }
  
  return (
    <div>
      <Sidebar getuserdetails2={getuserdetails2}/>
      <div>
        <div className='container'>
           <h3 style={styles1.h3}>Todays Attendance</h3> 
           <table className='table table-striped'>
            <thead>
              <tr style={{backgroundColor:'#8275a5',color:'white'}}>
                <th>ID</th>
                <th>Firs tName</th>
                <th>First In</th>
                <th>Last Out</th>
                {/* <th>Late In</th> */}
                <th>Date</th>
                <th>Status</th>
                <th>Working Hours</th>
              </tr>
            </thead>
            <>  {/* <tbody>
              {total_hours.map((reg) => {
            
                return (
                  <tr key={reg.rid}>

                    <td>{reg.regid}</td>
                    <td>{reg.firstName}</td>
                    <td>{reg.TimeIn}</td>
                    <td>{reg.TimeOut}</td>
                    <td>{moment(reg.TodayDate).format('YYYY-MM-DD')}</td>
                    <td style={{ color: 'green', fontSize: 20, fontFamily: 'solid-bold' }}>
                      {reg.status}
                    </td>
                  
                    <td style={{ color: reg.total_hours ? 'green' : 'red' }}>
                         {reg.total_hours ? reg.total_hours : 'On Working'}
                      </td>
                       

                   
                    </tr>
                );
              })}
            </tbody> */}</>
          
             <tbody>
              {details.map((reg) => {
            
                return (
                  <tr key={reg.rid}>

                    <td>{reg.regid}</td>
                    <td>{reg.firstName}</td>
                    <td>{reg.TimeIn}</td>
                    <td>{reg.TimeOut}</td>
                    {/* <td>{reg.Late_In}</td> */}
                    <td>{moment(reg.TodayDate).format('YYYY-MM-DD')}</td>
                    <td style={{ color: 'green', fontSize: 20, fontFamily: 'solid-bold' }}>
                      {reg.status}
                    </td>
                  
                    <td style={{ color: reg.total_hourss ? 'green' : 'red' }}>
                         {reg.total_hourss ? reg.total_hourss : 'On Working'}
                      </td>
                       

                   
                    </tr>
                );
              })}
            </tbody>
      </table> 
      <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Attendance details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <table className='table table-striped'>
            <thead>
              {/* <tr style={{backgroundColor:'#8275a5',color:'white'}}> */}
              <tr>  <th>Date</th>
                <th>Shift</th>
                <th>Attendance Scheme</th>
                <th>First In</th>
                <th>Last Out</th>
              
                <th>Status</th>
                <th> Actual Work Hrs</th>
                <th>Working hrs in shift time</th>
                <th>Shortfall Hrs</th>
                <th>Excess hrs</th>
              </tr>
            </thead>
          
          
             <tbody>
              {regdetails.map((reg) => {
            
                return (
                   <tr key={reg.rid}>
                    <td>{moment(reg.TodayDate).format('YYYY-MM-DD')}</td>
                    <td>09:(GEN)</td>
                    <td>09:00 to 06:30 </td>
                    <td>{reg.TimeIn}</td>
                    <td>{reg.TimeOut}</td>
                  
                    <td style={{ color: 'green', fontSize: 20, fontFamily: 'solid-bold' }}>
                      {reg.status}
                    </td>
                  
                    <td style={{ color: reg.total_hourss ? 'green' : 'red' }}>
                         {reg.total_hourss ? reg.total_hourss : 'On Working'}
                      </td>
                      <td>09:30</td>
                      <td>{reg.shortfall_hrs}</td>
                      <td>{reg.ExtraTime}</td>

                   
                    </tr>
                );
              })}
            </tbody>
      </table> 
     
          </Typography>
        </AccordionDetails>
      </Accordion>
       {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <table className='table table-striped'>
            <thead>
              <tr>
             
                <th>Date</th>
                <th>Session 1</th>
                <th>First In</th>
                <th>Last Out</th>
                <th>Late In</th>
                <th>Early Out</th>

             
                <th>Status</th>
                <th>Total Working Hours</th>
              </tr>
             
               
              
            </thead>
          
          
             <tbody>
              {regdetails.map((reg) => {
            
                return (
                  <tr key={reg.rid}>

                
                    <td>{moment(reg.TodayDate).format('YYYY-MM-DD')}</td>
                    <td>9:00 to 9:30</td>
                    <td>{reg.TimeIn}</td>
                    <td>{reg.TimeOut}</td>
                  <td>{reg.Late_In}</td>
                  <td>{reg.EarlyOut}</td>
               
                    <td style={{ color: 'green', fontSize: 20, fontFamily: 'solid-bold' }}>
                      {reg.status}
                    </td>
                  
                    <td style={{ color: reg.total_hourss ? 'green' : 'red' }}>
                         {reg.total_hourss ? reg.total_hourss : 'On Working'}
                      </td>
                       

                   
                    </tr>
                    
                );
                
              })}
            </tbody>
      </table> 
     
          </Typography>
        </AccordionDetails>
      </Accordion>  */}
     
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Session 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <table className='table table-striped'>
            <thead>
          
              <tr>
            
                <th>Date</th>
                <th>9:00 to 14:15</th>
                <th>Start Time</th>
                <th>Late In</th>
                <th>End Time</th>
               <th>Early Out</th>
              </tr>
             
               
              
            </thead>
                    
             <tbody>
             {session1.map((reg) => {
  const timeout = reg.TimeOut;
  const earlyout=reg.EarlyOut 
  const timeinn=reg.TimeIn

  return (
    <tr key={reg.rid}>
      <td>{moment(reg.TodayDate).format('YYYY-MM-DD')}</td>
      <td>9:00 to 12:15</td>
      {/* <td>{reg.TimeIn}</td> */}
      <td>{timeinn <='14:15:00' ? (
          <span style={{ color: 'green' }}>{reg.TimeIn}</span>
          // '00:00:00'
        ) : 
         (<span style={{ color: 'red' }}>{reg.TimeIn}</span>)   
        //  '00:00:00'
         }
         </td>
      
      {/* <td>{reg.Late_In}</td> */}
      <td>{timeinn <='14:15:00' ?  (
          <span style={{ color: 'green' }}>{reg.Late_In}</span>
          // '00:00:00'
        ) : 
        (<span style={{ color: 'red' }}>{reg.Late_In}</span>)}</td>
      <td>
        {timeout <= '14:15:00' ? (
          <span style={{ color: 'green' }}>{timeout}</span>
        ) : 
        (<span style={{ color: 'red' }}>{timeout}</span>)
        // '00:00:00'
        }
      </td>
      <td>
        {reg.TimeOut <= '14:15:00' ? (
              <span style={{ color: 'green' }}>{reg.EarlyOut}</span> ):
      // '00:00:00'
      ( <span style={{ color: 'red' }}>{reg.EarlyOut}</span>)}
      </td>
      {/* <td>{reg.EarlyOut}</td> */}
    </tr>
  );
})}

            </tbody>  
      </table> 
     
          </Typography>
        </AccordionDetails>
      </Accordion> 


      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Session 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <table className='table table-striped'>
            <thead>
            <tr>
               <th>Date</th>
                <th>14:16 to 18:30</th>
                <th>Start Time</th>
                <th>Late In</th>
                <th>End Time</th>
               <th>Early Out</th>
             </tr>
          </thead>
          <tbody>
             {session1.map((reg) => {
  const timeout = reg.TimeOut;
  const timein=reg.TimeIn;

  return (
    <tr key={reg.rid}>
      <td>{moment(reg.TodayDate).format('YYYY-MM-DD')}</td>
      <td>14:16 to 18:30</td>
      <td>{timein >='14:15:00' ? (
          <span style={{ color: 'green' }}>{timein}</span>
          // '00:00:00'
        ) : 
        (<span style={{ color: 'red' }}>{timein}</span>)}</td>
      {/* <td>{reg.Late_In}</td> */}
      <td>{timein >='14:15:00' ?  (
          <span style={{ color: 'green' }}>{reg.Late_In}</span>
          // '00:00:00'
        ) : 
        (<span style={{ color: 'red' }}>{reg.Late_In}</span>)}</td>
      <td>
        {timeout >= '14:15:00' ? (
          <span style={{ color: 'green' }}>{timeout}</span>
        ) : 
        (<span style={{ color: 'red' }}>{timeout}</span>)
        // '00:00:00'
        }
      </td>
      {/* <td>{reg.EarlyOut}</td> */}
      <td>{reg.TimeOut >= '14:15:00' ? (
              <span style={{ color: 'green' }}>{reg.EarlyOut}</span>
      ):
      // '00:00:00'
      ( <span style={{ color: 'red' }}>{reg.EarlyOut}</span>)
     
      
      
      
      
      }</td>
    </tr>
  );
})}

            </tbody>  
         
      </table> 
     
          </Typography>
        </AccordionDetails>
      </Accordion> 
    </div>
      </div>
    
      </div>
    </div>
  );
};

const styles1 = {
  h3: {
    textAlign: 'center',
    margin: 20,
  },
};

export default TimeInOutDetails;





  