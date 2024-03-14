

import Sidebar from "../../components/sidebar";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

import del from '../../images/delete.png'
import * as fd from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { user1 } from "../../slices/authSlice";
import axios from 'axios'
import config from '../../config'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactRoundedImage from 'react-rounded-image'
import Grid from '@mui/material/Grid';
  import * as ai from 'react-icons/ai'
  import moment from "moment";
  import { MDBBadge,MDBTable} from 'mdb-react-ui-kit';
  import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
  const Home = () => {
    const [registration, setRegistration] = useState([])
    const[appleave,setApplyleave]=useState([])
    const[reportstatus, setreportstatus] = useState([])
    const[applyStatus,setapplystatus]=useState('')
    
    // const[deleave,setdeleteleave]=useState('')
    // const[applyleaves, setapplyleaves] = useState([])
    // const[appids, setappid] = useState('')
  
    // const user = useSelector((state) => state.authSlice.status)
    // console.log("user detials",user);
    const USER_ID = sessionStorage.getItem("userId");
          const Name=sessionStorage.getItem("userName");
          const Email=sessionStorage.getItem("userEmail");
          console.log("Data from UserId in Home Page After Login");

          console.log("id:  ",USER_ID);
          // console.log("Name: ",Name);
          // console.log("Email: ",Email);
          const [show, setShow] = useState(false);

          const handleClose = () => setShow(false);
          const handleShow = () => setShow(true);

          const [show1, setShow1] = useState(false);

          const handleClose1 = () => setShow1(false);
          const handleShow1 = () => setShow1(true);

          const handleDelete = (emps) => {
       
            deletereport(emps.reportid);
          
            console.log("Delete button clicked. emps:", emps);
            handleShow(emps);
          };
          


          
          const handleDelete1 = (emps) => {
            // Assuming `deleteleave` is a function that sends an HTTP DELETE request
            // to delete the leave record by its ID.
            deleteleave(emps.leaveid)
              .then((response) => {
                // Handle the success case, e.g., remove the record from your UI.
                console.log("Leave deleted successfully.");
                handleShow1(emps); // Optionally, perform other actions after deletion.
              })
              .catch((error) => {
                console.error("Error deleting leave: ", error);
              });
          };
          
          

// get the dispatcher
useEffect(() => {
  const showdate1 = new Date();
  const displaytodaysdate1 = showdate1.getFullYear()+ '-' + (showdate1.getMonth()+1)+ '-' + (showdate1.getDate());
  axios
      .get(config.serverURL + '/timereg/' + USER_ID + "/" + displaytodaysdate1,{
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        console.log("resp",response.data.data[0]==undefined);//if there is new timein user then condition is true
        if(response.data.data[0]==undefined){
        }
        else{
          sessionStorage.setItem("time","true")
        }
      })
  // load all the homes created by the user
 
  getuserdetails(USER_ID)
  getapplydetails(USER_ID)
  getreportingdetails(USER_ID)
 
  // getapplyleavedetails()
}, [])

const getuserdetails = (USER_ID) => {
  axios
    .get(config.serverURL + '/use/'+ USER_ID, {
      headers: { token: sessionStorage['token'] },
    })
    .then((response) => {
      const result = response.data

      if (result['status'] === 'success') {
        console.log("get specific details from registartion table  ")
        console.log("then response ",result)
        // set the homes to the state member
        setRegistration(result['data'])
     
        
      } else {
        toast.error(result['error'])
      }handleClose()
   
    })
}





//delete specifc id from applyleave table

const deleteleave = (leaveid) => {

  console.log("delete idddddddddddd : ",leaveid)
  axios
    .delete(config.serverURL + '/applyLeave/deleteleave/' + leaveid, {
      headers: { token: sessionStorage['token'] },
    })
    .then((response) => {
      const result = response.data
      if (result['status'] === 'success') {
        // reload the screen
        // setdeleteleave()
        toast.success("successfully deleted....!!")
        getapplydetails(USER_ID)
        handleClose1()
        
      } else {
        toast.error(result['error'])
      }
    })
}




//delete report id from reporting table

const deletereport = (reporting_id) => {

  console.log("delete idddddddddddd : ",reporting_id)
  axios
    .delete(config.serverURL + '/reporting/deletreport/' + reporting_id, {
      headers: { token: sessionStorage['token'] },
    })
    .then((response) => {
      const result = response.data
      if (result['status'] === 'success') {
        // reload the screen
        // setdeleteleave()
        toast.success("successfully deleted....!!")
        getreportingdetails(USER_ID)
        handleClose()
        
      } else {
        toast.error(result['error'])
      }

       } )
}


//get apply leave details from applyleave table
const getapplydetails = (USER_ID) => {
  axios
    .get(config.serverURL + '/applyLeave/'+ USER_ID, {
      headers: { token: sessionStorage['token'] },
    })
    .then((response) => {
      const result = response.data

      if (result['status'] === 'success') {
        console.log("get specific details from applyleave table ")
        console.log("then response ",result)
        // setapplystatus(response.data.data)
        console.log("oooooooooooo",response.data.data)

        // set the homes to the state member
        setApplyleave(result['data'])
      } else {
        toast.error(result['error'])
      }
    })
}











//get specific recored from reporting
const getreportingdetails = (USER_ID) => {
  console.log("reporting id : ", USER_ID)
  axios
    .get(config.serverURL + '/reporting/'+ USER_ID, {
      headers: { token: sessionStorage['token'] }, 
    })
    .then((response) => {
      const result = response.data

      if (result['status'] === 'success') {
        console.log("get specific details from reporting table ")
        console.log("then response ",result)
        // setapplystatus(response.data.data)
      //  console.log("Reporting details from  ppppppppppp",response.data.data)

        setreportstatus(result['data'])
      } else {
        toast.error(result['error'])
      }
    })
}


// used to navigate
//const navigate = useNavigate()
    return(
    
      <>
      <Sidebar/>
     
      <div className='Home'   style={{display:'',marginTop:9}} >





</div>
  {/* ***************************************************************************************** */}
  {/* ***************************************************************************************** */}


  {/* ***************************************************************************************** */}
  {/* ***************************************************************************************** */}
 
  {/* ***************************************************************************************** */}

{/* <div style={{border:'solid',marginLeft:30,marginRight:30,marginBottom:50,backgroundColor:'',margin:1}}> */}
  
        <Grid container spacing={1} margin={1}  >
            <div className="table-responsive" style={{width:720,height:400,textAlign:'center',justifyContent:'center',marginLeft:600,margin:30}}>
            <p style={{fontSize:20,fontFamily:'cursive',margin:1,textAlign:'center'}}>User Leave Status</p> 
  <Grid item xs={4} >
 
    <item ><table className="table table-striped table-bordered" style={{width:700}}>
      {/* style={{width:700,height:800}} */}
        <thead style={{backgroundColor:'#8275a5',color:'white'}}>
        <th style={{}}>Emp No</th>
           <th>Start Date</th>  
           <th>End Date</th>  
            <th>Leave Type</th>
            <th>Status</th>
            <th>Action</th>
        </thead>

        <tbody>
          
           
        {appleave.map((emps) => {
               return (
              <tr>
                <td>{emps.empno}</td>
                <td>{moment(emps.StartDate).format('YYYY-MM-DD')}</td>
                
                <td>{moment(emps.EndDate).format('YYYY-MM-DD')}</td>
                <td>{emps.leavetype}</td>
                {/* <td style={{color : emps.applyStatus==='pending'?  'orange':emps.applyStatus=='rejected'? 'red' : emps.applyStatus=='approved'? 'green':''}}>{emps.applyStatus}</td>    */}
                <td>
                <MDBBadge color={emps.applyStatus === 'pending' ? 'warning' : emps.applyStatus === 'rejected' ? 'danger' : emps.applyStatus === 'approved' ? 'success' : 'primary'} pill>
                {emps.applyStatus}
            </MDBBadge>
            </td>   
        
                  {/* <td> <button
                     onClick={() => deleteleave(emps.appids)}
                    style={styles.button}
                    className='btn btn-sm btn-danger'>
                    Delete
                  </button> </td>  */}

<td style={{fontSize:10}}> <button  name='deleteleave'
                    //  onClick={() => deleteleave(emps.leaveid)}
                    onClick={() => handleShow1(emps)}
                    style={{marginRight:10,border:'none' ,backgroundColor:'#e3e0eb'}}
                   >
                    <ai.AiFillDelete size={'30px'} color="red" />
                     {/* <img src={del}  style={{marginRight:2,height:'25px',width:'30px',backgroundColor:'#e3e0eb'}} />  */}
                  </button>
                  <Modal show={show1} onHide={handleClose1} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Delete</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose1}>
        Close
      </Button>
      <Button variant="danger" onClick={() => handleDelete1(emps)}> 
        Delete
      </Button>
    </Modal.Footer>
  </Modal> </td> 
                </tr>
            )
          })}
            
         
           
           
           
            

        </tbody>
        </table>
        </item>
       
  
  </Grid>
  </div> 
  
  <div className="table-responsive" style={{width:720,height:400,textAlign:'center',justifyContent:'center',marginLeft:600,margin:30}}>

  <p style={{fontSize:20,fontFamily:'cursive',margin:1,textAlign:'center'}}>User Reporting Status</p> 
  <Grid item xs={4}>

    
 
  <item>
   
  <table className="table table-striped table-bordered" style={{width:700}}>
      <thead style={{fontWeight:'bold',backgroundColor:'#8275a5',color:'white'}}>
        <td style={{fontWeight:'bold'}}>Emp no</td>
        <td>In Time</td>
        <td>Out Time</td>
        <td>Date</td>
        <td>Reason</td>
        {/* <td>Status</td>
        <td>Action</td> */}
      </thead>
      <tbody>
        {reportstatus.map((emps) => {

          return (
            <tr key={emps.reporting_id}>
              <td>{emps.empno}</td>
              <td>{emps.timeIn}</td>
              <td>{emps.timeOut}</td>
              <td>{moment(emps.date).format('YYYY-MM-DD')}</td>
              <td>{emps.reason}</td>
              {/* <td>
                <MDBBadge color={emps.status === 'Pending' ? 'warning' : emps.status === 'Rejected' ? 'danger' : emps.status === 'Approved' ? 'success' : 'primary'} pill>
                  {emps.status}
                </MDBBadge>
              </td> */}
            
            </tr>
          )
        })}
      </tbody>
    </table>
        </item>


 
  </Grid>
  </div>
</Grid>
{/* </div> */}




</>

    );
  }

  const styles = {
    h3: {
      textAlign: 'center',
      margin: 20,
    },
    button: {
      marginRight: 10,
      
    },
    b:{
      color:'red'
    }
  }
  export default Home







  // td this code is use for when need action then it will use table data 


//   <td style={{fontSize:10}}>
//   {/* <button
//     name='deletereport'
//     onClick={() => handleShow(emps)}
//     style={{marginRight:10,border:'none',backgroundColor:'#e3e0eb'}}
//   >
//     <ai.AiFillDelete size={'30px'} color="red" />
//   </button> */}
//   <Modal show={show} onHide={handleClose} animation={false}>
// <Modal.Header closeButton>
// <Modal.Title>Confirm Delete</Modal.Title>
// </Modal.Header>
// <Modal.Body>Are you sure you want to delete?</Modal.Body>
// <Modal.Footer>
// {/* <Button variant="secondary" onClick={handleClose}>
// Close
// </Button>
// <Button variant="danger" onClick={() => handleDelete(emps)}> 
// Delete
// </Button> */}
// </Modal.Footer>
// </Modal>
// </td>