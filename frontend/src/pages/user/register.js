// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import config from '../../config'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const Signup = () => {
//   // get user inputs
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [address, setaddress] = useState('')
//   const [moNo, setmobileNo] = useState('')
//   const [role, setrole] = useState('')
//   const [email, setEmail] = useState('')
 
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')

//   // this function is used to navigate from one component to another programmatically
//   // userNavigate() returns a function reference
//   const navigate = useNavigate()

//   const signup = () => {
//     // check if user has really entered any value
//     if (firstName.length === 0) {
//       toast.error('please enter first name')
//     } else if (lastName.length === 0) {
//       toast.error('please enter last name')
//     } else if (address.length === 0) {
//       toast.error('please enter address')
//     } else if (moNo.length === 0) {
//       toast.error('please enter phone number')
//     } else if (password.length === 0) {
//       toast.error('please enter password')
//     } else if (confirmPassword.length === 0) {
//       toast.error('please confirm password')
//     } else if (password !== confirmPassword) {
//       toast.error('password does not match')
//     } else {
//       // make the API call to check if user exists
//       axios
//         .post(config.serverURL + '/user/signup', {
//           firstName,
//           lastName,
//           address,
//           moNo,
//           role,
//           email,
//           password
//         })
//         .then((response) => {
//           // get the data returned by server
//           const result = response.data

//           // check if user's authentication is successfull
//           if (result['status'] === 'error') {
//             toast.error('invalid email or password')
//           } else {
//             toast.success('successfully registered a new user')

//             // navigate to the singin page
//             navigate('/signin')
//           }
//         })
//         .catch((error) => {
//           console.log('error')
//           console.log(error)
//         })
//     }
//   }

//   return (
//     <div style={{ marginTop: 100 }}>
//       <div style={styles.container}>
//         <div className='mb-3'>
//           <label>First Name</label>
//           <input
//             onChange={(event) => {
//               setFirstName(event.target.value)
//             }}
//             className='form-control'
//             type='text'
//           />
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
//           <label>Phone Number</label>
//           <input
//             onChange={(event) => {
//               setmobileNo(event.target.value)
//             }}
//             className='form-control'
//             type='tel'
//           />
//         </div>

//         <div className='mb-3'>
//           <label>Role</label>
//           <input
//             onChange={(event) => {
//               setrole(event.target.value)
//             }}
//             className='form-control'
//             type='email'
//           />
//         </div>
//         <div className='mb-3'>
//           <label>Email</label>
//           <input
//             onChange={(event) => {
//               setEmail(event.target.value)
//             }}
//             className='form-control'
//             type='email'
//           />
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
//           <div>
//             Already have an account? <Link to='/signin'>Signin here</Link>
//           </div>
//           <button onClick={signup} style={styles.signinButton}>
//             Signup
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// const styles = {
//   container: {
//     width: 400,
//     height: 800,
//     padding: 20,
//     position: 'relative',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     margin: 'auto',
//     borderColor: '#4d94ff',
//     borderRadius: 10,
//     broderWidth: 1,
//     borderStyle: 'solid',
//     boxShadow: '1px 1px 20px 5px #C9C9C9',
//   },
//   signinButton: {
//     position: 'relative',
//     width: '100%',
//     height: 40,
//     backgroundColor: '#4d94ff',
//     color: 'white',
//     borderRadius: 5,
//     border: 'none',
//     marginTop: 10,
//   },
// }

// export default Signup


// import { useState,useEffect } from 'react'
// import { toast } from 'react-toastify'
// import config from '../../config'
// import axios from 'axios'
// import { useNavigate ,Link} from 'react-router-dom'
  
//    const Signup = () => {
//     // get user inputs
//     const [firstName, setFirstName] = useState('')
//     const [lastName, setLastName] = useState('')
//     const [address, setaddress] = useState('')
//     const [moNo, setmobileNo] = useState('')
//     // const [role, setrole] = useState('')
//     const [email, setEmail] = useState('')
   
//     const [password, setPassword] = useState('')
//     const [confirmPassword, setConfirmPassword] = useState('')
//     const [role, setSelected]  = useState('')
//      const [optionList,setOptionList] = useState([])
  
//     // this function is used to navigate from one component to another programmatically
//     // userNavigate() returns a function reference
//     const navigate = useNavigate()
//     useEffect(() => {
   
//     getuserdetails()
//   }, [])
  
//     const signup = () => {
//       // check if user has really entered any value
//       if (firstName.length === 0) {
//         toast.error('please enter first name')
//       } else if (lastName.length === 0) {
//         toast.error('please enter last name')
//       } else if (address.length === 0) {
//         toast.error('please enter address')
//       } else if (moNo.length === 0) {
//         toast.error('please enter phone number')
//       } else if (password.length === 0) {
//         toast.error('please enter password')
//       } else if (confirmPassword.length === 0) {
//         toast.error('please confirm password')
//       } else if (password !== confirmPassword) {
//         toast.error('password does not match')
//       } else {
//         // make the API call to check if user exists
//         axios
//           .post(config.serverURL + '/user/signup', {
//             firstName,
//             lastName,
//             address,
//             moNo,
//             role,
//             email,
//             password
//           })
//           .then((response) => {
//             // get the data returned by server
//             const result = response.data
  
//             // check if user's authentication is successfull
//             if (result['status'] === 'error') {
//               toast.error('invalid email or password')
//             } else {
//               toast.success('successfully registered a new user')
  
//               // navigate to the singin page
//               navigate('/signin')
//             }
//           })
//           .catch((error) => {
//             console.log('error')
//             console.log(error)
//           })
//       }
     
//     }
//     const getuserdetails = () => {
//       axios
//         .get(config.serverURL + '/use/role/', {
//           headers: { token: sessionStorage['token'] },
//         })
//         .then((response) => {
//           const result = response.data
  
//           if (result['status'] === 'success') {
//             console.log(result)
//             // set the homes to the state member
//             setOptionList(result['data'])
//           } else {
//             toast.error(result['error'])
//           }
//         })
//     }
  
//     return (
//       <div style={{ marginTop: 100 }}>
//         <div style={styles.container}>
//           <div className='mb-3'>
//             <label>First Name</label>
//             <input
//               onChange={(event) => {
//                 setFirstName(event.target.value)
//               }}
//               className='form-control'
//               type='text'
//             />
//           </div>
  
//           <div className='mb-3'>
//             <label>Last Name</label>
//             <input
//               onChange={(event) => {
//                 setLastName(event.target.value)
//               }}
//               className='form-control'
//               type='text'
//             />
//           </div>
//           <div className='mb-3'>
//             <label>Address</label>
//             <input
//               onChange={(event) => {
//                 setaddress(event.target.value)
//               }}
//               className='form-control'
//               type='text'
//             />
//           </div>
  
  
//           <div className='mb-3'>
//             <label>Phone Number</label>
//             <input
//               onChange={(event) => {
//                 setmobileNo(event.target.value)
//               }}
//               className='form-control'
//               type='tel'
//             />
//           </div>
//   <div>
            
//          <select
//             disabled={false}
//             value={role}
//             onChange={(event) => setSelected(event.target.value)} 
//         >
//         <option >Select</option>

//          {optionList?.map((item) =>  
//             <option key={item.roleid} value={item.roles}>
//              {item.roles}
//             </option>
//           )}
//         </select>
      
//       </div>
//           <div className='mb-3'>
//             <label>Email</label>
//             <input
//               onChange={(event) => {
//                 setEmail(event.target.value)
//               }}
//               className='form-control'
//               type='email'
//             />
//           </div>
  
//           <div className='mb-3'>
//             <label>Password</label>
//             <input
//               onChange={(event) => {
//                 setPassword(event.target.value)
//               }}
//               className='form-control'
//               type='password'
//             />
//           </div>
  
//           <div className='mb-3'>
//             <label>Confirm Password</label>
//             <input
//               onChange={(event) => {
//                 setConfirmPassword(event.target.value)
//               }}
//               className='form-control'
//               type='password'
//             />
//           </div>
  
//           <div className='mb-3' style={{ marginTop: 40 }}>
//             <div>
//               Already have an account? <Link to='/signin'>Signin here</Link>
//             </div>
//             <button onClick={signup} style={styles.signinButton}>
//               Signup
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }
  
//   const styles = {
//     container: {
//       width: 400,
//       height: 620,
//       padding: 20,
//       position: 'relative',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       margin: 'auto',
//       borderColor: '#db0f62',
//       borderRadius: 10,
//       broderWidth: 1,
//       borderStyle: 'solid',
//       boxShadow: '1px 1px 20px 5px #C9C9C9',
//     },
//     signinButton: {
//       position: 'relative',
//       width: '100%',
//       height: 40,
//       backgroundColor: '#db0f62',
//       color: 'white',
//       borderRadius: 5,
//       border: 'none',
//       marginTop: 10,
//     },
//   }

//    export default Signup




import axios from 'axios'
import config from '../../config'
import { toast } from 'react-toastify'
import {useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import background from '../../images/Capture.PNG'
   const Signup = () => {
    // get user inputs
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setaddress] = useState('')
    const [moNo, setmobileNo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setSelected]  = useState('')
    const options = ["Admin", "User", "Manager"];
  
    // this function is used to navigate from one component to another programmatically
    // userNavigate() returns a function reference
    const navigate = useNavigate()
    
  
    const signup = () => {
      // check if user has really entered any value
      if (firstName.length === 0) {
        toast.error('please enter first name')
      } else if (lastName.length === 0) {
        toast.error('please enter last name')
      } else if (address.length === 0) {
        toast.error('please enter address')
      } else if (moNo.length === 0) {
        toast.error('please enter phone number')
      } else if (password.length === 0) {
        toast.error('please enter password')
      } else if (confirmPassword.length === 0) {
        toast.error('please confirm password')
      } else if (password !== confirmPassword) {
        toast.error('password does not match')
      } else {
        // make the API call to check if user exists
        axios
          .post(config.serverURL + '/user/signup', {
            firstName,
            lastName,
            address,
            moNo,
            role,
            email,
            password
          })
          .then((response) => {
            // get the data returned by server
            const result = response.data
  
            // check if user's authentication is successfull
            if (result['status'] === 'error') {
              toast.error('invalid email or password')
            } else {
              toast.success('successfully registered a new user')
  
              // navigate to the singin page
              navigate('/')
            }
          })
          .catch((error) => {
            console.log('error')
            console.log(error)
          })
      }
     
    }
   
  
    return (
     // <div style={{ marginTop: 20 }}>
     <div style={{ backgroundImage: `url(${background})`,width:'100%',
     height:'100vh' ,marginTop:10}}>
        <div style={styles.container}>
          <div className='mb-3'>
            <label>First Name</label>
            <input
              onChange={(event) => {
                setFirstName(event.target.value)
              }}
              className='form-control'
              type='text'
            />
          </div>
  
          <div className='mb-3'>
            <label>Last Name</label>
            <input
              onChange={(event) => {
                setLastName(event.target.value)
              }}
              className='form-control'
              type='text'
            />
          </div>
          <div className='mb-3'>
            <label>Address</label>
            <input
              onChange={(event) => {
                setaddress(event.target.value)
              }}
              className='form-control'
              type='text'
            />
          </div>
  
  
          <div className='mb-3'>
            <label>Phone Number</label>
            <input
              onChange={(event) => {
                setmobileNo(event.target.value)
              }}
              className='form-control'
              type='tel'
            />
          </div>
      <div className='mb-3'>
      <label>Role</label>
    <select className="form-control"
          value={role}
          onChange={(event) => setSelected(event.target.value)} >
      <option>select role</option>
      {options.map((item) =>  
            <option>
             {item}
            </option>
          )}
        </select>
          </div>
          <div className='mb-3'>
            <label>Email</label>
            <input
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              className='form-control'
              type='email'
            />
          </div>
  
          <div className='mb-3'>
            <label>Password</label>
            <input
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              className='form-control'
              type='password'
            />
          </div>
  
          <div className='mb-3'>
            <label>Confirm Password</label>
            <input
              onChange={(event) => {
                setConfirmPassword(event.target.value)
              }}
              className='form-control'
              type='password'
            />
          </div>
  
          <div className='mb-3' style={{ marginTop: 40 }}>
            <div>
              Already have an account? <Link to='/'>Signin here</Link>
            </div>
            <button onClick={signup} style={styles.signinButton}>
              Signup
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  const styles = {
    container: {
      width: 400,
      height: 790,
      padding: 20,
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto',
      borderColor: '#4d94ff',
      borderRadius: 10,
      broderWidth: 1,
      borderStyle: 'solid',
      boxShadow: '1px 1px 20px 5px #C9C9C9',
    },
    signinButton: {
      position: 'relative',
      width: '100%',
      height: 40,
      backgroundColor: '#4d94ff',
      color: 'white',
      borderRadius: 5,
      border: 'none',
      marginTop: 10,
    },
  }
  
   export default Signup