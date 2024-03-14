





















// **************************************************************************************
// **************************************************************************************


// **************************************************************************************
// **************************************************************************************
// **************************************************************************************




















import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBListGroup, MDBListGroupItem } from 'mdbreact';


import { Box, Table ,Tab,Tabs,Typography, Paper, TextField, Stack,Button, Divider, Card,CardMedia} from '@mui/material';
import PropTypes from 'prop-types';

// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import config from '../../config';
import axios from 'axios';
import moment from "moment";
import { Link} from 'react-router-dom';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import NavBar from '../dashboard/NavBar';
import SideBar from '../dashboard/SideBar';








export default function LeaveBalance() {

  const[firstName,setfirstname]=useState('')
  const[lastName,setlasttname]=useState('')

   const[deptname,setdept]=useState('')
  const[StartDate,setStartDate]=useState('')
  const[EndDate,setEndDate]=useState('')
 
  const[reason,setreason]=useState('')
  const[leaveDays,setleaveday]=useState('')
  const[leaveType,setLeaveType]=useState('')
  const[applyfor,setapplyfor]=useState([])

  const appoptions = ["Full Day", "Half Day"];
  const optionss = ["Earned Leave", "Casual Leave","Special Sick Leave","Maternity Leave","Comp Off","Loss Of Pay","Outdoor Duty"];

  const[appleave,setApplyleave]=useState([])
  const[appleave1,setApplyleave1]=useState([])

  const[reportstatus, setreportstatus] = useState([])
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
  
    // Calculate and set leave days if both Start Date and End Date are selected
    if (newStartDate && EndDate) {
      calculateAndSetLeaveDays(newStartDate, EndDate);
    }
  };
  
  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);
    if (StartDate && newEndDate) {
      if (new Date(newEndDate) < new Date(StartDate)) {
        toast.error('End Date cannot be before Start Date');
      }
    }}

    const calculateAndSetLeaveDays = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDifference = end - start;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
      setleaveday(daysDifference);
    };
  
    const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [registration, setRegistration] = useState([]);









// Define columns for the DataGrid

  return (

    <>
    
    <NavBar/>
      <SideBar/>
      <div>     
<h3>Holiday Calender</h3>
    <div className="card-container">
      {/* Card 1 */}
     <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>JAN 2024</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>26 Jan</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Repubic day</MDBCardText></td>
          </tr>
        
      </div>
    </MDBCardBody>
    
  </MDBCard>
   

      {/* Card 2 */}
      <MDBCard style={{width:350,height:300,marginLeft:2}}>
    <MDBCardBody>
      <MDBCardTitle>FEB 2024</MDBCardTitle>
    
     
      <div>
        
          
      </div>
      <div style={{textAlign:'center',marginTop:80}}>
      <h6>No Holidays</h6>
      </div>
    </MDBCardBody>
    
  </MDBCard>

      {/* Card 3 */}
      <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>MARCH 2024</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>22 MARCH </MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Gudi Padwa</MDBCardText></td>
          </tr>
          {/* <tr>
              <td><MDBCardText>28 Mon</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Repubic day</MDBCardText></td>
          </tr> */}
      </div>
    </MDBCardBody>
    
  </MDBCard>

      {/* Card 4 */}
      <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>APRIL 2024</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>07 APRIL</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Good Friday</MDBCardText></td>
          </tr>
        
      </div>
    </MDBCardBody>
    
  </MDBCard>

      {/* Card 5 */}
      <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>MAY 2024</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>01 MAY</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Maharashtra Day</MDBCardText></td>
          </tr>
          
      </div>
    </MDBCardBody>
    
  </MDBCard>

      {/* Card 6 */}
      <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>JUN 2024</MDBCardTitle>
    
     
      <div>
          
           <div style={{textAlign:'center',marginTop:80}}>
      <h6>No Holidays</h6>
      </div>
      </div>
      
    </MDBCardBody>
    
  </MDBCard>

      {/* Card 7 */}
      <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>JULY 2024</MDBCardTitle>
    
     
      <div>
          
      </div>
      <div style={{textAlign:'center',marginTop:80}}>
      <h6>No Holidays</h6>
      </div>
    </MDBCardBody>
    
  </MDBCard>

      {/* Card 8 */}
      <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>AUG 2024</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>15 AUG</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Independence day</MDBCardText></td>
          </tr>
        
      </div>
    </MDBCardBody>
    
        </MDBCard>
   



 {/* Card 9 */}
 <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>SEP 2024</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>06 SEP</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Janmashtami   <Link to="/applyleave" style={{color:"red"}} className="btn btn-link">Apply</Link>  </MDBCardText></td>
          </tr>
          <tr>
              <td><MDBCardText>19 SEP</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Ganesh Chaturthi</MDBCardText></td>
          </tr>
          <tr>
              <td><MDBCardText>28 SEP</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>ANANT CHATURDASHI</MDBCardText></td>
          </tr>
      </div>
    </MDBCardBody>
    
  </MDBCard>

      {/* Card 10 */}
      <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>OCT 2024</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>02 OCT</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Gandhi Jayanti</MDBCardText></td>
          </tr>
           <tr>
              <td><MDBCardText>24 OCT</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Dusshera</MDBCardText></td>
          </tr> 
      </div>
    </MDBCardBody>
    
  </MDBCard>

      {/* Card 11 */}
      <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>NOV 2024</MDBCardTitle>
    
     
      <div>
         <tr>
              <td><MDBCardText>13 NOV</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Diwali-1</MDBCardText></td>
          </tr>
          <tr>
              <td><MDBCardText>14 NOV</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Diwali-1</MDBCardText></td>
          </tr> 
          <tr>
              <td><MDBCardText>27 NOV</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Guru Nanaks Birthday   <Link to="/LeaveApply" style={{color:"red"}} className="btn btn-link">Apply</Link></MDBCardText></td>
          </tr> 
          
      </div>
     
    </MDBCardBody>
    
  </MDBCard>
      {/* Card 12 */}
      <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>DEC 2024</MDBCardTitle>
    
     
      <div>
        
      </div>
      <div style={{textAlign:'center',marginTop:80}}>
      <h6>No Holidays</h6>
      </div>
    </MDBCardBody>
    
  </MDBCard>






            </div>





</div>

    
    </>
    
       
   
  )
  }

  const styles = {
    container: {
      width: 100,
     // height: 620,
     height:100,
      padding: 20,
      position: 'relative',
      top: 0,
      left: 0,
      right: 50,
      bottom: 0,
      margin: 'auto',
      
      marginTop:500,
      borderColor: '#102c57',
      borderRadius: 10,
      broderWidth: 1,
      borderStyle: 'solid',
      boxShadow: '1px 1px 20px 5px #C9C9C9',
      display: 'flex',
      justifycontent: 'center',
    },
    signinButton: {
      position: 'relative',
      width: '60%',
      height: 40,
      backgroundColor: '#102c57',
      color: 'white',
      borderRadius: 5,
      border: 'none',
      marginTop: 10,
    },
  }
