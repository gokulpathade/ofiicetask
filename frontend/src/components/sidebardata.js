


import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

//for admin

// **************************************************************
// ************************************************************** 
// ONLY FOR ADMIN
// **************************************************************
// **************************************************************

export const SidebarData =
[
  

  {
    title: 'Home',
    path: '/admindashboard',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    
  },
  {
    title: 'Employee',
    path: '/userdetails',
    icon: <PersonAddIcon/>,
   

    
  },

  // {
  //   title: 'Employee',
  //   // path: '/addemployee',
  //   icon: <PersonAddIcon/>,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

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
  // },
  {
    title: 'Department',
    path: '/manage',
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
  {
    title: 'Calender',
    path: '/cal',
    icon: < CalendarMonthIcon/>
  },
  {
    title: 'Employee Status',
    path: '/employeeStatus',
    icon: <IoIcons.IoMdPeople />
  },
  // {
  //   title: 'Department',

  //   icon: <FaIcons.FaEnvelopeOpenText />,

  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: 'Add Department',
  //       path: '/adddepartment',
  //       icon: <IoIcons.IoIosPaper />
  //     },
  //     {
  //       title: 'Manage Department',
  //       path: '/manage',
  //       icon: <ModeEditIcon/>,
  //     }
  //   ]
  // },
  
 
];



