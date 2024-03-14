import React from 'react'
import Sidebar from '../../components/sidebar'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import config from '../../config'
import axios from 'axios'

function EditDepartment() {
    
    const [details, setDetails] = useState({})
    const [deptname, setdeptname] = useState('')
    const [shortdisc, setShortdesc] = useState('')
    const [deptidd,setdeptid] = useState('')
     // used to ge the data/state sent by previous screen
  const location = useLocation()

  // used to navigate
  const navigate = useNavigate()

  // execute this function when the component gets loaded successfully
  useEffect(() => {
    // get the parameters (state object) sent by the previous page
    // navigate('/manage', { state: { Deptid: id } })
    // the state passed in the above statement can be accessed by location.state
    const  deptId  = location.state.DeptID
    //console.log("aa",location.state.DeptID)
    getDetails(deptId)

  }, [])

  const getDetails = (deptid) => {
  //  console.log("get by id ",deptid);
    axios
      .get(config.serverURL + '/department/' + deptid,{
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
        if (result['status'] === 'success') {
          // set the details
          setDetails(response.data.data[0])
          setdeptname(response.data.data[0].deptname)
          setShortdesc(response.data.data[0].shortdisc)
          setdeptid(response.data.data[0].deptid)
        //  console.log("result",response.data.data[0])
        } else {
          toast.error(result['error'])

          // if home not found then to back to the previous page
          navigate('/manage')
        }

        // setDetails(response.data.data[0])
      })
  }
 const updateDept = (deptid) => {
    if (deptname.length === 0) {
        toast.error('please enter department Name ')
      } else if (shortdisc.length === 0) {
        toast.error('please enter Short Discription')
      }else{ 
        // console.log(deptname)
        // console.log(shortdisc)
        let body={};
        body.deptname = deptname;
        body.shortdisc = shortdisc;
        // console.log(JSON.stringify(body))
        let data = JSON.stringify(body)
        axios
        .put(config.serverURL + '/department/'+deptid,body , {
          headers: { token: sessionStorage['token'] },
          }).then((response) => {
            //console.log(deptid)
           // console.log(body)
        //  console.log("resp",response.data.status)
        const result = response.data
          console.log("succesfully added data "+result)
    
          
          if (result['status'] === 'success') {
            toast.success('successfully Upated depratment')
            //navigate the home page
            navigate('/manage')
          } else {
            toast.error(result['error'])
    
        
           
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
      {/* {details.map((x)=>( */}
        <div style={styles.container}>
       
        
          <div className='mb-3'>
            <label>Department Name</label>
            
            <input name='edit_deptname' id='id_edit_deptname'
            value={deptname}
              onChange={(event) => {
                setdeptname(event.target.value)
              }}
              
              className='form-control'
              type='text'
            />
          </div>
  
          <div className='mb-3'>
            <label>Short Description</label>
            <input name='edit_shortdesc' id='id_edit_shortdesc'
            value={shortdisc}
              onChange={(event) => {
                setShortdesc(event.target.value)
              }}
              className='form-control'
              type='text'
            />
          </div>
         
  
          <div className='mb-3' style={{ marginTop: 40 }}>
            
            <button name='updatedept_btn' id='id_updatedept_btn' onClick={()=>updateDept(deptidd)} style={styles.signinButton}>
              Update Department
            </button>
          </div>
        </div>
        {/* ))} */}
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


export default EditDepartment