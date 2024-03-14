


import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import FeedIcon from '@mui/icons-material/Feed';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';




// **************************************************************
// ************************************************************** 
// ONLY FOR USER  
// **************************************************************
// **************************************************************

export const SidebarData2 =
[
  {

    title: 'Profile Details',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    
  },

  {

    title: 'Home',
    path: '/userdashboard',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    
  },

  {
    title: 'Reporting',
    path: '/reporting',
    icon:<FeedIcon/>
   
  },

   {
    title: 'Leave',
   
    icon: <AssignmentLateIcon/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Apply Leave',
        path: '/applyleave',
        // icon: <AssignmentLateIcon/>,
        cName: 'sub-nav'
      },
     
       {
        title: ' Leave Calender',
        path: '/leavecalender',
        // icon:< CalendarMonthIcon/>,
        cName: 'sub-nav'
      },
      {
        title: ' Holiday Calender',
        path: '/holidaycalender',
        // icon:< CalendarMonthIcon/>,
        cName: 'sub-nav'
      }
      
    ]
  },
  {
    title: 'Attendance Info',
    path: '/samplecalender',
    icon:< CalendarMonthIcon/>
   
  },


];



