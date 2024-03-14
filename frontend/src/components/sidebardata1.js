


import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import FeedIcon from '@mui/icons-material/Feed';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


// **************************************************************
// ************************************************************** 
// ONLY FOR MANAGER
// **************************************************************
// **************************************************************

//for Manger here
export const SidebarData1 =
[
  

  {

    title: 'Profile Details',
    path: '/home',
    icon: <AccountCircleIcon/>,
    // icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    
  },
 
  {

    title: 'Home',
    path: '/managerdashboard',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    
  },
  {
    title: 'Team Details',
    path: '/Details',
    icon: <GroupsIcon/>,
    cName: 'sub-nav'
  },
 
  {
    title: 'Leave Request',
    path: '/reporting',
    icon:<FeedIcon/>
   
  },
//  {
//     title: 'Apply Leave',
//     path: '/applyleave',
//     icon: <AssignmentLateIcon/>,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//   },
  {
    title: 'Reporting',
    path: '/reporting',
    icon:<FeedIcon/>
   
  },
 
  //  {
  //   title: ' Leave Calender',
  //   path: '/leavecalender',
  //   icon:< CalendarMonthIcon/>
  // },
  // {
  //   title: ' Holiday Calender',
  //   path: '/holidaycalender',
  //   icon:< CalendarMonthIcon/>
  // },
   
  {
    title: 'Leave',
   
    icon: <AssignmentLateIcon/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Apply Leave',
        path: '/applyleave',
        icon: <AssignmentLateIcon/>,
        // icon: <AssignmentLateIcon/>,
        cName: 'sub-nav'
      },
      {
        title: ' Leave Balance',
        path: '/LeaveBalance',
        icon: <AssignmentLateIcon/>,
        // icon:< CalendarMonthIcon/>,
        cName: 'sub-nav'
      },
     
       {
        title: ' Leave Calender',
        path: '/leavecalender',
        icon: <AssignmentLateIcon/>,
        // icon:< CalendarMonthIcon/>,
        cName: 'sub-nav'
      },
      {
        title: ' Holiday Calender',
        path: '/holidaycalender',
        icon:< CalendarMonthIcon/>,
        cName: 'sub-nav'
      }
      
    ]
  },

  {
    title: 'Attendance Info',
    icon:< CalendarMonthIcon/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    // path: '/samplecalender',
    // icon:< CalendarMonthIcon/>
   
    subNav: [
      {
        title: 'Attendance',
        path: '/samplecalender',
        icon:< CalendarMonthIcon/>
        // icon: <AssignmentLateIcon/>,
        // cName: 'sub-nav'
      },
     
      
      {
        title: 'Regularise & Permission',
        path: '/Regularised',
        icon:< CalendarMonthIcon/>
        // icon: <AssignmentLateIcon/>,
        // cName: 'sub-nav'
      }
      
    ]






  },

 
];



