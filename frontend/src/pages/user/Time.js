import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import config from '../../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar'




const Timereg = () => {


  const[id,setid]=useState()
 const[firstName,setFirstName]=useState()
 const[regid,setRegid]=useState()

 
 const [TimeIn, setTimeIn] = useState('')
 const[TimeOut,setTimeOut] = useState('')
 const [TodayDate, setTodayDate] = useState('')




const time=sessionStorage.getItem("time")
console.log("session storage value",time)

 const USER_ID = sessionStorage.getItem("userId");
 const Name=sessionStorage.getItem("userName");
 const Email=sessionStorage.getItem("userEmail");
console.log("Data from UserId in Time Page ");

       console.log("id:  ",USER_ID);
       console.log("Name: ",Name);
       console.log("Email: ",Email);


 useEffect(() => {
  
  
  
  getuserdetails(USER_ID)
  
}, [])
 var showdate=new Date();
 var displaytodaysdate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();

const disbleit=TimeIn
 


  const navigate = useNavigate()

  const timeinbutton=(e)=>{
    e.currentTarget.disabled=true;

    const today = new Date();

   const curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    console.log(curTime);
    setTimeIn(curTime);


  }

  const timein = () => {
    console.log("today",TodayDate)
     let status = "present"
    sessionStorage.setItem("time","true")
    // check if user has really entered any value
    if (TimeIn.length === 0) {
      toast.error('please enter Timein')
    } else if(TodayDate.length===0){
      toast.error('please select date')
    } else{
        console.log("inside else",TimeIn,TodayDate)
        const body={
            TimeIn,TimeOut,TodayDate,regid,status//TimeIn,TimeOut,TodayDate,regid,status
        }
        // body.name=name;
        // body.TimeIn=curTime;
        // body.TodayDate=TodayDate;
      // make the API call to check if user exists
      axios
        .post(config.serverURL + '/timereg/time',body ,{
            headers: { token: sessionStorage['token'] },
          
         })
        .then((response) => {
          // get the data returned by server
          const result = response.data
          console.log("time details user : ",response.data)

          
          // sessionStorage.setItem("time",TimeIn); 
          // const v=sessionStorage.getItem("time")

          // console.log(v)
          

          // check if user's authentication is successfull
          if (result['status'] === 'error') {
            toast.error('not insertd')
          } else {
            toast.success('successfully inserted')
           

            // navigate to the singin page
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
    axios
      .get(config.serverURL + '/use/'+ USER_ID, {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
  
        if (result['status'] === 'success') {
          console.log("UserDetails Response from UserId: ")
          console.log("then response ",result)
          setid(response.data.data[0].rid) //backend  rid
          setFirstName(response.data.data[0].firstName) //backend firstName
          setRegid(response.data.data[0].rid)
        
          // set the homes to the state member
        //  setRegistration(result['data'])
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
          <input  value={id} 
            onChange={(event) => {
                setid(event.target.value)
            }}
            className='form-control'
            type='text' readOnly name='USERID' id='id_USERID'
          />
      </div> 


 
       <div className='mb-3'>
      <label>First Name</label>
          <input  value={firstName} name='time_firstname' id='id_time_firstname'
            onChange={(event) => {
                setFirstName(event.target.value)
            }}
            className='form-control'
            type='text' readOnly
          />
      </div>
      


          <div className='mb-3'>
          <label>Time In</label>
          <input  value={TimeIn} name='time_timein' id='id_time_timein'
            onChange={(event) => {
                setTimeIn(event.target.value)
            }}
            className='form-control'
            type='text' 
          />
        </div>
      

        <div className='mb-3'>
          <label>Today Date</label>
          <input name='time_todaydate' id='id_time_todaydate'
             onChange={(event) => {
               setTodayDate(event.target.value)
             }}
       
            className='form-control'
            type='date'
          />
        </div>

       

        <div className='mb-3' style={{ marginTop: 40 }}>
          
          <button name='btn_timeinbutton' id='id_btn_timeinbutton' onClick={(e)=>timeinbutton(e)} className="btn btn-success"                                                              >
            TimeIN
          </button>&nbsp;&nbsp;&nbsp;
        </div>
    <div className='mb-3' style={{ marginTop: 40 }}>
          
          <button name='btn_timesubmit' id='id_btn_timesubmit' onClick={timein} style={styles.signinButton}>
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
  
  export default Timereg


