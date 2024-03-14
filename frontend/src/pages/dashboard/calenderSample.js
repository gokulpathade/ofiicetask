import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import moment from "moment";
import { green, red } from "@mui/material/colors";

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

function Calendarsample() {
  const [TodayDate, setTodayDate] = useState("");
  const [status, setStatus] = useState("");
  const [events, setEvents] = useState([]);
  const [eventss, setEventss] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const USER_ID = sessionStorage.getItem("userId");

  function getWeekdaysOffEvents(startDate, endDate) {
    const events = [];
    const currentMonth = moment(startDate).startOf("year");
    const lastDayOfMonth = moment(endDate).endOf("year");

    while (currentMonth.isSameOrBefore(lastDayOfMonth, "day")) {
      if (currentMonth.isoWeekday() === 6 || currentMonth.isoWeekday() === 7) {
        const event = {
          title: "Weekend Off",
          start: currentMonth.format("YYYY-MM-DD"),
          end: currentMonth.format("YYYY-MM-DD"),
          color: "gray",
        };
        events.push(event);
      }
      currentMonth.add(1, "day");
    }

    return events;
  }

  const getEmployeeDetails = (USER_ID, startDate, endDate) => {
    axios
      .get(config.serverURL + "/reporting/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        if (result["status"] === "success") {
          setStatus(response.data.data[0].status);
          let eventsData = [];
          response.data.data.forEach((eventData) => {
            let DATE = moment(eventData.TodayDate).format("YYYY-MM-DD");
            const event = {
              title: eventData.status,
              start: DATE,
              end: DATE,
              allDay: true,
              color: eventData.status === "Present" ? green[500] : red[500],
            };
            eventsData.push(event);
          });

          setEvents(eventsData);

          // Concatenate events, eventss, and weekdays off events
          setAllEvents(events.concat(eventss, getWeekdaysOffEvents(startDate, endDate)));
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        toast.error('Error fetching employee details');
      });
  };

  useEffect(() => {
    // Set your initial start and end dates here
    const startDate = moment().startOf("year").format("YYYY-MM-DD");
    const endDate = moment().endOf("year").format("YYYY-MM-DD");

    getEmployeeDetails(USER_ID, startDate, endDate);
  }, [USER_ID]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.color || "#136086";
    const style = {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };

    return {
      style,
    };
  };

  return (
    <>
      <Sidebar />
      <div className="">
        <h1 style={{ color: "black", textAlign: "center" }}>Calendar</h1>
        <div>{/* Your input and button elements */}</div>
        <div
          className=""
          style={{
            width: 1580,
            height: 600,
            textAlign: "center",
            justifyContent: "center",
            marginLeft: 590,
            margin: 30,
            border: "solid",
            borderColor: "#8275a5",
            boxShadow: "1px 1px 20px 5px #C9C9C9",
          }}
        >
          <Calendar
            name="calendarsample"
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "50px" }}
            eventPropGetter={eventStyleGetter}
          />
        </div>
      </div>
    </>
  );
}

export default Calendarsample;





//is wroking fine
  //user timein and timwout done then show the "present" status message in calender

  // const getEmployeeDetails = (USER_ID) => {
  //   axios
  //     .get(config.serverURL + "/registration1/specificdata/" + USER_ID, {
  //       headers: { token: sessionStorage["token"] },
  //     })
  //     .then((response) => {
  //       const result = response.data;
  //       if (result["status"] === "success") {
  //         console.log("result calender : ", result);
  //         setStatus(response.data.data[0].status);
  //         let eventsData = [];
  //         response.data.data.forEach((eventData) => {
  //           let DATE = moment(eventData.TodayDate).format("YYYY-MM-DD");
  //           const event = {
  //             title: eventData.status,
  //             start: DATE,
  //             end: DATE,
  //             allDay: true,
  //             color:
  //               eventData.status === "Present"
  //                 ? "green"
  //                 : "absent"
  //                 ? "red"
  //                 : "",
  //           };
  //           eventsData.push(event);
  //         });

  //         setEvents(eventsData);
  //       } else {
  //         toast.error(result["error"]);
  //       }
  //     })
  //     .catch((error) => {
  //       //  toast.error('Error fetching employee details');
  //     });
  // };

  // //dummytry
  // const getEmployeeDetails1 = (USER_ID) => {
  //   axios
  //     .get(config.serverURL + "/calender/status/" + USER_ID, {
  //       headers: { token: sessionStorage["token"] },
  //     })
  //     .then((response) => {
  //       const result = response.data;
  //       if (result["status"] === "success") {
  //         console.log("result calender : ", result);
  //         setApplystatus(response.data.data[0].applyStatus);
  //         let eventsData = [];
  //         response.data.data.forEach((eventData) => {
  //           let DATE = moment(eventData.StartDate).format("YYYY-MM-DD");
  //           let DATE1 = moment(eventData.EndDate).format("YYYY-MM-DD");
  //           //  let onLeave=eventData.applyStatus
  //           const event = {
  //             title:
  //               eventData.applyStatus === "approved"
  //                 ? "On Leave"
  //                 : eventData.applyStatus,
  //             start: DATE,
  //             end: DATE1,
  //             allDay: true,
  //             color: eventData.applyStatus === "approved" ? "red" : "",
  //           };
  //           eventsData.push(event);
  //         });

  //         setapplyevent(eventsData);
  //       } else {
  //         toast.error(result["error"]);
  //       }
  //     })
  //     .catch((error) => {
  //       // toast.error('Error fetching employee details');
  //     });
  // };

  // const getcalender = () => {
  //   axios
  //     .get(config.serverURL + "/calender/gett/", {
  //       headers: { token: sessionStorage["token"] },
  //     })
  //     .then((response) => {
  //       const result = response.data;
  //       if (result["status"] === "success") {
  //         console.log("result calender : ", result);
  //         let eventsData = [];
  //         response.data.data.forEach((eventData) => {
  //           let title = eventData.eventname;
  //           let start = moment(eventData.startdate).format("YYYY-MM-DD");
  //           let end = moment(eventData.enddate).format("YYYY-MM-DD");
  //           const event = {
  //             title,
  //             start,
  //             end,
  //           };
  //           eventsData.push(event);
  //         });

  //         // Get weekends off events and add them to the existing events
  //         const weekendsOffEvents = getWeekdaysOffEvents(startDate, endDate); // Pass your calendar start and end date
  //         eventsData.push(...weekendsOffEvents);

  //         // Set all events in the state
  //         setEventss(eventsData);
  //       } else {
  //         toast.error(result["error"]);
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error("Error fetching employee details");
  //     });
  // };