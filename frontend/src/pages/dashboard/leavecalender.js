

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState,useEffect } from "react";
import { startOfDay, endOfDay, addDays } from 'date-fns';
import { dateFnsLocalizer} from "react-big-calendar";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import "react-datepicker/dist/react-datepicker.css";

import Sidebar from '../../components/sidebar'

// import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { Modal } from "react-bootstrap";
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
                title: 'Independence Day',
                start: new Date('2023-08-15'),
                end: new Date('2023-08-15'),
                color:'purple',
                info:'Celebration of India\'s Independence.',
            },
            {
              title: 'Janmashtami',
              start: new Date('2023-09-06'), 
              end: new Date('2023-09-06'),
              color: 'orange', 
            },
            {
                title: 'Ganesh Chaturthi',
                start: new Date('2023-09-19'), 
                end: new Date('2023-09-19'),
                color: 'purple', 
              },
              {
                title: 'ANANT CHATURDASHI ',
                start: new Date('2023-09-28'), 
                end: new Date('2023-09-28'),
                color: 'purple', 
              },
              
            {
                title: 'Gandhi Jayanti ',
                start: new Date('2023-10-02'), 
                end: new Date('2023-10-02'),
                color: 'purple', 
              },
              {
                title: 'Dusshera ',
                start: new Date('2023-10-24'), 
                end: new Date('2023-10-24'),
                color: 'purple', 
              },
              {
                title: 'Diwali-1',
                start: new Date('2023-11-13'), 
                end: new Date('2023-11-13'),
                color: 'purple', 
              },
              {
                title: 'Diwali-2',
                start: new Date('2023-11-14'), 
                end: new Date('2023-11-14'),
                color: 'purple', 
              },
              {
                title: 'Guru Nanaks Birthday',
                start: new Date('2023-11-27'), 
                end: new Date('2023-11-27'),
                color: 'orange',
              
              },
    
  ];

  const handleEventClick = (clickedEvent) => {
    const event = events.find((event) =>
      event.start.toDateString() === clickedEvent.start.toDateString()
    );
    setSelectedEvent(event);
  };
 

  

  


const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.color || '#136086'; 
   
        const style = {
         backgroundColor,
         borderRadius: '50px',
           opacity: 0.8,
           color: 'white',
           border: '0px',
          display: 'block',
         
    };
  
    const circleStyle = {
      backgroundColor,
      borderRadius: '50%',
      width: '100%', // Make the circle fill the container
      height: '100%',
      opacity: 0.8,
   
    };
  
    return {
      style,
      children: <div style={circleStyle}></div>, // Render the colored circle
    };
  };
  
  
  return (
    <>
    <Sidebar/>

    <div style={{ height: 500,width:'90%',marginLeft:60 ,justifyContent:'center',textAlign:'center', alignItems: 'center'}}>
    <h5>Leave Calender</h5>    
           
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '20px' }}
        onSelectEvent={handleEventClick}
        eventPropGetter={eventStyleGetter}
 
      />
        Restricted Holiday:
      &nbsp; 
    
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-circle-fill"
          viewBox="0 0 16 16"
       
        >
            
             <circle cx="8" cy="8" r="8" style={{color:'orange'}} />
         
        </svg>
        &nbsp;&nbsp;  &nbsp;&nbsp;
       General Holiday:
       &nbsp; 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-circle-fill"
          viewBox="0 0 16 16"
       
        >
            
             <circle cx="8" cy="8" r="8" style={{color:'purple'}} />
         
        </svg>
      <Modal
        show={selectedEvent !== null}
        onHide={() => setSelectedEvent(null)}
      >
        <Modal.Header closeButton>
       {/* we can add title here if need */}
        </Modal.Header>
        <Modal.Body>
        <Modal.Title>  {selectedEvent?.title}</Modal.Title>
      
        {/* {selectedEvent?.info} */}
        </Modal.Body>
      </Modal>
      </div>
  
    </>
  );
}

export default MyCalendar;
