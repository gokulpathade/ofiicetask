


import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState,useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../../components/sidebar";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify'
import config from '../../config'
import axios from 'axios'
import moment from "moment";





const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});



function Calender1() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
   
   const [allEvents, setAllEvents] = useState('');
   const[eventname,setEventname]= useState('');
   const[startdate,setStartdate]= useState();
   const[enddate,setEnddate]= useState();
   const [events, setEvents] = useState([]);

   useEffect(() => {
  //getcalenderdetails()
 getcalender()
  }, [])

    function handleAddEvent() {
        
        for (let i=0; i<allEvents.length; i++){

            const d1 = new Date (allEvents[i].start)
            const d2 = new Date(newEvent.start)
            const d3 = new Date(allEvents[i].end)
            const d4 = new Date(newEvent.end)


             if (
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
              )
            {   
                alert("CLASH"); 
                break;
             }
    
        }
        
        
        setAllEvents([...allEvents, newEvent]);
    }
  
    const getcalender = () => {
      axios
        .get(config.serverURL + '/calender/gett/', {
          headers: { token: sessionStorage['token'] },
        })
        .then((response) => {
          const result = response.data;
          if (result['status'] === 'success') {
            console.log("result calender : ", result);
            let eventsData = [];
            response.data.data.forEach((eventData) => {
              let title = eventData.eventname;
              let start = moment(eventData.startdate).format('YYYY-MM-DD');
              let end = moment(eventData.enddate).format('YYYY-MM-DD');
              const event = {
                title,
                start,
                end,
                allDay:true,
                };
              eventsData.push(event);
            });
         // Set all events in the state
            setEvents(eventsData);
           } else {
            toast.error(result['error']);
          }
        })
        .catch((error) => {
          toast.error('Error fetching employee details');
        });
    };

    const addevent = () => {
        // check if user has really entered any value
        if (eventname.length === 0) {
          toast.error('please enter Event name ')
        } else if (startdate.length === 0) {
          toast.error(' select Start date')
        }else if (enddate.length === 0) {
            toast.error('select End date')
          }
        else {
             const startDateFormat = moment(startdate).format('YYYY-MM-DD');
             const endDateFormat = moment(enddate).format('YYYY-MM-DD');
              const body = {
              eventname,
               startdate: startDateFormat,
                enddate: endDateFormat,
                }
          console.log(body)
       
          axios
            .post(config.serverURL + '/calender/add/', body ,{
              headers: { token: sessionStorage['token'] },
              })
            .then((response) => {
              
              const result = response.data
              console.log("Calender event  details ", result)
    
              
              if (result['status'] === 'error') {
                toast.error('successfully not added event')

              } else {
                toast.success('successfully added event')
                
                getcalender()
              }

              setEventname('');
              setStartdate('');
              setEnddate('');
            })
            .catch((error) => {
              console.log('error')
              console.log(error)
            })
        }
      }
      

    return (
        <>
        <Sidebar/>
         <Grid container spacing={1} margin={1}  marginLeft={1}>
            <div className="table" style={{width:350,height:400,textAlign:'',justifyContent:'center',marginLeft:600,margin:30,border:''}}>
            <p style={{fontSize:20,fontFamily:'cursive',margin:1,textAlign:'center'}}>Add Event</p> 
          <Grid item xs={4} >
 
    <item >
        <table className="table" style={{width:500}}>
       <tbody>
      <div className="col-4" style={styles.container}>
          <div className='mb-3'>
            {/* <label>Add Title</label> */}
            <input name='addevent'
           placeholder="Add Event"
              className='form-control-lg'
              type='text'
              value={eventname}
               onChange={(event) => setEventname( event.target.value )}
            />
          </div>
      <div className='mb-3'>
            {/* <label>Start Date</label> */}
            {/* <input
          
              className='form-control-lg'
              type='date'
              
               onChange={(event) => setStartdate( event.target.value )}
            /> */}


            <DatePicker name='calender_startdate'
            className="form-control-lg"
            placeholderText="Start Date"
            selected={startdate}
            dateFormat={"yyyy-MM-dd"} // Set the selected date
            onChange={(date) => setStartdate(date)} // Handle the selected date
          />
          </div>
          <div className='mb-3'>
            {/* <label>End Date</label> */}
            {/* <input
          
          className='form-control-lg'
          type='date'
          
           onChange={(event) => setEnddate( event.target.value )}
        /> */}
            <DatePicker name='calender_enddate'
            className="form-control-lg"
            placeholderText="End Date"
            selected={enddate} 

            dateFormat={"yyyy-MM-dd"}// Set the selected date
            onChange={(date) => setEnddate(date)} // Handle the selected date
          />

          </div>   
          <div className='mb-3' style={{ marginTop: 10 }}>
            <button name='calender_addevent' style={styles.signinButton} onClick={addevent}>
              Add Event
            </button>
          </div> 
          </div>
             </tbody>
        </table>
        </item>
       
  
  </Grid>
  </div> 
  
  <div className="container" style={{width:1050,height:630,textAlign:'',justifyContent:'',marginLeft:590,margin:30,border:'solid',borderColor:'#8275a5', boxShadow: '1px 1px 20px 5px #C9C9C9'}}>

  <p style={{fontSize:20,fontFamily:'cursive',margin:1,textAlign:'center'}}>Calender</p> 
  <Grid item xs={4}>
    
 
  <item>
    <table className="table" style={{width:700,marginTop:1}}>
       

        <tbody>
        <Calendar name='admincalender' localizer={localizer} events={events}  startAccessor="start" endAccessor="end" style={{marginBlock:4,height: 550,width:990, margin: "40px"}} />
      
        </tbody>
        </table>
        </item>


 
  </Grid>
  </div>
</Grid>
  




       
        </>
    );
}

const styles = {
    container: {
      width: 400,
      height: 400,
      padding: 8,
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,

     // margin: 'auto',
      //borderColor: '#db0f62',
      borderColor:'#8275a5',
      borderRadius: 1,
      broderWidth: 1,
      borderStyle: '',
    //   boxShadow: '1px 1px 20px 5px #C9C9C9',
      
    },
    signinButton: {
      position: 'relative',
      width: '70%',
      height: 40,
      //backgroundColor: '#db0f62',
      backgroundColor:'#8275a5',
      color: 'white',
      borderRadius: 5,
      border: 'none',
      marginTop: 1
    },
   
  }

export default Calender1;









// import format from "date-fns/format";
// import getDay from "date-fns/getDay";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import React, { useState } from "react";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Sidebar from "../../components/sidebar";
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import { toast } from 'react-toastify'
// import config from '../../config'
// import axios from 'axios'





// const locales = {
//     "en-US": require("date-fns/locale/en-US"),
// };
// const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek,
//     getDay,
//     locales,
// });



// function Calender1() {
//     const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
   
//    const [allEvents, setAllEvents] = useState('');
//    const[eventname,setEventname]=useState('')
//    const[startdate,setStartdate]=useState('')
//    const[enddate,setEnddate]=useState('')



//     function handleAddEvent() {
        
//         for (let i=0; i<allEvents.length; i++){

//             const d1 = new Date (allEvents[i].start)
//             const d2 = new Date(newEvent.start)
//             const d3 = new Date(allEvents[i].end)
//             const d4 = new Date(newEvent.end)


//              if (
//               ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
//                 (d4 <= d3) )
//               )
//             {   
//                 alert("CLASH"); 
//                 break;
//              }
    
//         }
        
        
//         setAllEvents([...allEvents, newEvent]);
//     }
  






//     const addevent = () => {
//         // check if user has really entered any value
//         if (eventname.length === 0) {
//           toast.error('please enter EmpNumber ')
//         } else if (startdate.length === 0) {
//           toast.error('please enter first name')
//         }else if (enddate.length === 0) {
//             toast.error('please enter first name')
//           }
//         else {
//           const body={
//             eventname,
//             startdate,
//             enddate,
            
//           }
//           console.log(body)
//           // make the API call to check if user exists
//           axios
//             .post(config.serverURL + '/calender/add/', body ,{
//               headers: { token: sessionStorage['token'] },
//               })
//             .then((response) => {
//               // get the data returned by server
//               const result = response.data
//               console.log("succesfyllu added employee details ", result)
    
//               // check if user's authentication is successfull
//               if (result['status'] === 'error') {
//                 toast.error('successfully not added event')
//               } else {
//                 toast.success('successfully added event')
//                 //  navigate('/userdetails')
//               }
//             })
//             .catch((error) => {
//               console.log('error')
//               console.log(error)
//             })
//         }
//       }
      

//     return (
//         <>
//         <Sidebar/>
//          <Grid container spacing={1} margin={1}  marginLeft={1}>
//             <div className="table" style={{width:350,height:400,textAlign:'',justifyContent:'center',marginLeft:600,margin:30,border:''}}>
//             <p style={{fontSize:20,fontFamily:'cursive',margin:1,textAlign:'center'}}>Add Event</p> 
//           <Grid item xs={4} >
 
//     <item >
//         <table className="table" style={{width:500}}>
//        <tbody>
//       <div className="col-4" style={styles.container}>
//           <div className='mb-3'>
//             {/* <label>Add Title</label> */}
//             <input
//            placeholder="Add Event"
//               className='form-control-lg'
//               type='text'

//               value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//             />
//           </div>
//       <div className='mb-3'>
//             {/* <label>Start Date</label> */}
//             <DatePicker
//              className='form-control-lg'
//              placeholderText="End Date"
             
//               selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })}
//             />
//           </div>
//           <div className='mb-3'>
//             {/* <label>End Date</label> */}
//             <DatePicker
//              className='form-control-lg'
//             placeholderText="End Date"
//              selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })}
//             />
//           </div>   
//           <div className='mb-3' style={{ marginTop: 10 }}>
//             <button  style={styles.signinButton} onClick={handleAddEvent}>
//               Add Event
//             </button>
//           </div> 
//           </div>
//              </tbody>
//         </table>
//         </item>
       
  
//   </Grid>
//   </div> 
  
//   <div className="container" style={{width:1050,height:630,textAlign:'',justifyContent:'',marginLeft:590,margin:30,border:'solid',borderColor:'#8275a5', boxShadow: '1px 1px 20px 5px #C9C9C9'}}>

//   <p style={{fontSize:20,fontFamily:'cursive',margin:1,textAlign:'center'}}>Calender</p> 
//   <Grid item xs={4}>
    
 
//   <item>
//     <table className="table" style={{width:700,marginTop:1}}>
       

//         <tbody>
//         <Calendar localizer={localizer} events={allEvents}  startAccessor="start" endAccessor="end" style={{marginBlock:4,height: 550,width:990, margin: "40px"}} />
      
//         </tbody>
//         </table>
//         </item>


 
//   </Grid>
//   </div>
// </Grid>
  




       
//         </>
//     );
// }

// const styles = {
//     container: {
//       width: 400,
//       height: 400,
//       padding: 8,
//       position: 'relative',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,

//      // margin: 'auto',
//       //borderColor: '#db0f62',
//       borderColor:'#8275a5',
//       borderRadius: 1,
//       broderWidth: 1,
//       borderStyle: '',
//     //   boxShadow: '1px 1px 20px 5px #C9C9C9',
      
//     },
//     signinButton: {
//       position: 'relative',
//       width: '70%',
//       height: 40,
//       //backgroundColor: '#db0f62',
//       backgroundColor:'#8275a5',
//       color: 'white',
//       borderRadius: 5,
//       border: 'none',
//       marginTop: 1
//     },
   
//   }

// export default Calender1;






