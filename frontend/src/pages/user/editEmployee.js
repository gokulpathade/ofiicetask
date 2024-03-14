import React from 'react'
import Sidebar from '../../components/sidebar'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import config from '../../config'
import axios from 'axios'

function EditEmployee() {
  const [firstname, setFirstName] = useState('')
 const [lastname, setLastName] = useState('')
 const[country,setCountry]= useState('')
    
    const [details, setDetails] = useState({})
    const [empidd,setempid] = useState('')
     const [empno,setempno]= useState('')
     const [address, setaddress] = useState('')
     const [city, setCity] = useState('')
     const [department, setDepartment] = useState('')
     const [mobileno, setmobileNo] = useState('')

  const location = useLocation()

  // used to navigate
  const navigate = useNavigate()

  // execute this function when the component gets loaded successfully
  useEffect(() => {
    // get the parameters (state object) sent by the previous page
    // navigate('/manage', { state: { Deptid: id } })
    // the state passed in the above statement can be accessed by location.state
    const  EmpID  = location.state.empid
    console.log("Get by id",location.state.empid)
    getDetails(EmpID)

  }, [])

  const getDetails = (empid) => {
  //  console.log("get by id ",deptid);
    axios
      .get(config.serverURL + '/employee/' + empid,{
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
        if (result['status'] === 'success') {
          // set the details
          setDetails(response.data.data[0])
          setFirstName(response.data.data[0].firstname)
          setLastName(response.data.data[0].lastname)
          setCountry(response.data.data[0].country)
          setempno(response.data.data[0].emp_no)
          setaddress(response.data.data[0].address)
          setCity(response.data.data[0].city)
          setDepartment(response.data.data[0].department)
          setmobileNo(response.data.data[0].mobileno)
           setempid(response.data.data[0].empid)
          console.log("resultppppppppppppp",response.data.data[0])
        } else {
          toast.error(result['error'])

          // if home not found then to back to the previous page
          navigate('/manage')
        }

        // setDetails(response.data.data[0])
      })
  }
 const updateEMP = (empid) => {
    if (department.length === 0) {
        toast.error('please enter department Name ')
      } else if (city.length === 0) {
        toast.error('please enter city')
      }else{ 
        // console.log(deptname)
        // console.log(shortdisc)
        let body={};
        //  body.emp_no =empno;
        body.address =address;
        body.department=department;
        body.city=city;
        body.mobileno=mobileno;
        // console.log(JSON.stringify(body))
        let data = JSON.stringify(body)
        axios.put(config.serverURL + '/employee/' + empid,body ,{
          headers: { token: sessionStorage['token'] },
          }).then((response) => {
          
        //  console.log("resp",response.data.status)
        const result = response.data
          console.log("succesfully added data "+result)
    
          
          if (result['status'] === 'success') {
            toast.success('successfully Upated depratment')
            navigate('/manageemp')
          } else {
            toast.error(result['error'])
            toast.error('not updated')
    
        
           
          }
        })
        .catch((error) => {
          //console.log('error')
          console.log(error)
        }
        )
    }
   
}



  
  return (
    <>
    <Sidebar/>
     <div className='home'>

      <div style={{ marginTop: 100 }}>
     
        <div style={styles.container}>
         <div className='mb-3'>
          <label>Emp No</label>
          <input value={empno}
            onChange={(event) => {
              setempno(event.target.value)
            }}
            className='form-control'
            type='text' readOnly/>
        </div> 
 
        <div className='mb-3'>
          <label>First Name</label>
          <input value={firstname}
            onChange={(event) => {
              setFirstName(event.target.value)
            }}
            className='form-control'
            type='text' readOnly/>
            
        </div>


        <div className='mb-3'>
          <label>Last Name</label>
          <input value={lastname}
            onChange={(event) => {
              setLastName(event.target.value)
            }}
            className='form-control'
            type='text' readOnly
          />
        </div>


        <div className='mb-3'>
          <label>Country</label>
          <input value={country}
            onChange={(event) => {
              setCountry(event.target.value)
            }}
            className='form-control'
            type='tel' readOnly
          />
        </div>

         <div className='mb-3'>
          <label>Address</label>
          <input value={address}
            onChange={(event) => {
              setaddress(event.target.value)
            }}
            className='form-control'
            type='text'
          />
        </div> 
        <div className='mb-3'>
          <label>city</label>
          <input value={city}
            onChange={(event) => {
              setCity(event.target.value)
            }}
            className='form-control'
            type='text'
          />
          <div className='mb-3'>
          <label>department</label>
          <input value={department}
            onChange={(event) => {
              setDepartment(event.target.value)
            }}
            className='form-control'
            type='text'
          />
         </div>
         
       
        
        <div className='mb-3'>
          <label>Mobile Number</label>
          <input value={mobileno}
            onChange={(event) => {
              setmobileNo(event.target.value)
            }}
            className='form-control'
            type='number'
          />
        </div>
        
        </div>
        <div className='mb-3' style={{ marginTop: 40 }}>
         <button onClick={()=>updateEMP(empidd)} style={styles.signinButton}>
              Update Employee

            </button> 
          </div>
        </div>
      
      </div>
      
      </div> 




    </>
  )
            
            }

const styles = {
    container: {
      width: 400,
      height: 750,
      padding: 20,
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto',
      //borderColor: '#db0f62',
      borderColor:'#8275a5',
      borderRadius: 10,
      broderWidth: 1,
      borderStyle: 'solid',
      boxShadow: '1px 1px 20px 5px #C9C9C9',
      
    },
    signinButton: {
      position: 'relative',
      width: '100%',
      height: 40,
      //backgroundColor: '#db0f62',
      backgroundColor:'#8275a5',
      color: 'white',
      borderRadius: 5,
      border: 'none',
      marginTop: 10,
    },
  }


export default EditEmployee