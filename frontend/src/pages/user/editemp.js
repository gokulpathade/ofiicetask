import React from 'react'
import Sidebar from '../../components/sidebar'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import config from '../../config'
import axios from 'axios'

function EditEmp() {
  const [firstName, setFirstName] = useState('')
 const [lastName, setLastName] = useState('')
 const[country,setCountry]= useState('')
    
    const [details, setDetails] = useState({})
    const [ridd,setrid] = useState('')
     const [empno,setempno]= useState('')
     const [address, setaddress] = useState('')
     const [city, setCity] = useState('')
     const [department, setDepartment] = useState('')
     const [moNo, setmobileNo] = useState('')

  const location = useLocation()

  // used to navigate
  const navigate = useNavigate()

  // execute this function when the component gets loaded successfully
  useEffect(() => {
    // get the parameters (state object) sent by the previous page
    // navigate('/manage', { state: { Deptid: id } })
    // the state passed in the above statement can be accessed by location.state
    const  EmpID  = location.state.rid
    console.log("Get by id",location.state.rid)
    getDetails(EmpID)

  }, [])

  const getDetails = (rid) => {
    console.log("get by id ",rid);
    axios
      .get(config.serverURL + '/use/'+rid,{
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
        if (result['status'] === 'success') {
           
          // set the details
        //   setDetails(response.data.data[0])
           setFirstName(response.data.data[0].firstName)
           setLastName(response.data.data[0].lastName)
           setCountry(response.data.data[0].country)
           setempno(response.data.data[0].empno)
           setaddress(response.data.data[0].address)
          setCity(response.data.data[0].city)
           setDepartment(response.data.data[0].department)
          setmobileNo(response.data.data[0].moNo)
            setrid(response.data.data[0].rid)
          console.log("resultoooooooooooooo",response.data)
        } else {
          toast.error(result['error'])

          // if home not found then to back to the previous page
          navigate('/manage')
        }

        // setDetails(response.data.data[0])
      })
  }





 const updateEMP = (rid) => {
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
        body.moNo=moNo;
        // console.log(JSON.stringify(body))
        let data = JSON.stringify(body)

        axios.put(config.serverURL + '/use/edit/' + rid,{
          headers: { token: sessionStorage['token'] },
          }).then((response) => {
          
        //  console.log("resp",response.data.status)
        const result = response.data
          console.log("succesfully added data "+result)
    
          
          if (result['status'] === 'success') {
            toast.success('successfully Upated depratment')
            navigate('/userdetails')
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
          <input value={empno} name='edit_empno1' id='id_edit_empno1'
            onChange={(event) => {
              setempno(event.target.value)
            }}
            className='form-control'
            type='text' readOnly/>
        </div> 
 
        <div className='mb-3'>
          <label>First Name</label>
          <input value={firstName} name='edit_firstname1' id='id_edit_firstname1'
            onChange={(event) => {
              setFirstName(event.target.value)
            }}
            className='form-control'
            type='text' readOnly/>
            
        </div>


        <div className='mb-3'>
          <label>Last Name</label>
          <input value={lastName} name='edit_lastname1' id='id_edit_lastname1'
            onChange={(event) => {
              setLastName(event.target.value)
            }}
            className='form-control'
            type='text' readOnly
          />
        </div>


        <div className='mb-3'>
          <label>Country</label>
          <input value={country} name='edit_country1' id='id_edit_country1'
            onChange={(event) => {
              setCountry(event.target.value)
            }}
            className='form-control'
            type='tel' readOnly
          />
        </div>

         <div className='mb-3'>
          <label>Address</label>
          <input value={address} name='edit_address1' id='id_edit_address1'
            onChange={(event) => {
              setaddress(event.target.value)
            }}
            className='form-control'
            type='text'
          />
        </div> 
        <div className='mb-3'>
          <label>city</label>
          <input value={city} name='edit_city1' id='id_edit_city1'
            onChange={(event) => {
              setCity(event.target.value)
            }}
            className='form-control'
            type='text'
          />
          <div className='mb-3'>
          <label>department</label>
          <input value={department} name='edit_department1' id='id_edit_department1'
            onChange={(event) => {
              setDepartment(event.target.value)
            }}
            className='form-control'
            type='text'
          />
         </div>
         
       
        
        <div className='mb-3'>
          <label>Mobile Number</label>
          <input value={moNo} name='edit_mobileno1' id='id_edit_mobileno1'
            onChange={(event) => {
              setmobileNo(event.target.value)
            }}
            className='form-control'
            type='number'
          />
        </div>
        
        </div>
        <div className='mb-3' style={{ marginTop: 40 }}>
         <button name='btn_editupdateemp' id='id_btn_editupdateemp' onClick={()=>updateEMP(ridd)} style={styles.signinButton}>
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


export default EditEmp










// import React from 'react'

// export default function EditEmp() {
//   return (
//     <div>EditEmp</div>
//   )
// }
