


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

export const UserSideBar =
[
  // {
  //   title: "Home",
  //   path: "/Home",
  //   // icon: <AccountCircleIcon/>,
  //   icon: <AiIcons.AiFillHome />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  // },
  {

    title: 'Home',
    path: '/UserDashboard',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

  },
  {
    title: "Reporting",
    path: "/Reporting",
    icon: <FeedIcon />,
  },
  
  // {
  //   title: "Team Details",
  //   // path: '/TeamDetails',
  //   icon: <GroupsIcon />,
  //   // cName: 'sub-nav'
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,


  //   subNav: [
  //     {
  //       title: "Team Details",
  //       path: "/TeamDetails",
  //       icon: <GroupsIcon />,
  //       cName: "sub-nav",

  //       // cName: 'sub-nav'
  //     },
      
  //     {
  //       title: "Team Status",
  //       path: "/TeamStatus",
  //       icon: <GroupsIcon />,
  //       cName: "sub-nav",
  //     },
  //   ],
  // },

  {
    title: "Apply Leave",
    path: "/LeaveApply",
    icon: <FeedIcon />,
  },
  //  {
  //     title: 'Apply Leave',
  //     path: '/applyleave',
  //     icon: <AssignmentLateIcon/>,
  //     iconClosed: <RiIcons.RiArrowDownSFill />,
  //     iconOpened: <RiIcons.RiArrowUpSFill />,
  //   },

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
    title: "Leave Details",

    icon: <CalendarMonthIcon />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Apply Leave",
        path: "/LeaveApply",
        icon: <CalendarMonthIcon />,
        // icon: <AssignmentLateIcon/>,
        cName: "sub-nav",
      },
      {
        title: " Leave Balance",
        path: "/LeaveBalance",
        // icon: <AssignmentLateIcon/>,
        icon: <CalendarMonthIcon />,
        cName: "sub-nav",
      },

      //  {
      //   title: ' Leave Calender',
      //   path: '/LeaveCalender',
      //   // icon: <AssignmentLateIcon/>,
      //   icon:< CalendarMonthIcon/>,
      //   cName: 'sub-nav'
      // },
      {
        title: " Holiday Calender",
        path: "/HolidayCalender",
        icon: <CalendarMonthIcon />,
        cName: "sub-nav",
      },
    ],
  },

  {
    title: "Attendance Info",
    icon: <CalendarMonthIcon />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    // path: '/samplecalender',
    // icon:< CalendarMonthIcon/>

    subNav: [
      {
        title: "Attendance",
        path: "/Attendence",
        icon: <CalendarMonthIcon />,
        // icon: <AssignmentLateIcon/>,
        // cName: 'sub-nav'
      },

      {
        title: "Regularise & Permission",
        path: "/Regularised",
        icon: <CalendarMonthIcon />,
        // icon: <AssignmentLateIcon/>,
        // cName: 'sub-nav'
      },
    ],
  },


];



