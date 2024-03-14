


import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import GroupsIcon from '@mui/icons-material/Groups';
import AddHomeWorkSharpIcon from '@mui/icons-material/AddHomeWorkSharp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteSharpIcon from '@mui/icons-material/EventNoteSharp';
//for admin

// **************************************************************
// ************************************************************** 
// ONLY FOR ADMIN
// **************************************************************
// **************************************************************

export const AdminSideBar =
[
  

  {
    title: 'Home',
    path: '/AdminDashboard',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    
  },


  {
    title: 'Add Employee',
    path: '/AddEmployee',
    icon: <PersonAddIcon/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: 'Add Employee',
  //       path: '/addemployee',
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     //its working fine
  //     // {
  //     //   title: 'edit Employee',
  //     //   path: '/manageemp',
  //     //   icon: <IoIcons.IoIosPaper />, // employee tables data showing here
  //     //   cName: 'sub-nav'
  //     // },
  //     {
  //       title: 'Manage Employee',
  //       path: '/userdetails',
  //       icon: <ModeEditIcon/>,
  //       cName: 'sub-nav'
  //     }
      
  //   ]
  },
  {
    title: 'Add Department',
    path: '/AddDepartment',
    icon: <AddHomeWorkSharpIcon />,
  },
  // {
  //   title: 'Calender',
  //   path: '/Calender',
  //   icon: < CalendarMonthIcon/>
  // },
  {
    title: 'Add Events',
    path: '/AddEvents',
    icon: < EventNoteSharpIcon/>
  },
  // {
  //   title: 'Holiday Calender',
  //   path: '/HolidayCalender',
  //   icon: < CalendarMonthIcon/>
  // },

  // {
  //   title: 'Employee Details',
  //   path: '/EmployeeDetails',
  //   icon: <GroupsIcon/>,
   
  // },

  // {
  //   title: 'Employee Reporting Status',
  //   path: '/EmployeeReporting ',
  //   icon: <GroupsIcon />
  // },
  
  
 
];



