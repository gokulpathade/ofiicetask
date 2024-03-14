import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody,MDBContainer,MDBBadge} from 'mdb-react-ui-kit';
import axios from 'axios';
import config from '../../config';
import { toast } from 'react-toastify';
import ReactRoundedImage from 'react-rounded-image'
import Sidebar from '../../components/sidebar';

export default function Sample() {
  const [details, setDetails] = useState([]);
  const [details1, setDetails1] = useState([]);
  const [combinedDetails, setCombinedDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');



    
    


    useEffect(() => {
      getEmployeeDetails();
      getEmployeeDetails1();
    }, []);
  
    useEffect(() => {
      setCombinedDetails([...details, ...details1]);
    }, [details, details1]);
   
    
  
   // Initialize with an empty array

    // const getEmployeeDetails = () => {
    //   axios
    //     .get(config.serverURL + '/registration1/employees/', {
    //       headers: { token: sessionStorage['token'] },
    //     })
    //     .then((response) => {
    //       const result = response.data;
    
    //       if (result['status'] === 'success') {
    //         setCombinedDetails((prevCombinedDetails) => [
    //           ...prevCombinedDetails,
    //           ...result['data'],
    //         ]); // Merge new data with existing data
    //       } else {
    //         toast.error(result['error']);
    //       }
    //     });
    // };
    
    // const getEmployeeDetails1 = () => {
    //   axios
    //     .get(config.serverURL + '/registration1/status/', {
    //       headers: { token: sessionStorage['token'] },
    //     })
    //     .then((response) => {
    //       const result = response.data;
    
    //       if (result['status'] === 'success') {
    //         setCombinedDetails((prevCombinedDetails) => [
    //           ...prevCombinedDetails,
    //           ...result['data'],
    //         ]); // Merge new data with existing data
    //       } else {
    //         toast.error(result['error']);
    //       }
    //     });
    // };
    
  const getEmployeeDetails = () => {
    axios
      .get(config.serverURL + '/registration1/employees/', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data;

        if (result['status'] === 'success') {
          setDetails(result['data']); // Set the details to the data array
        } else {
          toast.error(result['error']);
        }
      });
  };
  const getEmployeeDetails1 = () => {
    axios
      .get(config.serverURL + '/registration1/status/', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data;

        if (result['status'] === 'success') {
          setDetails1(result['data']); // Set the details to the data array
        } else {
          toast.error(result['error']);
        }
      });
  };



  return (
    <> 
    <Sidebar/>
    {/* <input
  type="text"
  placeholder="Search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/> */}

{/* <div class="input-group">
  <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={searchTerm}   onChange={(e) => setSearchTerm(e.target.value)}/>
  <button type="button" className="btn btn-outline-primary">search</button>
</div> */}



    {/* <MDBContainer breakpoint="lg" style={{marginTop:50}}>
    <div style={{ marginTop: 100 }}> <h1>Todays Attendance Status</h1>
      <MDBTable striped>
       
        <MDBTableHead>
          <tr>
            <th scope="col">Emp No</th>
            <th scope="col">Image</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Department</th>
            <th scope="col">Today Status</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {details.map((emps) =>{
             const imageUrl = config.serverURL + '/' + emps.image
            
            return(
            
            <tr key={emps.empno}>
              <td>{emps.empno}</td>
              <td> <ReactRoundedImage
          image={imageUrl}
          
          roundedColor="#66A5CC"
          imageWidth="60"
          imageHeight="60"
          roundedSize="5"
          
        /></td>
             
             
              <td>{emps.firstName}</td>
              <td>{emps.lastName}</td>
              <td>{emps.department}</td>
             
              <td>
           
                <MDBBadge color={emps.status === 'present' ? 'success' : ''} pill>
                {emps.status}
            </MDBBadge>
           
            </td>   
          
              <td>
                <button
                  style={{ width: '70px', height: '50px' }}
                  className="btn btn-sm btn-success"
                >
                 Edit
                </button>
              </td>
            </tr>
          )} )}
        </MDBTableBody>
      </MDBTable>
    </div>
    </MDBContainer> */}


    <MDBContainer breakpoint="lg" style={{ marginTop: 30 }}>
  <div style={{ marginTop: 100 }}>
  
    <div className='container-sm' style={{borderStyle:'',marginLeft:'',marginTop:10,marginRight:10}}>
<div className="row" >
  {/* style={{marginTop:30,marginLeft:'500px'}} */}
  <div className="col align-self-start">
  <h3>Todays Attendance Status</h3>
  </div>
  <div className="col align-self-center">
  
  </div>
  <div className="col align-self-end">
  <div className="input-group">
  <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={searchTerm}   onChange={(e) => setSearchTerm(e.target.value)}/>
  
</div>
  </div>
</div>
</div>
<div style={{marginBottom:30}}><hr style={{border:'3px solid #8275a5'}}></hr></div>
    <MDBTable striped>
      <MDBTableHead>
        <tr>
          <th scope="col">Emp No</th>
          <th scope="col">Image</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Department</th>
          <th scope="col" >Today Status</th>
          {/* <th scope="col">Action</th> */}
        </tr>
      </MDBTableHead>
      {/* <MDBTableBody>
        {details1.map((emps) => {
          const imageUrl = config.serverURL + '/' + emps.image;
        
      
          return (
            <tr key={emps.empno}>
              <td>{emps.empno}</td>
              <td>
                <ReactRoundedImage
                  image={imageUrl}
                  roundedColor="#66A5CC"
                  imageWidth="60"
                  imageHeight="60"
                  roundedSize="5"
                />
              </td>
              <td>{emps.firstName}</td>
              <td>{emps.lastName}</td>
              <td>{emps.department}</td>
               <td>
                <MDBBadge color={emps.applyStatus === 'approved' ? 'danger' : ''} pill>
                  {emps.applyStatus === 'approved' ? 'On leave' : emps.applyStatus}
                </MDBBadge>
              </td> 
             
              <td>
                <button
                  style={{ width: '70px', height: '50px' }}
                  className="btn btn-sm btn-success"
                >
                  Edit
                </button>
              </td>
            </tr>
          );
        })}
      </MDBTableBody>  */}


<MDBTableBody>
  {/* {combinedDetails.map((emps) => { */}
  {combinedDetails
          .filter((emps) =>
            Object.values(emps).some((value) =>
              String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
          )
          .map((emps) => {
    const imageUrl = config.serverURL + '/' + emps.image;

    return (
      <tr key={emps.empno}>
        <td>{emps.empno}</td>
        <td>
          <ReactRoundedImage
            image={imageUrl}
            roundedColor="#66A5CC"
            imageWidth="60"
            imageHeight="60"
            roundedSize="5"
          />
        </td>
        <td>{emps.firstName}</td>
        <td>{emps.lastName}</td>
        <td>{emps.department}</td>
        <td >
          <MDBBadge
            // color={
            //   emps.status === 'Present'
            //     ? 'success'
            //     : emps.applyStatus === 'approved'
            //     ? 'danger'
            //     : ''
            // }
            color={ emps.status === 'Present' ? 'success'  : emps.applyStatus === 'approved'  ? 'danger' : emps.status==='absent' ? 'warning':''
            }
            pill
          >
            {emps.applyStatus === 'approved'
              ? 'On leave'
              : emps.status}
          </MDBBadge>
        </td>
        {/* <td>
          <button
            style={{ width: '70px', height: '50px' }}
            className="btn btn-sm btn-success"
          >
            Edit
          </button>
        </td> */}
      </tr>
    );
  })}
</MDBTableBody>
 </MDBTable>
  </div>
</MDBContainer>

    </>
  );
}










