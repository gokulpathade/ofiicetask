import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import config from '../../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar'
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';




const Addemployee = () => {
 // get user inputs
 const [empno,setEmpno]=useState('')
 const [firstName, setFirstName] = useState('')
 const [lastName, setLastName] = useState('')
 const[country,setCountry]=useState('')
 const [email, setEmail] = useState('')
 
 const [address, setaddress] = useState('')
 const [city, setCity] = useState('')
 const [department, setDepartment] = useState('')
 const [bloodgroup, setBloodgroup] = useState('')
 const [hiredate, setHiredate] = useState('')
 const [birthdate, setBirthdate] = useState('')
 const [moNo, setmobileNo] = useState('')
 const [password, setPassword] = useState('')
 const [confirmPassword, setConfirmPassword] = useState('')
 const [optionList,setOptionList] = useState([])//just adding 
 const options = ["A+", "B+", "AB+"];
 const options1 = ["India", "Japan", "Chaina","Italy", "Japan", "Nepal","Brazil","Afghanistan","Canada","Indonesia","Thailand"];
 const [role, setSelected]  = useState('')
 const [managerid, setManagerid]  = useState('')
 const optionss = ["Admin", "User", "Manager"];

   // this function is used to navigate from one component to another programmatically
  // userNavigate() returns a function reference
  const navigate = useNavigate()

  useEffect(() => {
   
    getempdetails()
  }, [])




  const addemp = () => {
    // check if user has really entered any value
    if (empno.length === 0) {
      toast.error('please enter EmpNumber ')
    } else if (firstName.length === 0) {
      toast.error('please enter first name')
    }else if (lastName.length === 0) {
      toast.error('please enter last name')
    }else if (country.length === 0) {
      toast.error('please enter country name')
    }else if (email.length === 0) {
      toast.error('please enter email')
    }
    else if (address.length === 0) {
      toast.error('please enter address')
    }
    else if (city.length === 0) {
      toast.error('please enter city')
    }
    else if (department.length === 0) {
      toast.error('please enter department')
    }
    else if (bloodgroup.length === 0) {
      toast.error('please enter bloodgroup')
    }
    else if (hiredate.length === 0) {
      toast.error('please select hiredate')
    } else if (birthdate.length === 0) {
      toast.error('please select birthdate')
    } else if (moNo.length === 0) {
      toast.error('please enter phone number')
    } else if (password.length === 0) {
      toast.error('please enter password')
    } else if (confirmPassword.length === 0) {
      toast.error('please confirm password')
    } else if (password !== confirmPassword) {
      toast.error('password does not match')
    } else if (empno.length === 0) {
      toast.error('please select manager ')
    } 
    
    else {
      const body={
        empno,
        firstName,
        lastName,
        country,
        email,
        address,
        city,
        department,
        bloodgroup,
        hiredate,
        birthdate,
        moNo,
        password,
        role,
        managerid,
      }
      console.log(body)
      // make the API call to check if user exists
      axios
        .post(config.serverURL + '/user/signup', body ,{
          headers: { token: sessionStorage['token'] },
          })
        .then((response) => {
          // get the data returned by server
          const result = response.data
          console.log("succesfyllu added employee details ", result)

          // check if user's authentication is successfull
          if (result['status'] === 'error') {
            toast.error('successfully not added employee details')
          } else {
            toast.success('successfully added employee details')

            // navigate to the singin page
            navigate('/userdetails')
          }
        })
        .catch((error) => {
          console.log('error')
          console.log(error)
        })
    }
  }

  const getempdetails = () => {
    axios
      .get(config.serverURL + '/department/', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data

        if (result['status'] === 'success') {
          console.log(result)
          // set the homes to the state member
          setOptionList(result['data'])
        } else {
          toast.error(result['error'])
        }
      })
  }


    return (
      <>
      <Sidebar/>
     
 <div className='container-sm' style={{width:'800px',height:'650px',borderStyle:'solid'}}>

  <div className="row" style={{marginTop:5,padding:5}}>
  <div className="col">
  <div class="form-floating">
  <div className="form-floating">
  <input type="text" className="form-control" id="floatingPassword" placeholder="Emp No"  onChange={(event) => {
              setEmpno(event.target.value)
            }}/>
  <label for="floatingPassword">Emp No</label>
</div>

</div>
    </div>
    <div className='col'>
    <div className="form-floating">
  
  
  <select className="form-control" name='department' id='id_department'
          disabled={false}
          value={department}
          onChange={(event) => setDepartment(event.target.value)} 
      >
      <option>select department</option>

       {optionList?.map((item) =>  
          <option key={item.deptid} value={item.deptname}>
           {item.deptname}
          </option>
        )}
      </select>
  <label for="floatingSelect">Department</label>
</div>

    </div>
    </div>
    <div className="row" style={{marginTop:3,padding:2}}>
  <div className="col">
  <div class="form-floating">
  <input type="text" className="form-control" id="floatingfirstname" placeholder="First Name"   onChange={(event) => {
              setFirstName(event.target.value)
            }}/>
  <label for="floatingPassword">First Name</label>
</div>
    </div>
    <div className='col'>
    <div className="form-floating">
    
   <select className="form-control" name='bloodgroup' id='id_bloodgroup'
          value={bloodgroup}
          onChange={(event) => setBloodgroup(event.target.value)} >
          <option>select Blood group</option>
              {options.map((item) =>  
            <option>
             {item}
            </option>
          )}
        </select>
  <label for="floatingSelect">Blood Group</label>
</div>

    </div>
    </div>
    <div className="row" style={{marginTop:3,padding:2}}>
  <div className="col">
  <div class="form-floating">
  <input type="text" className="form-control" id="floatingfirstname" placeholder="Last Name" onChange={(event) => {
              setLastName(event.target.value)
            }}/>
  <label for="floatingPassword">Last Name</label>
</div>
    </div>
    <div className='col'>
    <div className="form-floating">
  <input type="date" className="form-control" id="floatingPassword" placeholder="Password" onChange={(event) => {
              setHiredate(event.target.value)
            }}/>
  <label for="floatingPassword">Joining Date</label>
</div>

    </div>
    </div>
    <div className="row" style={{marginTop:3,padding:2}}>
  <div className="col">
  <div class="form-floating">
 
  <select className="form-control" name='selectCountry' id='id_selectCountry'
          value={country}
          onChange={(event) => setCountry(event.target.value)} >
          <option>Select</option>
              {options1.map((item) =>  
            <option>
             {item}
            </option>
          )}
        </select>
  <label for="floatingSelect">Country</label>
</div>
    </div>
    <div className='col'>
    <div className="form-floating">
  <input type="date" className="form-control" id="floatingPassword" placeholder="Birth Date"   onChange={(event) => {
              setBirthdate(event.target.value)
            }}/>
  <label for="floatingPassword">DOB</label>
</div>

    </div>
    </div>
    <div className="row" style={{marginTop:3,padding:2}}>
  <div className="col">
  <div class="form-floating">
  <input type="email" className="form-control" id="floatingInputValue" placeholder="name@meg-nxt.com"  onChange={(event) => {
              setEmail(event.target.value)
            }}/>
  <label for="floatingInputValue">Email</label>
</div>
    </div>
    <div className='col'>
    <div className="form-floating">
  <input type="number" className="form-control" id="floatingPassword" placeholder="Mobile No"  onChange={(event) => {
              setmobileNo(event.target.value)
            }}/>
  <label for="floatingPassword">Mobile Number</label>
</div>

    </div>
    </div>
    <div className="row" style={{marginTop:3,padding:2}}>
  <div className="col">
  <div class="form-floating">
 
  <select className="form-control" name='role' id='id_role'
          value={role}
          onChange={(event) => setSelected(event.target.value)} >
      <option>select role</option>
      {optionss.map((item) =>  
            <option>
             {item}
            </option>
          )}
        </select>
  <label for="floatingSelect">Role</label>
</div>
    </div>
    <div className='col'>
    <div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  onChange={(event) => {
              setPassword(event.target.value)
            }}/>
                <PasswordStrengthMeter password={password} />
  <label for="floatingPassword">Password</label>
</div>

    </div>
    </div>
    <div className="row" style={{marginTop:3,padding:2}}>
  <div className="col">
  <div class="form-floating">
  <input type="text" className="form-control" id="floatingPassword" placeholder="Address"  onChange={(event) => {
              setaddress(event.target.value)
            }}/>
  <label for="floatingPassword">Address</label>
</div>
    </div>
    <div className='col'>
    <div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"   onChange={(event) => {
              setConfirmPassword(event.target.value)
            }}/>
  <label for="floatingPassword">Confirm Password</label>
</div>

    </div>
    </div>
    <div className="row" style={{marginTop:3,padding:2}}>
  <div className="col">
  <div class="form-floating">
  <input type="text" className="form-control" id="floatingPassword" placeholder="City"  onChange={(event) => {
              setCity(event.target.value)
            }}/>
  <label for="floatingPassword">City</label>
</div>
    </div>
    <div className='col'>
    <div className="form-floating">
  
</div>

    </div>
    </div>
    <div className='row justify-content-center'>
        <div className='col-4'>
        <button name='addemp' id='id_addemp' onClick={addemp} style={styles.signinButton}>
            Add Employee
          </button>
        </div>
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
      borderColor: '#8275a5',
      borderRadius: 10,
      broderWidth: 1,
      borderStyle: 'solid',
      boxShadow: '1px 1px 20px 5px #C9C9C9',
      display: 'flex',
      justifycontent: 'center',
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
  
  export default Addemployee
















































































































































































































































































































































































































































































































// import { useState,useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import config from '../../config'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import Sidebar from '../../components/sidebar'




// const Addemployee = () => {
//  // get user inputs
//  const [emp_no,setEmpno]=useState('')
//  const [firstname, setFirstName] = useState('')
//  const [lastname, setLastName] = useState('')
//  const[country,setCountry]=useState('')
//  const [email, setEmail] = useState('')
//  const [gender, setGender] = useState('')
//  const [address, setaddress] = useState('')
//  const [city, setCity] = useState('')
//  const [department, setDepartment] = useState('')
//  const [bloodgroup, setBloodgroup] = useState('')
//  const [hiredate, setHiredate] = useState('')
//  const [birthdate, setBirthdate] = useState('')
//  const [mobileno, setmobileNo] = useState('')
//  const [password, setPassword] = useState('')
//  const [confirmPassword, setConfirmPassword] = useState('')
//  const [optionList,setOptionList] = useState([])//just adding 
//  const options = ["A+", "B+", "AB+"];

//    // this function is used to navigate from one component to another programmatically
//   // userNavigate() returns a function reference
//   const navigate = useNavigate()

//   useEffect(() => {
   
//     getempdetails()
//   }, [])




//   const addemp = () => {
//     // check if user has really entered any value
//     if (emp_no.length === 0) {
//       toast.error('please enter EmpNumber ')
//     } else if (firstname.length === 0) {
//       toast.error('please enter first name')
//     }else if (lastname.length === 0) {
//       toast.error('please enter last name')
//     }else if (country.length === 0) {
//       toast.error('please enter country name')
//     }else if (email.length === 0) {
//       toast.error('please enter email')
//     }else if (gender.length === 0) {
//       toast.error('please enter gender')
//     }
//     else if (address.length === 0) {
//       toast.error('please enter address')
//     }
//     else if (city.length === 0) {
//       toast.error('please enter city')
//     }
//     else if (department.length === 0) {
//       toast.error('please enter department')
//     }
//     else if (bloodgroup.length === 0) {
//       toast.error('please enter bloodgroup')
//     }
//     else if (hiredate.length === 0) {
//       toast.error('please select hiredate')
//     } else if (birthdate.length === 0) {
//       toast.error('please select birthdate')
//     } else if (mobileno.length === 0) {
//       toast.error('please enter phone number')
//     } else if (password.length === 0) {
//       toast.error('please enter password')
//     } else if (confirmPassword.length === 0) {
//       toast.error('please confirm password')
//     } else if (password !== confirmPassword) {
//       toast.error('password does not match')
//     }else {
//       const body={
//         emp_no,
//         firstname,
//         lastname,
//         country,
//         email,
//         gender,
//         address,
//         city,
//         department,
//         bloodgroup,
//         hiredate,
//         birthdate,
//         mobileno,
//         password,
//       }
//       console.log(body)
//       // make the API call to check if user exists
//       axios
//         .post(config.serverURL + '/employee/emp', body ,{
//           headers: { token: sessionStorage['token'] },
//           })
//         .then((response) => {
//           // get the data returned by server
//           const result = response.data
//           console.log("succesfyllu added employee details ", result)

//           // check if user's authentication is successfull
//           if (result['status'] === 'error') {
//             toast.error('successfully not added employee details')
//           } else {
//             toast.success('successfully added employee details')

//             // navigate to the singin page
//             navigate('/manageemp')
//           }
//         })
//         .catch((error) => {
//           console.log('error')
//           console.log(error)
//         })
//     }
//   }

//   const getempdetails = () => {
//     axios
//       .get(config.serverURL + '/department/', {
//         headers: { token: sessionStorage['token'] },
//       })
//       .then((response) => {
//         const result = response.data

//         if (result['status'] === 'success') {
//           console.log(result)
//           // set the homes to the state member
//           setOptionList(result['data'])
//         } else {
//           toast.error(result['error'])
//         }
//       })
//   }


//     return (
//       <>
//       <Sidebar/>
//       {/* <div className='home'>
     
//      <div style={{ marginTop: 100 }}>
//       <div style={styles.container}>
        
        
//         <div className='mb-3'>
//           <label>Emp No</label>
//           <input
//             onChange={(event) => {
//               setEmpno(event.target.value)
//             }}
//             className='form-control'
//             type='text'/>
//         </div>

//         <div className='mb-3'>
//           <label>First Name</label>
//           <input
//             onChange={(event) => {
//               setFirstName(event.target.value)
//             }}
//             className='form-control'
//             type='text'/>
            
//         </div>


//         <div className='mb-3'>
//           <label>Last Name</label>
//           <input
//             onChange={(event) => {
//               setLastName(event.target.value)
//             }}
//             className='form-control'
//             type='text'
//           />
//         </div>


//         <div className='mb-3'>
//           <label>Country</label>
//           <input
//             onChange={(event) => {
//               setCountry(event.target.value)
//             }}
//             className='form-control'
//             type='tel'
//           />
//         </div>

//         <div className='mb-3'>
//           <label>Email</label>
//           <input
//             onChange={(event) => {
//               setEmail(event.target.value)
//             }}
//             className='form-control'
//             type='text'
//           />
          
//         </div>
        
//         <div className='mb-3'>
//           <label>Gender</label>
//           <input
//             onChange={(event) => {
//               setGender(event.target.value)
//             }}
//             className='form-control'
//             type='email'
//           />
//         </div>

//         <div className='mb-3'>
//           <label>Address</label>
//           <input
//             onChange={(event) => {
//               setaddress(event.target.value)
//             }}
//             className='form-control'
//             type='text'
//           />
//         </div>
//         <div className='mb-3'>
//           <label>city</label>
//           <input
//             onChange={(event) => {
//               setCity(event.target.value)
//             }}
//             className='form-control'
//             type='text'
//           />
//           <div className='mb-3'>
//           <label>department</label>
//           <input
//             onChange={(event) => {
//               setDepartment(event.target.value)
//             }}
//             className='form-control'
//             type='text'
//           />
//          </div>
//          <div className='mb-3'>
//           <label>bloodgroup</label>
//           <input
//             onChange={(event) => {
//               setBloodgroup(event.target.value)
//             }}
//             className='form-control'
//             type='text'
//           />
//         </div>
//         <div className='mb-3'>
//           <label>Hiredate</label>
//           <input
//             onChange={(event) => {
//               setHiredate(event.target.value)
//             }}
//             className='form-control'
//             type='date'
//           />
//         </div>
//         <div className='mb-3'>
//           <label>Birthdate</label>
//           <input
//             onChange={(event) => {
//               setBirthdate(event.target.value)
//             }}
//             className='form-control'
//             type='date'
//           />
//         </div>
//         <div className='mb-3'>
//           <label>Mobile Number</label>
//           <input
//             onChange={(event) => {
//               setmobileNo(event.target.value)
//             }}
//             className='form-control'
//             type='number'
//           />
//         </div>
        
//         </div>
//         <div className='mb-3'>
//           <label>Password</label>
//           <input
//             onChange={(event) => {
//               setPassword(event.target.value)
//             }}
//             className='form-control'
//             type='password'
//           />
//         </div>

//         <div className='mb-3'>
//           <label>Confirm Password</label>
//           <input
//             onChange={(event) => {
//               setConfirmPassword(event.target.value)
//             }}
//             className='form-control'
//             type='password'
//           />
//         </div>
//         <div className='mb-3' style={{ marginTop: 40 }}>
          
//           <button onClick={addemp} style={styles.signinButton}>
//             Signup
//           </button>
//         </div>
//       </div>
//     </div>
//      </div> */}
//    <div className='container' style={{ marginTop: 30 }}>
//       <h3 style={{ textAlign: 'center', marginBottom: 50 }}>Add Employee </h3>
//       <div className='row justify-content-center' style={{}} 
//      >
//         <div
//           className='col-4'
//           style={{  fontSize:20}}>
//          <label>Emp No</label>
//           <input
//             onChange={(event) => {
//               setEmpno(event.target.value)
//             }}
//             className='form-control'
//             type='text'/>
//            <label>First Name</label>
//           <input
//             onChange={(event) => {
//               setFirstName(event.target.value)
//             }}
//             className='form-control'
//             type='text'/>

//          <label>Last Name</label>
//           <input
//             onChange={(event) => {
//               setLastName(event.target.value)
//             }}
//             className='form-control'
//             type='text'
//           />
//           <label>Country</label>
//           <input
//             onChange={(event) => {
//               setCountry(event.target.value)
//             }}
//             className='form-control'
//             type='tel'
//           />
//            <label>Email</label>
//           <input
//             onChange={(event) => {
//               setEmail(event.target.value)
//             }}
//             className='form-control'
//             type='text'
//           />
//            <label>Gender</label>
//           <input
//             onChange={(event) => {
//               setGender(event.target.value)
//             }}
//             className='form-control'
//             type='email'
//           />
//           <label>Address</label>
//           <input
//             onChange={(event) => {
//               setaddress(event.target.value)
//             }}
//             className='form-control'
//             type='text'
//           />
//           <label>city</label>
//           <input
//             onChange={(event) => {
//               setCity(event.target.value)
//             }}
//             className='form-control'
//             type='text'
//           />
//         </div>
      
//         <div className='col-4' style={{  borderLeftStyle: 'solid', borderRightColor: 'lightgray',fontSize:20}}>
        
          
//         <div>

//           <label>department</label><br/>
       


            
//        <select className="form-control"
//           disabled={false}
//           value={department}
//           onChange={(event) => setDepartment(event.target.value)} 
//       >
//       <option>Select department</option>

//        {optionList?.map((item) =>  
//           <option key={item.deptid} value={item.deptname}>
//            {item.deptname}
//           </option>
//         )}
//       </select>
//           </div>
           
           
         
         









// {/* <br/> */}

//           <label>bloodgroup</label>
//           {/* <input
//             onChange={(event) => {
//               setBloodgroup(event.target.value)
//             }}
//             className='form-control'
//             type='text'
//           /> */}


//     <select className="form-control"
//           value={bloodgroup}
//           onChange={(event) => setBloodgroup(event.target.value)} >
//       <option>select Blood group</option>
//       {options.map((item) =>  
//             <option>
//              {item}
//             </option>
//           )}
//         </select>
          



//           <label>Hiredate</label>
//           <input
//             onChange={(event) => {
//               setHiredate(event.target.value)
//             }}
//             className='form-control'
//             type='date'
//           />
//            <label>Birthdate</label>
//           <input
//             onChange={(event) => {
//               setBirthdate(event.target.value)
//             }}
//             className='form-control'
//             type='date'
//           />

//         <label>Mobile Number</label>
//           <input
//             onChange={(event) => {
//               setmobileNo(event.target.value)
//             }}
//             className='form-control'
//             type='number'
//           />
//           <label>Password</label>
//           <input
//             onChange={(event) => {
//               setPassword(event.target.value)
//             }}
//             className='form-control'
//             type='password'
//           />
//            <label>Confirm Password</label>
//           <input
//             onChange={(event) => {
//               setConfirmPassword(event.target.value)
//             }}
//             className='form-control'
//             type='password'
//           />
       
//         </div>
//       </div>



//       {/* <div className='row'>
//         <div
//           className='col'
//           style={{ borderRightStyle: 'solid', borderRightColor: 'lightgray' }}>
//            <Input
//             type='number'
//             title='Rent (per night)'
//             onChange={(e) => {
//               setRent(e.target.value)
//             }}
//           />
//           <Input
//             type='number'
//             title='Service Fee'
//             onChange={(e) => {
//               setServiceFee(e.target.value)
//             }}
//           />
//           <Input
//             type='number'
//             title='Cleaning Fee'
//             onChange={(e) => {
//               setCleaningFee(e.target.value)
//             }}
//           />
//           <Input
//             type='number'
//             title='Tax'
//             onChange={(e) => {
//               setTax(e.target.value)
//             }}
//           />
//         </div>
//         <div className='col'>
//           <Input
//             type='number'
//             title='No of guests allowed'
//             onChange={(e) => {
//               setGuests(e.target.value)
//             }}
//           />
//           <Input
//             type='number'
//             title='No of beds'
//             onChange={(e) => {
//               setBeds(e.target.value)
//             }}
//           />
//           <Input
//             type='number'
//             title='No of bathrooms'
//             onChange={(e) => {
//               setBathRooms(e.target.value)
//             }}
//           />
//           <Input
//             type='number'
//             title='No of bedrooms'
//             onChange={(e) => {
//               setBedRooms(e.target.value)
//             }}
//           /> 
//         </div>
//       </div>

//       <hr />*/}

//       <div className='row justify-content-center'>
//         <div className='col-4'>
//         <button onClick={addemp} style={styles.signinButton}>
//             Add Employee
//           </button>
//         </div>
//       </div> 
//     </div>








//      </>
//     )
//   }
//   const styles = {
//     container: {
//       width: 100,
//      // height: 620,
//      height:100,
//       padding: 20,
//       position: 'relative',
//       top: 0,
//       left: 0,
//       right: 50,
//       bottom: 0,
//       margin: 'auto',
      
//       marginTop:500,
//       borderColor: '#4d94ff',
//       borderRadius: 10,
//       broderWidth: 1,
//       borderStyle: 'solid',
//       boxShadow: '1px 1px 20px 5px #C9C9C9',
//       display: 'flex',
//       justifycontent: 'center',
//     },
//     signinButton: {
//       position: 'relative',
//       width: '100%',
//       height: 40,
//       backgroundColor: '#4d94ff',
//       color: 'white',
//       borderRadius: 5,
//       border: 'none',
//       marginTop: 10,
//     },
//   }
  
//   export default Addemployee


// // import React from 'react'

// // function Addemployee() {
// //   return (
// //     <div className='home'>
// //       <h1>hiiiiiiiiiiii</h1>
// //     </div>
// //   )
// // }

// // export default Addemployee


