import React from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Link } from "react-router-dom";

function AdminDashboard() {
  const USER_ID = sessionStorage.getItem("userId");

   // *******************************************************
   const [show, setShow] = useState(false);
   const handleClose1 = () => setShow(false);
   const handleShow = () => setShow(true);
   const [id, setid] = useState();
   const [firstName, setFirstName] = useState();
   const [regid, setRegid] = useState();
   const [registration, setRegistration] = useState([]);

   useEffect(() => {
    UserDetails(USER_ID);
  }, [USER_ID]);

  const UserDetails = (USER_ID) => {
    axios
      .get(config.serverURL + "/use/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          // console.log("UserDetails Response from UserId: ")
          //   console.log("then response ",result)
          setid(response.data.data[0].rid); //backend  rid
          setFirstName(response.data.data[0].firstName); //backend firstName
          setRegid(response.data.data[0].rid);
          setRegistration(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };
  // *******************************************************
  // *******************************************************


  const [greeting, setGreeting] = useState('');

  useEffect(() => {
   
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      let newGreeting = '';

      if (currentHour >= 0 && currentHour < 12) {
        newGreeting = 'Good morning !';
      } else if (currentHour >= 12 && currentHour < 16) {
        newGreeting = 'Good afternoon !';
      } else {
        newGreeting = 'Good evening !';
      }

      setGreeting(newGreeting);
    };

    getGreeting();

   
    const intervalId = setInterval(getGreeting, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
<>


<NavBar/>
<SideBar/>


    <div>AdminDashboard</div>

    <div className="card">
    <div class="card-body"> {registration.map((emps) => {
    return (
  <h1>Welcome....!    {greeting}    {emps.Name}</h1>
  );
})}
  </div>
</div>
</>


    )
}

export default AdminDashboard