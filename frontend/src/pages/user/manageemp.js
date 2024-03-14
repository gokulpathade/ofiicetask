import React from 'react'
import axios from 'axios'
import config from '../../config'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar'


const Manageemp = () => {
  const [employee, setEmployee] = useState([])

  // hook used to navigate
  const navigate = useNavigate()

  // this hooks is called when the value(s) are changed
  // first param: callback function which will be called
  // second param:
  // - list of values which when changed, the callback function gets called
  // - empty array as a second param means the callback gets calld when the component
  //   get loaded successfully
  useEffect(() => {
    // load all the homes created by the user
    getemployeedetails()
  }, [])

  // get my homes
  const getemployeedetails = () => {
    axios
      .get(config.serverURL + '/employee/', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data

        if (result['status'] === 'success') {
          console.log(result)
          // set the homes to the state member
          setEmployee(result['data'])
        } else {
          toast.error(result['error'])
        }
      })
  }

  // delete my home
  const deleteHome = (rid) => {
    axios
      .delete(config.serverURL + '/employee/' + rid, {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
        if (result['status'] === 'success') {
          // reload the screen
          getemployeedetails()
        } else {
          toast.error(result['error'])
        }
      })
  }

 // edit my employee details
  const editHome = (id) => {
    // pass the home id which you want to edit
    navigate('/editemp', { state: { empid: id } })
  }

  const uploadImage = (rid) => {
    navigate('/uploadempimg', { state: { empid: rid } })
  }

  return (
  <>  
 <Sidebar/>
    <div className='container'>
      <h3 style={styles.h3}>Employee Details</h3>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Emp No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Department</th>
            <th>Mobile Number</th>
            <th>Creation Date</th>
            <th>image</th> 
           

          </tr>
        </thead>
        <tbody>
          {employee.map((emps) => {
             const imageUrl = config.serverURL + '/' + emps.image
            return (
              <tr>
                <td>{emps.emp_no}</td>
                <td>{emps.firstname}</td>
                <td>{emps.lastname}</td>
               
              
                <td>{emps.address}</td>
                <td>{emps.city}</td>
                <td>{emps.department}</td>
                <td>{emps.mobileno}</td>
                <td>{emps.creationDate}</td>


                
                 <img
                alt='img'
                style={{
                  height: 100,
                  width: '100%',
                  display: 'block',
                  borderRadius: 10,
                }}
                src={imageUrl}
              /> 
           
                <td>
                  <button
                     onClick={() => uploadImage(emps.empid)}
                    style={styles.button}
                    className='btn btn-sm btn-warning'>
                    Upload Image
                  </button>
                   <button
                
                     onClick={() => editHome(emps.empid)}
                    style={styles.button}
                    className='btn btn-sm btn-success'>
                    Edit
                  </button>
                  <button
                     onClick={() => deleteHome(emps.empid)}
                    style={styles.button}
                    className='btn btn-sm btn-danger'>
                    Delete
                  </button> 
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </>
   
  )
}

const styles = {
  h3: {
    textAlign: 'center',
    margin: 20,
  },
  button: {
    marginRight: 10,
  },
}

export default Manageemp
