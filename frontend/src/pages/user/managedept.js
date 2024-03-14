import React from 'react'
import axios from 'axios'
import config from '../../config'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar'
import { AiFillDelete ,AiFillEdit} from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
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



const Managedept = () => {
  const [department, setDepartment] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  const [show, setShow] = useState(false);
  
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


 
  const [deptname, setdeptname] = useState('')
  const [shortdisc, setShortdesc] = useState('')
  const [basicModal, setBasicModal] = useState(false);
  const handleClose1 = () => setBasicModal(false);
  const handleShow1 = () => {
    setdeptname(''); // Clear the department name
    setShortdesc(''); // Clear the short description
    setBasicModal(true); // Show the modal
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  );
  const renderTooltip1 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  );
 
  const handleDelete = (dept) => {
  console.log("Delete button clicked. emps:", dept);
    handleShow(dept);
    console.log("console log ")
    deletedept(dept.deptid);
  };

 
  const navigate = useNavigate()

 
  useEffect(() => {

    getdepartmentdetails()
  }, [])

  
  const getdepartmentdetails = () => {
    axios
      .get(config.serverURL + '/department/', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data

        if (result['status'] === 'success') {
          console.log(result)
          // set the homes to the state member
          setDepartment(result['data'])
        } else {
          toast.error(result['error'])
        }
      })
  }

  // delete my department
  const deletedept = (deptid) => {
    axios
      .delete(config.serverURL + '/department/' + deptid, {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
        if (result['status'] === 'success') {
          // reload the screen
          getdepartmentdetails()
          toast.success("Successfully deleted..")
          handleClose()
        } else {
          toast.error(result['error'])
        }
      })
  }

 // edit my home
  const editDept = (deptid) => {
    // pass the home id which you want to edit
    navigate('/editDept', { state: { DeptID: deptid } })
  }


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
           
            getdepartmentdetails()
            navigate('/manage')
            handleClose1()
       
          } else {
            toast.error(result['error'])

        
           
          }
          
        } )
        .catch((error) => {
          //console.log('error')
          console.log(error)
        })
    }
    
   
  }
  

  return (
  <>  
 <Sidebar/>

    <div className='container'>
    <div className="row" style={{marginTop:50}}>

<div className="col align-self-start">
<Button variant='primary' style={{backgroundColor:'#8275a5'}} onClick={handleShow1} >
              <AiFillPlusCircle /> Add Department
            </Button>
        
            <MDBModal show={basicModal} onHide={handleClose1} centered  animation={false}>
          <MDBModalDialog className="modal-dialog-centered">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add Department</MDBModalTitle>
                 <MDBBtn className='btn-close' color='none' onClick={handleClose1}></MDBBtn> 
              </MDBModalHeader>
              <MDBModalBody>
                {/* <div className='mb-3'>
                  <label htmlFor='deptname'>Department Name</label>
                  <input
                    id='deptname'
                    name='deptname'
                    onChange={(event) => setdeptname(event.target.value)}
                    className='form-control'
                    type='text'
                    value={deptname}
                  />
                </div> */}
                <div className="row" style={{marginTop:5,padding:5}}>
                <div className="col">
                   <div className="form-floating">
                   <input type="text" className="form-control"     id='deptname'
                    name='deptname' placeholder="Department name"  value={deptname}  onChange={(event) => setdeptname(event.target.value)}/>
                    <label for="floatingPassword">Department Name</label>
              </div>
              </div>
              </div>
              <div className="row" style={{marginTop:5,padding:5}}>
              <div className="col">
              <div className="form-floating">
  <input           id='shortdesc'
                    name='shortdesc'
                    onChange={(event) => setShortdesc(event.target.value)}
                    className='form-control'
                    type='text'
                   value={shortdisc}/>
  <label for="floatingPassword">Short Description </label>
              </div>
              </div>
              </div>
             
               
                {/* <div className='mb-3'>
                  <label htmlFor='shortdesc'>Short Description</label>
                  <input
                    id='shortdesc'
                    name='shortdesc'
                    onChange={(event) => setShortdesc(event.target.value)}
                    className='form-control'
                    type='text'
                   value={shortdisc}
                  />
                </div> */}
              
              </MDBModalBody>
              <MDBModalFooter>
             
                <Button variant="danger" onClick={handleClose1}>
        Close
      </Button>
      <Button variant="success" onClick={adddept}> 
        Add
      </Button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

</div>
<div className="col align-self-center">

<h3>Department details</h3>
    




</div>
<div className="col align-self-end">
<div class="input-group">
<input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={searchTerm}   onChange={(e) => setSearchTerm(e.target.value)}/>

</div>
</div>
</div>
     <div  style={{marginBottom:30}}><hr style={{border:'3px solid #8275a5'}}></hr></div>
     
      <table className='table table-striped' >
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Short Description</th>
           

          </tr>
        </thead>
        <tbody>
         {/* { department.map((dept) => { */}
         {department
              .filter((dept) =>
                Object.values(dept).some((value) =>
                  String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
              )
              .map((dept) => {
            
            return (
              <tr>
                <td>{dept.deptid}</td>
                <td>{dept.deptname}</td>
                <td>{dept.shortdisc}</td>
                <td>{dept.creationDate}</td>
                <td>
                <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip1}
    >
                   <button name='btn_managedept' id='id_btn_managedept'
                
                     onClick={() => editDept(dept.deptid)}
                    style={styles.button}
                    className='btn btn-sm btn-success'>
                  <AiFillEdit/>
                  </button>
                  </OverlayTrigger>
                  <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
                  <button name='btn_deletedept' id='id_btn_deletedept'
                    //  onClick={() => deletedept(dept.deptid)}
                    onClick={() => handleShow(dept)}
                    style={styles.button}
                    className='btn btn-sm btn-danger'>
                      <AiFillDelete/>
                  </button> 
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
      <Button variant="danger" onClick={() => handleDelete(dept)}> 
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

export default Managedept
