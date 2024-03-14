import React from 'react'
import { useState,useEffect } from 'react'

import { toast } from 'react-toastify'
import config from '../../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar'




const AttendanceDetails = () => {


  const[id,setid]=useState()
 const[firstName,setFirstName]=useState()
 
 const[timein,settimein]=useState()
const [TimeIn, setTimeIn] = useState('')
 const[TimeOut,setTimeOut] = useState('')
 



  sessionStorage.setItem("timeout",TimeOut)
  

 const USER_ID = sessionStorage.getItem("userId");
 const Name=sessionStorage.getItem("userName");
 const Email=sessionStorage.getItem("userEmail");
 const timeout=sessionStorage.getItem("timeout")
console.log("Data from UserId in Attendetails Page After Login");


       console.log("id:  ",USER_ID);
       console.log("Name: ",Name);
       console.log("Email: ",Email);
       console.log("time in ",timein)
       console.log("Time out: ",timeout);


 useEffect(() => {
    getuserdetails(USER_ID)
}, [])




 const disbleit=timein
 const navigate = useNavigate()



  const timeoutbutton=(e)=>{
    e.currentTarget.disabled=true;
     const today = new Date();
     const curTimee = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
     console.log(curTimee);
     setTimeOut(curTimee);
}

  const timeIn = (USER_ID) => {
    sessionStorage.setItem("timeout","true")
    
    const showdate1 = new Date();
    const displaytodaysdate1 = showdate1.getFullYear()+ '-' + (showdate1.getMonth()+1)+ '-' + showdate1.getDate();
   console.log("inside from timeIn :",displaytodaysdate1);
   console.log("id from timeIn :",USER_ID)


    if (TimeOut.length === 0) {
      toast.error('please enter TimeOut')
    }  else{
        
        const body={
            TimeOut
        }
        
        body.TimeOut=TimeOut

      console.log("body TimeOut : ",body)
      axios
        .put(config.serverURL + '/timereg/' + USER_ID + "/" + displaytodaysdate1,body,{
            headers: { token: sessionStorage['token'] },
          
         })
        .then((response) => {
        
          const result = response.data
          console.log("response from timeIn put : ",result)

       
          if (result['status'] === 'error') {
            toast.error('not insertd')
          } else {
            toast.success('successfully inserted')

          
             navigate('/inout')
          }
        })
        .catch((error) => {
          console.log('error')
          console.log(error)
        })
    }
  }


  const getuserdetails = (USER_ID) => {
    const showdate1 = new Date();
    const displaytodaysdate1 = showdate1.getFullYear()+ '-' + (showdate1.getMonth()+1)+ '-' + showdate1.getDate();
   console.log("inside from getuserdetails: ",displaytodaysdate1);
   console.log("id from getuserdetails : ",USER_ID)
    axios
      .get(config.serverURL + '/timereg/' + USER_ID + "/" + displaytodaysdate1,{
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
      
        console.log(response.data.data)
  
        if (result['status'] === 'success') {
         
          console.log("then response with timein :",result)
           setid(response.data.data[0].rid) //backend  rid
           setFirstName(response.data.data[0].firstName)
           settimein(response.data.data[0].TimeIn)

       
        } else {
          toast.error(result['error'])
        }
      })
  }






    return (
      
      <div>
        <Sidebar/>
 <div style={{ marginTop: 100 }}>
      <div style={styles.container}>

       <div className='mb-3'> 
    

 <label>User Id</label>
          <input  value={id} name='empid' id='id_empid'
            onChange={(event) => {
                setid(event.target.value)
            }}
            className='form-control'
            type='text' readOnly
          />
      </div> 
       <div className='mb-3'>
      <label>First Name</label>
          <input  value={firstName} name='FirstNAME' id='id_FirstNAME'
            onChange={(event) => {
                setFirstName(event.target.value)
            }}
            className='form-control'
            type='text' readOnly
          />
      </div>
      <div className='mb-3'>
      <label>Time In</label>
      <input  value={timein} onChange={(event) => {
                setTimeIn(event.target.value)
            }}
            className='form-control'
            type='text' readOnly
            name='TIMEIN'
            id='id_TIMEIN'
          />
        </div>
      
        <div className='mb-3'>
          <label>Time Out</label>
          <input  value={TimeOut}
            onChange={(event) => {
                setTimeOut(event.target.value)
                
            }}
            className='form-control'
            type='text' 
            name='TIMEOUT'
            id='id_TIMEOUT'
          />
        </div>


          <div className='mb-3' style={{ marginTop: 40 }}>


        
          <button name='TIMEOUT_btn' id='id_TIMEOUT_btn' onClick={(e)=>timeoutbutton(e)} className="btn btn-success"   disabled={disbleit ? false:true} >
            TimeOUT
          </button>

        </div> 
     <div className='mb-3' style={{ marginTop: 40 }}>
         <button name='submit_btn' id='id_submit_btn' onClick={()=>timeIn(USER_ID)} style={styles.signinButton}>
            submit
          </button> 
    </div> 
      
      </div>
    </div>
     </div>
    )
  }
  const styles = {
    container: {
      width: 400,
      height: 620,
      padding: 20,
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto',
      borderColor: '#8275a5',
      borderRadius: 10,
      broderWidth: 1,
      borderStyle: 'solid',
      boxShadow: '1px 1px 20px 5px #C9C9C9',
    },
    signinButton: {
      position: 'relative',
      width: '100%',
      height: 40,
      backgroundColor: '#8275a5',
      color: 'white',
      borderRadius: 5,
      border: 'none',
      marginTop: 10,
    },
  }
  
  export default AttendanceDetails


