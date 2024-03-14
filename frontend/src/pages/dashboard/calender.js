import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState,useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import config from '../../config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar'
import moment from 'moment';
import { green } from "@mui/material/colors";


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
function Calender() {
  const [TodayDate, setTodayDate] = useState('');
  const [status, setStatus] = useState('');
  const [events, setEvents] = useState([]);
  const [eventss, setEventss] = useState([]);
  //const [weekendOffDates, setWeekendOffDates] = useState([]);
  const USER_ID = sessionStorage.getItem("userId");
  //is wroking fine
  //user timein and timwout done then show the "present" status message in calender
  
  const getEmployeeDetails = (USER_ID) => {
    axios
      .get(config.serverURL + '/registration1/specificdata/' + USER_ID, {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data;
        if (result['status'] === 'success') {
          console.log("result calender : ", result);
          setStatus(response.data.data[0].status);
          let eventsData = [];
          response.data.data.forEach((eventData) => {
            let DATE = moment(eventData.TodayDate).format('YYYY-MM-DD');
            const event = {
              title: eventData.status,
              start: DATE,
              end: DATE,
              color: eventData.status === 'present' ? 'green' : 'absent' ? 'red' : '',
            };
            eventsData.push(event);
          });
        
         setEvents(eventsData);
        } else {
          toast.error(result['error']);
        }
      })
      .catch((error) => {
        toast.error('Error fetching employee details');
      });
  };








  // function isWeekend(date) {
  //   const day = date.getDay();
  //   return day === 0 || day === 6; // Sunday (0) or Saturday (6)
  // }
  




  

// if u done timeIn saturday and sunday does not status update not showing on calender 
  // const getEmployeeDetails = (USER_ID) => {
  //   axios
  //     .get(config.serverURL + '/registration1/specificdata/' + USER_ID, {
  //       headers: { token: sessionStorage['token'] },
  //     })
  //     .then((response) => {
  //       const result = response.data;
  //       if (result['status'] === 'success') {
  //         console.log("result calender : ", result);
  //         setStatus(response.data.data[0].status);
  //         let eventsData = [];
  
  //         // Loop through the events data and create event objects
  //         response.data.data.forEach((eventData) => {
  //           let DATE = moment(eventData.TodayDate).format('YYYY-MM-DD');
  
  //           // Check if the DATE is not a weekend (Saturday or Sunday)
  //           if (!isWeekend(new Date(DATE))) {
  //             const event = {
  //               title: eventData.status,
  //               start: DATE,
  //               end: DATE,
  //               color: eventData.status === 'present' ? 'green' : 'absent' ? 'red' : '',
  //             };
  //             eventsData.push(event);
  //           }
  //         });
  
  //         // Set all events in the state
  //         setEvents(eventsData);
  
  //       } else {
  //         toast.error(result['error']);
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error('Error fetching employee details');
  //     });
  // };
  

//it shows "weekend" message once user done TimeIn and Timeout that day saturday and sunday
  // const getEmployeeDetails = (USER_ID) => {
  //   axios
  //     .get(config.serverURL + '/registration1/specificdata/' + USER_ID, {
  //       headers: { token: sessionStorage['token'] },
  //     })
  //     .then((response) => {
  //       const result = response.data;
  //       if (result['status'] === 'success') {
  //         console.log("result calender : ", result);
  //         setStatus(response.data.data[0].status);
  //         let eventsData = [];
  
  //         // Loop through the events data and create event objects
  //         response.data.data.forEach((eventData) => {
  //           let DATE = moment(eventData.TodayDate).format('YYYY-MM-DD');
  
  //           // Check if the DATE is not a weekend (Saturday or Sunday)
  //           if (!isWeekend(new Date(DATE))) {
  //             const event = {
  //               title: eventData.status,
  //               start: DATE,
  //               end: DATE,
  //               color: eventData.status === 'present' ? 'green' : 'absent' ? 'red' : '',
  //             };
  //             eventsData.push(event);
  //           } else {
  //             // Weekend event
  //             const weekendEvent = {
  //               title: "Weekend",
  //               start: DATE,
  //               end: DATE,
  //               color: "gray", // You can choose the color for the weekend event
  //             };
  //             eventsData.push(weekendEvent);
  //           }
  //         });
  
  //         // Set all events in the state
  //         setEvents(eventsData);
  
  //       } else {
  //         toast.error(result['error']);
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error('Error fetching employee details');
  //     });
  // };
  






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
          setEventss(eventsData);
         } else {
          toast.error(result['error']);
        }
      })
      .catch((error) => {
        toast.error('Error fetching employee details');
      });
  };
  



  useEffect(() => {
    getcalender()
    getEmployeeDetails(USER_ID)
  }, []);

  const allevents=events.concat(eventss)

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.color || '#136086'; // Default to red if no color is provided
    const style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
  
    return {
      style,
    };
  };



 
  return (
    <>
      <Sidebar />
      <div className="">
        <h1 style={{ color:'black',textAlign:'center' }}>Calendar</h1>
        <div>{/* Your input and button elements */}</div>
        <div className="" style={{width:1580,height:600,textAlign:'center',justifyContent:'center',marginLeft:'center',margin:30,border:'solid',borderColor:'#8275a5', boxShadow: '1px 1px 20px 5px #C9C9C9'}}>
       <Calendar styles={{}}
        localizer={localizer}
        events={allevents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        eventPropGetter={eventStyleGetter} // Set the event style using eventPropGetter
        />
      </div>
      </div>
    </>
  );
}
export default Calender;

















