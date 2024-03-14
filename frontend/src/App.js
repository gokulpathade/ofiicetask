
import './App.css';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Addemployee from './pages/user/addemployee';
import Home from './pages/dashboard/home';
import EmployeeDetails from './pages/user/userdetails';
import UploadImage from './pages/user/uploadimage';
import Signin from './pages/user/signin';
import Signup from './pages/user/register';
import Adddepatment from './pages/user/adddepartment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Managedept from './pages/user/managedept';
import EditDepartment from './pages/user/editDepartment';
import Manageemp from './pages/user/manageemp';
import UploadImageEmp from './pages/user/uploadEmpimg';
import EditEmployee from './pages/user/editEmployee';
import Timereg from './pages/user/Time'
import AttendanceDetails from './pages/user/AttendanceDetails'
import TimeInOutDetails from './pages/dashboard/TimeInOutDetails';
import Admindashboard from './pages/dashboard/admindashboard';
import Reporting from './pages/user/reporting';
import ApplyLeave from './pages/user/applyleave';
import EditStatus from './pages/dashboard/editapplystatus';
import Calender from './pages/dashboard/calender';
import EditEmp from './pages/user/editemp';
import Calender1 from './pages/dashboard/AdminCalender';
import Calendersample from './pages/dashboard/calenderSample';
import Sample from './pages/dashboard/employeestatus';
import LeaveCalender from './pages/dashboard/leavecalender';
import HolidayCalender from './pages/dashboard/holidayCalender';
import ManagerDashboard from './pages/dashboard/managerdashboard';
import Details from './pages/user/Details';
import UserDashboard from './pages/dashboard/userdashboard';
import Regularised from './pages/user/Regularised';
// import Sidebar2 from './components/sidebar2';
// import Sidebar1 from './components/sidebar1';


function App() {
  return (
    <Router>
      {/* <Sidebar/>  */}
     <Routes>
  
     <Route path='/home' element={<Home/>} />
        <Route path='/addemployee' element={<Addemployee/>} />
        <Route path='/userdetails' element={<EmployeeDetails/>}/>
        <Route path='/' element={<Signin />} /> 
        <Route path='/signin' element={<Signin />} /> 
        <Route path='/signup' element={<Signup />} />
        <Route path='/upload-image' element={<UploadImage/>}/>
        <Route path='cal' element={<Calender1/>}/>
     
  
      <Route path='/sidebar' element={<Sidebar />} />
      <Route path='/empdetails' element={< EmployeeDetails/>}/>
      <Route path='/adddepartment' element={<Adddepatment/>}/>
      <Route path='/manage' element={<Managedept/>}/>
      <Route path='/editDept' element={<EditDepartment/>}/>
      <Route path='/editemp' element={<EditEmployee/>}/>
      <Route path='/edit-emp' element={<EditEmp/>} />
      <Route path='/manageemp' element={<Manageemp/>}/>
      <Route path='/uploadempimg' element={<UploadImageEmp/>}/>
      <Route path="/timer" element={<Timereg/>}/>
      <Route path="/timedetails" element={<AttendanceDetails/>}/>
      <Route path="/inout" element={<TimeInOutDetails/>}/>
       <Route path="/admindashboard" element={<Admindashboard/>}/> 
       <Route path="/reporting" element={<Reporting/>}/>
       <Route path="/applyleave" element={<ApplyLeave/>}/>
       <Route path='/status' element={<EditStatus/>}/>
       <Route path='/calender' element={<Calender/>}/>
       <Route path='/samplecalender' element={<Calendersample/>}/>
       <Route path='/employeeStatus' element={<Sample/>}/>
       <Route path='/leavecalender' element={<LeaveCalender/>}/>
       <Route path='/holidaycalender' element={<HolidayCalender/>}/>

       <Route path='/managerdashboard' element={<ManagerDashboard/>}/>
       <Route path='/Details' element={<Details/>}/>
       {/* <Route path='/sidebar1' element={<Sidebar1 />} /> */}

       <Route path='/userdashboard' element={<UserDashboard/>}/>
       <Route path='/Regularised' element={<Regularised/>}/>
       {/* <Route path='/sidebar2' element={<Regu />} /> */}



     

     

      </Routes>
     <ToastContainer position='top-center' autoClose={1000} />
    </Router>
  );
}

export default App;









// import './App.css';
// import { useState, useEffect } from 'react'; // Import useState and useEffect
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
// import Addemployee from './pages/user/addemployee';
// import Home from './pages/dashboard/home';
// import EmployeeDetails from './pages/user/userdetails';
// import UploadImage from './pages/user/uploadimage';
// import Signin from './pages/user/signin';
// import Signup from './pages/user/register';
// import Adddepatment from './pages/user/adddepartment';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Managedept from './pages/user/managedept';
// import EditDepartment from './pages/user/editDepartment';
// import Manageemp from './pages/user/manageemp';
// import UploadImageEmp from './pages/user/uploadEmpimg';
// import EditEmployee from './pages/user/editEmployee';
// import Timereg from './pages/user/Time'
// import AttendanceDetails from './pages/user/AttendanceDetails'
// import TimeInOutDetails from './pages/dashboard/TimeInOutDetails';
// import Admindashboard from './pages/dashboard/admindashboard';
// import Reporting from './pages/user/reporting';
// import ApplyLeave from './pages/user/applyleave';
// import EditStatus from './pages/dashboard/editapplystatus';
// import Calender from './pages/dashboard/calender';
// import EditEmp from './pages/user/editemp';
// import Calender1 from './pages/dashboard/AdminCalender';
// import Calendersample from './pages/dashboard/calenderSample';
// import Sample from './pages/dashboard/employeestatus';
// import LeaveCalender from './pages/dashboard/leavecalender';
// import HolidayCalender from './pages/dashboard/holidayCalender';
// import ManagerDashboard from './pages/dashboard/managerdashboard';
// import Details from './pages/user/Details';
// import UserDashboard from './pages/dashboard/userdashboard';
// import Regularised from './pages/user/Regularised';
// import LeaveBalance from './pages/user/LeaveBalance';
// import Sidebar from './components/sidebar';

// function App() {
//   const [userAuthenticated, setUserAuthenticated] = useState(false);

//   useEffect(() => {
//     setUserAuthenticated(true);
//   }, []);
 


  
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             userAuthenticated ? (
//               <Navigate to="/home" />
//             ) : (
//               <Navigate to="/signin" />
//             )
//           }
//         />
//         <Route path="/home" element={<Home />} />
//         <Route path="/addemployee" element={<Addemployee />} />
//         <Route path="/userdetails" element={<EmployeeDetails />} />
//         <Route path="/signin" element={<Signin />} />
//         <Route path='/signup' element={<Signup />} />
//         <Route path="/upload-image" element={<UploadImage />} />


//         <Route path='cal' element={<Calender1/>}/>
     
  
//      <Route path='/sidebar' element={<Sidebar />} />
//      <Route path='/empdetails' element={< EmployeeDetails/>}/>
//      <Route path='/adddepartment' element={<Adddepatment/>}/>
//      <Route path='/manage' element={<Managedept/>}/>
//      <Route path='/editDept' element={<EditDepartment/>}/>
//      <Route path='/editemp' element={<EditEmployee/>}/>
//      <Route path='/edit-emp' element={<EditEmp/>} />
//      <Route path='/manageemp' element={<Manageemp/>}/>
//      <Route path='/uploadempimg' element={<UploadImageEmp/>}/>
//      <Route path="/timer" element={<Timereg/>}/>
//      <Route path="/timedetails" element={<AttendanceDetails/>}/>
//      <Route path="/inout" element={<TimeInOutDetails/>}/>
//       <Route path="/admindashboard" element={<Admindashboard/>}/> 
//       <Route path="/reporting" element={<Reporting/>}/>
//       <Route path="/applyleave" element={<ApplyLeave/>}/>
//       <Route path='/status' element={<EditStatus/>}/>
//       <Route path='/calender' element={<Calender/>}/>
//       <Route path='/samplecalender' element={<Calendersample/>}/>
//       <Route path='/employeeStatus' element={<Sample/>}/>
//       <Route path='/leavecalender' element={<LeaveCalender/>}/>
//       <Route path='/holidaycalender' element={<HolidayCalender/>}/>

//       <Route path='/managerdashboard' element={<ManagerDashboard/>}/>
//       <Route path='/Details' element={<Details/>}/>
//       {/* <Route path='/sidebar1' element={<Sidebar1 />} /> */}

//       <Route path='/userdashboard' element={<UserDashboard/>}/>
//       <Route path='/Regularised' element={<Regularised/>}/>
//       <Route path='/LeaveBalance' element={<LeaveBalance/>}/>
//         {/* Add other routes... */}
//       </Routes>
//       <ToastContainer position="top-center" autoClose={1000} />
//     </Router>
//   );
// }

// export default App;

















