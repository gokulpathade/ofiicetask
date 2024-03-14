import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import axios from "axios";

import NavBar from "../dashboard/NavBar";
import SideBar from "../dashboard/SideBar";

export default function LeaveBalance() {
  const USER_ID = sessionStorage.getItem("userId");
  const [balance, setBalance] = useState();

  useEffect(() => {
    ReportingBalance();
  }, []);

  const ReportingBalance = () => {
    console.log("balance hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    axios
      .get(config.serverURL + "/leave/LeaveBalance/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          console.log("leave balance data is here ", result);
          setBalance(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching leave balance:", error);
        toast.error("Error fetching leave balance");
      });
  };




  return (
  
      <div>
        <NavBar />
        <SideBar />
    
        <div className="card-container">
          {balance && balance.length > 0 ? (
            <div key={0} style={{padding:"100px"}} className="card">
              <h6>Earned Leave</h6>
              <span style={{color:"Green"}}>Balance: {balance[0].EarnedLeave}</span>
            </div>
          ) : (
            <div key={0} style={{padding:"100px"}} className="card">
            <p>No balance data available.</p>
         
         </div>
          )}
    




    {balance && balance.length > 0 ? (
            <div key={0} style={{padding:"100px"}} className="card">
              <h6> Casual Leave</h6>
              <span style={{color:"Green"}}>Balance: {balance[0].CasualLeave}</span>
            </div>
          ) : (
            <div key={0} style={{padding:"100px"}} className="card">
            <p>No balance data available.</p>
         
         </div>
          )}
    
        
    {balance && balance.length > 0 ? (
            <div key={0} style={{padding:"100px"}} className="card">
              <h6> Special Sick Leave</h6>
              <span style={{color:"Green"}}>Balance: {balance[0].SpecialSickLeave}</span>
            </div>
          ) : (
            <div key={0} style={{padding:"100px"}} className="card">
            <p>No balance data available.</p>
         
         </div>
          )}
    
        
    {balance && balance.length > 0 ? (
            <div key={0} style={{padding:"100px"}} className="card">
              <h6> CompOff </h6>
              <span style={{color:"Green"}}>Balance: {balance[0].CompOff}</span>
            </div>
          ) : (
            <div key={0} style={{padding:"100px"}} className="card">
            <p>No balance data available.</p>
         
         </div>
          )}
    
        
    {balance && balance.length > 0 ? (
            <div key={0}style={{padding:"100px"}} className="card">
              <h6> Paternity Leave</h6>
              <span style={{color:"Green"}}>Balance: {balance[0].PaternityLeave}</span>
            </div>
          ) : (
            <div key={0} style={{padding:"100px"}} className="card">
            <p>No balance data available.</p>
         
         </div>
          )}
    
        
    {balance && balance.length > 0 ? (
            <div key={0} style={{padding:"100px"}} className="card">
              <h6> Loss Of Pay Leave</h6>
              <span style={{color:"Green"}}>Balance: {balance[0].LossOfPay}</span>
            </div>
          ) : (
            <div key={0} style={{padding:"100px"}} className="card">
            <p>No balance data available.</p>
         
         </div>
          )}
    
        
    {balance && balance.length > 0 ? (
            <div key={0} style={{padding:"100px"}} className="card">
              <h6> Outdoor Duty </h6>
              <span style={{color:"Green"}}>Balance: {balance[0].OutdoorDuty}</span>
            </div>
          ) : (
          
            <div key={0} style={{padding:"100px"}} className="card">
             <p>No balance data available.</p>
          
          </div>
          )}
    
        
         
  
          {balance && balance.length > 0 ? (
            <div key={0} style={{padding:"100px"}} className="card">
              <h6>Restricted Holiday  Leave</h6>
              <span style={{color:"Green"}}>Balance: {balance[0].RestrictedHoliday}</span>
            </div>
          ) : (
            <div key={0} style={{padding:"100px"}} className="card">
            <p>No balance data available.</p>
         
         </div>          )}
    
        



          {/* Repeat similar structure for other cards */}
        </div>
      </div>
   
    
   





    // <div>
    //   <NavBar />
    //   <SideBar />

     
    //   {balance.map((balance) => {
    //             <div key={i} className="card">
    //                <span>balance: {balance.EarnedLeave}</span>
    //                 return (
    //                   <div className="card-container">
    //                   {/* Card 1 */}
    //                   <div className="card">
    //                     <h6>Earned Leave</h6>
    //                     <span>balance: {balance.EarnedLeave}</span>
    //                   </div>
              
    //                   {/* Card 2 */}
    //                   <div className="card">
    //                     <h6>Casual Leave</h6>
    //                     <span>balance: {balance.CasualLeave}</span>
    //                   </div>
              
    //                   {/* Card 3 */}
    //                   <div className="card">
    //                     <h6>Special Sick Leave</h6>
    //                     <span>balance: {balance.SpecialSickLeave}</span>
    //                   </div>
              
    //                   {/* Card 4 */}
    //                   <div className="card">
    //                     <h6>Comp Off</h6>
    //                     <span>balance: {balance.CompOff}</span>
    //                   </div>
              
    //                   {/* Card 5 */}
    //                   <div className="card">
    //                     <h6>Paternity Leave</h6>
    //                     <span>balance: {balance.PaternityLeave}</span>
    //                   </div>
              
    //                   {/* Card 6 */}
    //                   <div className="card">
    //                     <h6>Loss Of Pay</h6>
    //                     <span style={{ padding: "10px" }}>balance: {balance.LossOfPay}</span>
    //                   </div>
              
    //                   {/* Card 7 */}
    //                   <div className="card">
    //                     <h6>Outdoor Duty</h6>
    //                     <span>balance: {balance.OutdoorDuty}</span>
    //                   </div>
              
    //                   {/* Card 8 */}
    //                   <div className="card">
    //                     <h6>Restricted Holiday</h6>
    //                     <span>balance: {balance.RestrictedHoliday}</span>
    //                   </div>
    //                 </div>
    //                 );
    //                 </div>
    //               })}
   
    // </div>
  );
}

const styles = {
  container: {
    width: 100,
    // height: 620,
    height: 100,
    padding: 20,
    position: "relative",
    top: 0,
    left: 0,
    right: 50,
    bottom: 0,
    margin: "auto",

    marginTop: 500,
    borderColor: "#102c57",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
    display: "flex",
    justifycontent: "center",
  },
  signinButton: {
    position: "relative",
    width: "60%",
    height: 40,
    backgroundColor: "#102c57",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};
