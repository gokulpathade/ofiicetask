// import React from 'react'

// function Calender() {
//   return (
//     <div>Calender</div>
//   )
// }

// export default Calender



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
// import SideBar from '../../components/SideBar'
import SideBar from "../dashboard/SideBar";
import moment from 'moment';
import { green } from "@mui/material/colors";
import NavBar from "../dashboard/NavBar";


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


// import React, { useState, useEffect } from 'react';
import { momentLocalizer } from 'react-big-calendar';

// import moment from 'moment';




const localizer = momentLocalizer(moment);

const fetchEmployeeData = async () => {
  // You need to implement your API endpoint to fetch employee data from the backend
  const response = await fetch('/api/employee-data');
  const data = await response.json();
  return data;
};





function Calender() {
  const [TodayDate, setTodayDate] = useState('');
  const [status, setStatus] = useState('');
  const [events, setEvents] = useState([]);
  const [eventss, setEventss] = useState([]);
  //const [weekendOffDates, setWeekendOffDates] = useState([]);
  const USER_ID = sessionStorage.getItem("userId");
  //is wroking fine
  //user timein and timwout done then show the "present" status message in calender
  





  useEffect(() => {
    getcalender()
    getEmployeeDetails(USER_ID)
    fetchEmployeeData();
  }, []);



  // const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const employeeData = await fetchEmployeeData();

      // Process employee data and convert it to events for the calendar
      const calendarEvents = employeeData.map((employee) => {
        // Assuming your backend provides fields like "startTime" and "endTime"
        const { startTime, endTime, morningPresent, afternoonPresent } = employee;

        // Convert start and end times to JavaScript Date objects
        const start = new Date(startTime);
        const end = new Date(endTime);

        // Calculate total working hours
        const totalWorkingHours = (end - start) / (60 * 60 * 1000);

        // Determine the status based on working hours and session presence
        let status;
        if (totalWorkingHours >= 9.3) {
          status = 'P';
        } else if (morningPresent && afternoonPresent) {
          status = 'P : A';
        } else {
          status = 'A : P';
        }

        return {
          title: `Employee ${employee.id} - ${status}`,
          start,
          end,
        };
      });

      setEvents(calendarEvents);
    };

    fetchData();
  }, []);













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
    <NavBar/>
    
      <SideBar />
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40vh',
      }}
    >
      <div style={{ width: '80%', maxWidth: '1200px' }}>
      <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day']}
          defaultView="month"
          selectable
          onSelectEvent={(event) => alert(`Status: ${event.title}`)}
        />
    </div>
    </div>
    </>
  );
}
export default Calender;

















