
import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Sidebar from '../../components/sidebar';
import { useNavigate ,Link} from 'react-router-dom';


const LeaveBalance = () => {









  return (

    
    <div style={{backgroundColor:'#f2f2f2'}}> 
    <Sidebar/>
  <MDBContainer style={{marginLeft:20,padding:'20px'}}>
      <MDBRow style={{margin:9,width:1500}}>
        <MDBCol size='md'>
        <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>Earned Leave</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>28 Mon</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Repubic day</MDBCardText></td>
          </tr>
        
      </div>
    </MDBCardBody>
    
  </MDBCard>
        </MDBCol>


        <MDBCol size='md'>
        <MDBCard style={{width:350,height:300,marginLeft:2}}>
    <MDBCardBody>
      <MDBCardTitle>Casual Leave</MDBCardTitle>
    
     
      <div>
        
          
      </div>
      <div style={{textAlign:'center',marginTop:80}}>
      <h6>No Holidays</h6>
      </div>
    </MDBCardBody>
    
  </MDBCard>
        </MDBCol>



        <MDBCol size='md'>
        <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>Special Sick Leave</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>22 Wed</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Gudi Padwa</MDBCardText></td>
          </tr>
          {/* <tr>
              <td><MDBCardText>28 Mon</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Repubic day</MDBCardText></td>
          </tr> */}
      </div>
    </MDBCardBody>
    
  </MDBCard>
        </MDBCol>



        <MDBCol size='md'>
        <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>Comp Off</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>07 Fri</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Good Friday</MDBCardText></td>
          </tr>
        
      </div>
    </MDBCardBody>
    
  </MDBCard>
        </MDBCol>
        
      </MDBRow>



       <MDBRow style={{margin:9,width:1500}}>
        
        <MDBCol size='md'>
        <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>Paternity Leave</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>01 Mon</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Maharashtra Day</MDBCardText></td>
          </tr>
          <tr>
              <td><MDBCardText>28 Mon</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Repubic day</MDBCardText></td>
          </tr>
      </div>
    </MDBCardBody>
    
  </MDBCard>
        </MDBCol>


        <MDBCol size='md'>
        <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>Loss Of Pay</MDBCardTitle>
    
     
      <div>
          
           <div style={{textAlign:'center',marginTop:80}}>
      <h6>No Holidays</h6>
      </div>
      </div>
      
    </MDBCardBody>
    
  </MDBCard>
        </MDBCol>



        <MDBCol size='md'>
        <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>Outdoor Duty</MDBCardTitle>
    
     
      <div>
          
      </div>
      <div style={{textAlign:'center',marginTop:80}}>
      <h6>No Holidays</h6>
      </div>
    </MDBCardBody>
    
  </MDBCard>
        </MDBCol>




        {/* <MDBCol size='md'>
        <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>AUG 2023</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>15 Tue</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Independence day</MDBCardText></td>
          </tr>
        
      </div>
    </MDBCardBody>
    
        </MDBCard>
        </MDBCol> */}
      </MDBRow>




      {/* <MDBRow style={{margin:9,width:1500}}>
      
        <MDBCol size='md'>
        <MDBCard style={{width:350,height:300}}>


    <MDBCardBody>
      <MDBCardTitle>SEP 2023</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>06 Wed</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Janmashtami   <Link to="/applyleave" className="btn btn-link">Apply</Link>  </MDBCardText></td>
          </tr>
          <tr>
              <td><MDBCardText>19 Tue</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Ganesh Chaturthi</MDBCardText></td>
          </tr>
          <tr>
              <td><MDBCardText>28 Tue</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>ANANT CHATURDASHI</MDBCardText></td>
          </tr>
      </div>
    </MDBCardBody>
    
  </MDBCard>
        </MDBCol>
        <MDBCol size='md'>
        <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>OCT 2023</MDBCardTitle>
    
     
      <div>
          <tr>
              <td><MDBCardText>02 Mon</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Gandhi Jayanti</MDBCardText></td>
          </tr>
           <tr>
              <td><MDBCardText>24 Tue</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Dusshera</MDBCardText></td>
          </tr> 
      </div>
    </MDBCardBody>
    
  </MDBCard>
        </MDBCol>
        <MDBCol size='md'>
        <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>NOV 2023</MDBCardTitle>
    
     
      <div>
         <tr>
              <td><MDBCardText>13 Mon</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Diwali-1</MDBCardText></td>
          </tr>
          <tr>
              <td><MDBCardText>14 Tue</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Diwali-1</MDBCardText></td>
          </tr> 
          <tr>
              <td><MDBCardText>27 Mon</MDBCardText></td>
              <td style={{padding:'10px',fontSize:20}}><MDBCardText>Guru Nanaks Birthday   <Link to="/applyleave" className="btn btn-link">Apply</Link></MDBCardText></td>
          </tr> 
          
      </div>
     
    </MDBCardBody>
    
  </MDBCard>
        </MDBCol>
        <MDBCol size='md'>
        <MDBCard style={{width:350,height:300}}>
    <MDBCardBody>
      <MDBCardTitle>DEC 2023</MDBCardTitle>
    
     
      <div>
        
      </div>
      <div style={{textAlign:'center',marginTop:80}}>
      <h6>No Holidays</h6>
      </div>
    </MDBCardBody>
    
  </MDBCard>
        </MDBCol>
      </MDBRow>
     */}
    </MDBContainer>


    
  </div>
   
    
  );
};

export default LeaveBalance;
