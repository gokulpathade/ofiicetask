
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import config from '../../config'
import axios from 'axios'

 import { useNavigate} from 'react-router-dom'
import Sidebar from '../../components/sidebar'
  
   const Adddepatment = () => {
    // get user inputs
    const [deptname, setdeptname] = useState('')
    const [shortdisc, setShortdesc] = useState('')
   
  
    // this function is used to navigate from one component to another programmatically
    // userNavigate() returns a function reference
    const navigate = useNavigate()
   
  
    const adddept = () => {
      // check if user has really entered any value
      if (deptname.length === 0) {
        toast.error('please enter Department name')
      } else if (shortdisc.length === 0) {
        toast.error('please enter short Description')
       } else {
        // make the API call to check if user exists
        const body = {
            deptname,
            shortdisc,
           
          }
          console.log(body)
        axios
          .post(config.serverURL + '/department/dept',body, {
            headers: { token: sessionStorage['token'] },
             }).then((response) => {
            
            const result = response.data
            console.log("succesfully added data "+result)
  
            
            if (result['status'] === 'success') {
              toast.success('successfully added depratment')
              //navigate the home page
              navigate('/manage')
            } else {
              toast.error(result['error'])
  
          
             
            }
          })
          .catch((error) => {
            //console.log('error')
            console.log(error)
          })
      }
     
    }
    // const getuserdetails = () => {
    //   axios
    //     .get(config.serverURL + '/use/role/', {
    //       headers: { token: sessionStorage['token'] },
    //     })
    //     .then((response) => {
    //       const result = response.data
  
    //       if (result['status'] === 'success') {
    //         console.log(result)
    //         // set the homes to the state member
    //         setOptionList(result['data'])
    //       } else {
    //         toast.error(result['error'])
    //       }
    //     })
    // }
  
    return (
      <>
      <Sidebar/>
        <div className='home'>
      <div style={{ marginTop: 100 }}>
        <div style={styles.container}>
          <div className='mb-3'>
            <label>Department Name</label>
            <input name='deptname' id='id_deptname'
              onChange={(event) => {
                setdeptname(event.target.value)
              }}
              className='form-control'
              type='text'
            />
          </div>
  
          <div className='mb-3'>
            <label>Short Description</label>
            <input name='shortdesc' id='id_shortdesc'
              onChange={(event) => {
                setShortdesc(event.target.value)
              }}
              className='form-control'
              type='text'
            />
          </div>
         
  
          <div className='mb-3' style={{ marginTop: 40 }}>
            
            <button type='adddept' id='id_adddept' onClick={adddept} style={styles.signinButton}>
              Add Department
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
      height: 300,
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
     // borderStyle: 'solid',
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

   export default Adddepatment
