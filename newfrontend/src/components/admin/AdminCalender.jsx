import axios from 'axios'
import config from '../../config'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate, React } from 'react-router-dom'
// import Sidebar from '../../components/sidebar'
import ReactRoundedImage from 'react-rounded-image'
import moment from 'moment';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { FaUpload } from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PasswordStrengthMeter from '../slices/PasswordStrengthMeter';
import { AiFillPlusCircle } from 'react-icons/ai';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

const EmployeeDetails = () => {









  
  const [Emp_No, setEmp_No] = useState('')
  const [Name, setName] = useState('')
  const [Last_Name, setLast_Name] = useState('')
  const [Country, setCountry] = useState('')
  const [Email, setEmail] = useState('')

  const [Address, setAddress] = useState('')
  const [City, setCity] = useState('')
  const [Department, setDepartment] = useState('')
  const [Blood_Group, setBlood_Group] = useState('')
  const [Hire_Date, setHire_Date] = useState('')
  const [Birth_Date, setBirth_Date] = useState('')
  const [ManagerId, setManagerId] = useState('')
  const [Contact, setmobileNo] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [optionList, setOptionList] = useState([])//just adding 
  const [manageroptions, setManageroptions] = useState([])



  // Rid, Name, Last_Name, Address, Contact, Role,
  //  Image, Email, Password, CreationDate, Emp_No, Country, City,
  //  Department, Blood_Group, Hire_Date, Birth_Date, ManagerId, M_Name


  const options = ["A+", "B+", "AB+"];
  const options1 = ["India", "Japan", "Chaina", "Italy", "Japan", "Nepal", "Brazil", "Afghanistan", "Canada", "Indonesia", "Thailand"];
  const [Role, setSelected] = useState('')
  const optionss = ["Admin", "User", "Manager"];

  const [registration, setRegistration] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [basicModal, setBasicModal] = useState(false);
  const handleClose1 = () => setBasicModal(false);
  const handleShow1 = () => {

    setBasicModal(true); // Show the modal
  };
  const handleDelete = (emps) => {
    console.log("Delete button clicked. emps:", emps);
    handleShow(emps);
    console.log("console log ")
    deleteHome(emps.rid);
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Upload Image
    </Tooltip>
  );
  const renderTooltip1 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  );
  const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  );




  const navigate = useNavigate()


  useEffect(() => {
    // getmanagerdetails()
    getuserdetails()
    getempdetails()
    getmanagernames()
  }, [basicModal, show])


  const getuserdetails = () => {
    axios
      .get(config.serverURL + '/use/manager', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data

        if (result['status'] === 'success') {
          console.log(result)
          // set the homes to the state member
          setRegistration(result['data'])
        } else {
          toast.error(result['error'])
        }
      })
  }

  // const getmanagerdetails = () => {
  //   axios
  //     .get(config.serverURL + '/use/Role', {
  //       headers: { token: sessionStorage['token'] },
  //     })
  //     .then((response) => {
  //       const result = response.data

  //       if (result['status'] === 'success') {
  //         console.log(result)
  //         // set the homes to the state member
  //         setRegistration(result['data'])
  //       } else {
  //         toast.error(result['error'])
  //       }
  //     })
  // }


  const deleteHome = (rid) => {
    console.log("inside deleteHome Method", rid)
    axios
      .delete(config.serverURL + '/use/' + rid, {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
        if (result['status'] === 'success') {
          console.log("successfully deleted")
          toast.success("successfully deleted")

          // getuserdetails()
          handleClose()
        } else {
          toast.warning("record present into another table ")
          console.log("Can't delete record because present into another table ")
          toast.error(result['error'])




        }
      })
  }


  const editHome = (rid) => {

    navigate('/edit-emp', { state: { rid: rid } })
  }

  const uploadImage = (ridd) => {
    navigate('/upload-image', { state: { rId: ridd } })
  }

  const getempdetails = () => {
    axios
      .get(config.serverURL + '/Department/', {
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

  const getmanagernames = () => {
    axios
      .get(config.serverURL + '/use/manager/', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data

        if (result['status'] === 'success') {
          console.log("manager details ..", result)

          setManageroptions(result['data'])
        } else {
          toast.error(result['error'])
        }
      })

  }




  const addemp = () => {
    // check if user has really entered any value
    if (Emp_No.length === 0) {
      toast.error('please enter EmpNumber ')
    } else if (Name.length === 0) {
      toast.error('please enter first name')
    } else if (Last_Name.length === 0) {
      toast.error('please enter last name')
    } else if (Country.length === 0) {
      toast.error('please enter Country name')
    } else if (Email.length === 0) {
      toast.error('please enter Email')
    }
    else if (Address.length === 0) {
      toast.error('please enter Address')
    }
    else if (City.length === 0) {
      toast.error('please enter City')
    }
    else if (Department.length === 0) {
      toast.error('please enter Department')
    }
    else if (Blood_Group.length === 0) {
      toast.error('please enter Blood_Group')
    } else if (Role.length === 0) {
      toast.error('please select Role')
    }
    else if (Hire_Date.length === 0) {
      toast.error('please select Hire_Date')
    } else if (Birth_Date.length === 0) {
      toast.error('please select Birth_Date')
    } else if (Contact.length === 0) {
      toast.error('please enter phone number')
    } else if (password.length === 0) {
      toast.error('please enter password')
    } else if (confirmPassword.length === 0) {
      toast.error('please confirm password')
    } else if (password !== confirmPassword) {
      toast.error('password does not match')
    } else if (confirmPassword.length === 0) {
      toast.error('please confirm password')
    } else if (ManagerId.length === 0) {
      toast.error('please select manager')
    } else {
      const body = {
        Emp_No,
        Name,
        Last_Name,
        Country,
        Email,
        Address,
        City,
        Department,
        Blood_Group,
        Hire_Date,
        Birth_Date,
        Contact,
        password,
        Role,
        ManagerId
      }
      console.log(body)
      // make the API call to check if user exists
      axios
        .post(config.serverURL + '/user/signup', body, {
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
            // getuserdetails()
            handleClose1()

            setEmp_No('')
            setName('')
            setLast_Name('')
            setCountry('')
            setEmail('')

            setAddress('')
            setCity('')
            setDepartment('')
            setBlood_Group('')
            setHire_Date('')
            setBirth_Date('')
            setmobileNo('')
            setPassword('')
            setConfirmPassword('')
            setManagerId('')

          }
        })
        .catch((error) => {
          console.log('error')
          console.log(error)
        })
    }
  }
  return (
    <>
      {/* <Sidebar /> */}

      <div className='container'>
        <div className="row" style={{ marginTop: 30 }}>

          <div className="col align-self-start">
            <Button variant='primary' style={{ backgroundColor: '#8275a5' }} onClick={handleShow1} >
              <AiFillPlusCircle /> Add Employee
            </Button>
            <MDBModal show={basicModal} onHide={handleClose1} centered animation={false}>
              <MDBModalDialog className="modal-dialog-centered" style={{ maxWidth: "800px", maxHeight: "80vh" }}>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Add Employee</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={handleClose1}></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <div className='container-sm' style={{ width: '750px', height: '580px', borderStyle: '' }}>

                      <div className="row" style={{ marginTop: 5, padding: 5 }}>
                        <div className="col">
                          <div class="form-floating">
                            <div className="form-floating">
                              <input type="text" className="form-control" name='Emp_No' id='id_Emp_No' placeholder="Emp No" onChange={(event) => {
                                setEmp_No(event.target.value)
                              }} />
                              <label for="floatingPassword">Emp No</label>
                            </div>

                          </div>
                        </div>
                        <div className='col'>
                          <div className="form-floating">


                            <select className="form-control" name='Department' id='id_Department'
                              disabled={false}
                              value={Department}
                              onChange={(event) => setDepartment(event.target.value)}
                            >
                              <option>select Department</option>

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
                      <div className="row" style={{ marginTop: 3, padding: 2 }}>
                        <div className="col">
                          <div class="form-floating">
                            <input type="text" className="form-control" name='Name' id='id_Name' placeholder="First Name" onChange={(event) => {
                              setName(event.target.value)
                            }} />
                            <label for="floatingPassword">First Name</label>
                          </div>
                        </div>
                        <div className='col'>
                          <div className="form-floating">

                            <select className="form-control" name='Blood_Group' id='id_Blood_Group'
                              value={Blood_Group}
                              onChange={(event) => setBlood_Group(event.target.value)} >
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
                      <div className="row" style={{ marginTop: 3, padding: 2 }}>
                        <div className="col">
                          <div class="form-floating">
                            <input type="text" className="form-control" name='Last_Name' id='id_Last_Name' placeholder="Last Name" onChange={(event) => {
                              setLast_Name(event.target.value)
                            }} />
                            <label for="floatingPassword">Last Name</label>
                          </div>
                        </div>
                        <div className='col'>
                          <div className="form-floating">
                            <input type="date" className="form-control" name='Hire_Date' id='id_Hire_Date' placeholder="Password" onChange={(event) => {
                              setHire_Date(event.target.value)
                            }} />
                            <label for="floatingPassword">Joining Date</label>
                          </div>

                        </div>
                      </div>
                      <div className="row" style={{ marginTop: 3, padding: 2 }}>
                        <div className="col">
                          <div class="form-floating">

                            <select className="form-control" name='selectCountry' id='id_selectCountry'
                              value={Country}
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
                            <input type="date" className="form-control" name='Birth_Date' id='id_Birth_Date' placeholder="Birth Date" onChange={(event) => {
                              setBirth_Date(event.target.value)
                            }} />
                            <label for="floatingPassword">DOB</label>
                          </div>

                        </div>
                      </div>
                      <div className="row" style={{ marginTop: 3, padding: 2 }}>
                        <div className="col">
                          <div class="form-floating">
                            <input type="Email" className="form-control" name='newEmail' id='id_newEmail' placeholder="name@meg-nxt.com" onChange={(event) => {
                              setEmail(event.target.value)
                            }} />
                            <label for="floatingInputValue">Email</label>
                          </div>
                        </div>
                        <div className='col'>
                          <div className="form-floating">
                            <input type="number" className="form-control" name='mobileno' id='id_mobileno' placeholder="Mobile No" onChange={(event) => {
                              setmobileNo(event.target.value)
                            }} />
                            <label for="floatingPassword">Mobile Number</label>
                          </div>

                        </div>
                      </div>
                      <div className="row" style={{ marginTop: 3, padding: 2 }}>
                        <div className="col">
                          <div class="form-floating">

                            <select className="form-control" name='Role' id='id_Role'
                              value={Role}
                              onChange={(event) => setSelected(event.target.value)} >
                              <option>select Role</option>
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

                            <input type="text" className="form-control" name='City' id='id_City' placeholder="City" onChange={(event) => {
                              setCity(event.target.value)
                            }} />
                            <label for="floatingPassword">City</label>

                          </div>

                        </div>
                      </div>
                      <div className="row" style={{ marginTop: 3, padding: 2 }}>
                        <div className="col">
                          <div class="form-floating">
                            <input type="text" className="form-control" name='Address' id='id_Address' placeholder="Address" onChange={(event) => {
                              setAddress(event.target.value)
                            }} />
                            <label for="floatingPassword">Address</label>
                          </div>
                        </div>
                        <div className='col'>
                          <div className="form-floating">
                            <input type="password" className="form-control" name='confirmpassword' id='id_confirmpassword' placeholder="Password" onChange={(event) => {
                              setConfirmPassword(event.target.value)
                            }} />
                            <label for="floatingPassword">Confirm Password</label>
                          </div>

                        </div>
                      </div>
                      <div className="row" style={{ marginTop: 3, padding: 2 }}>
                        <div className="col">
                          <div class="form-floating">
                            <input type="password" className="form-control" name='password2' id='id_password2' placeholder="Password" onChange={(event) => {
                              setPassword(event.target.value)
                            }} />
                            <PasswordStrengthMeter password={password} />
                            <label for="floatingPassword">Password</label>
                          </div>
                        </div>









                        <div className='col'>
                          <div className="form-floating">
                            <select
                              className="form-control"
                              name='Department'
                              id='id_Department'
                              disabled={false}
                              value={ManagerId}
                              onChange={(event) => setManagerId(event.target.value)}
                            >
                              <option value="">Select Manager</option>

                              {registration
                                .filter((emps) => emps.Role === 'manager') // Assuming 'Role' is the key for the Role information
                                .map((emps) => (
                                  <option key={emps.Rid} value={`${emps.Rid} 
      `}>
                                    {emps.Rid} <br /><br />
                                    <span>{emps.Name}</span>
                                    {/* - {emps.Name} */}
                                  </option>
                                ))}
                            </select>




                            <label htmlFor="floatingPassword"> Manager</label>
                          </div>
                        </div>










                      </div>

                    </div>



                  </MDBModalBody>
                  <MDBModalFooter>

                    <Button name='btn_close' id='id_close' variant="danger" onClick={handleClose1}>
                      Close
                    </Button>
                    <Button variant="success" name='addemp' id='id_addemp' onClick={addemp}>
                      Add
                    </Button>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>

          </div>
          <div className="col align-self-center">
            <h3>Employee details</h3>
          </div>
          <div className="col align-self-end">
            <div class="input-group">
              <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            </div>
          </div>
        </div>
        <div style={{ marginBottom: 30 }}><hr style={{ border: '3px solid #8275a5' }}></hr></div>
        <div className="table-responsive" style={{ maxHeight: '550px', overflow: 'auto' }} >
          <table className='table table-striped' style={{ width: '100%' }} >
            <thead >
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Mobile Number</th>
                <th>Role</th>
                <th>Image</th>
                <th>Creation Date</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {/* {registration.map((emps) => { */}
              {registration
                .filter((emps) =>
                  Object.values(emps).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                  )
                )
                .map((emps) => {
                  const imageUrl = config.serverURL + '/' + emps.image
                  return (
                    <tr>
                      <td>{emps.rid}</td>
                      <td>{emps.Name}</td>
                      <td>{emps.Last_Name}</td>
                      <td>{emps.Address}</td>
                      <td>{emps.Contact}</td>
                      <td>{emps.Role}</td>


                      <td> <ReactRoundedImage
                        image={imageUrl}

                        roundedColor="#66A5CC"
                        imageWidth="80"
                        imageHeight="80"
                        roundedSize="5"

                      /></td>


                      <td> {moment(emps.creationDate).format('YYYY-MM-DD')}</td>
                      <td>
                        {/* <button name='btn_uploadimg' id='id_btn_uploadimg' title='Upload image' 
                     onClick={() => uploadImage(emps.rid)}
                    style={styles.button}
                    className='btn btn-sm btn-warning'>
                  
                    <FaUpload color='white'/>
                  </button> */}

                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <Button variant="success" name='btn_uploadimg' id='id_btn_uploadimg'
                            onClick={() => uploadImage(emps.rid)}
                            style={styles.button}
                            className='btn btn-sm btn-warning'>  <FaUpload color='white' /></Button>
                        </OverlayTrigger>





                        {/* <button
                    name='btn_edithome' id='id_btn_edithome' title='Edit'
                     onClick={() => editHome(emps.rid)}
                    style={styles.button}
                    className='btn btn-sm btn-success'>
                 
                    <AiFillEdit/>
                  </button> */}

                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip1}
                        >
                          <Button variant="success" name='btn_edithome' id='id_btn_edithome'
                            onClick={() => editHome(emps.rid)}
                            style={styles.button}
                            className='btn btn-sm btn-success'>  <AiFillEdit /></Button>
                        </OverlayTrigger>

                        {/* <button variant="success"
                     name='btn_deletehome' id='id_btn_deletehome' title='Delete'
                  
                    onClick={() => handleShow(emps)}
                    style={styles.button}
                    className='btn btn-sm btn-danger'>
                   
                    <AiFillDelete/>
                  </button>  */}

                        <OverlayTrigger variant="success"
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip2}
                        >
                          <Button name='btn_deletehome' id='id_btn_deletehome'

                            onClick={() => handleShow(emps)}
                            style={styles.button}
                            className='btn btn-sm btn-danger'>  <AiFillDelete /></Button>
                        </OverlayTrigger>



                        <Modal show={show} onHide={handleClose} animation={false} centered>
                          <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>Are you sure you want to delete?</Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(emps)}>
                              Delete
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
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

export default EmployeeDetails



















