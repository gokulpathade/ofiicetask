import './App.css';
// import './components/App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom'
// import Home from './components/Folders/Home1';
// import Daily from './components/Folders/Daily';
// import Leave1 from './components/Folders/Leave1';
// import Employees from './components/Folders/Employees';
// import Department1 from './components/Folders/Department1';
// import Calender from './components/Folders/Calender'
// // import NavBar from './NavBar';
// import Signin from './components/Signin1';
// // import managerdashboard from './dashboard/ManagerDashboard';
// import ManagerDashboard from './dashboard/ManagerDashboard';

// import Daily from './components/Pages/Daily';
// import SignUp from './components/Pages/SignUp';






import AddDepartment from './components/admin/AddDepartment';
import AddEmployee from './components/admin/AddEmployee';
import AddEvents from './components/admin/AddEvents';
import AdminDashboard from './components/dashboard/AdminDashboard';
// import AdminSideBar from './components/dashboard/AdminSideBar';
import NavBar from './components/dashboard/NavBar';
import UserDashboard from './components/dashboard/UserDashboard';
// import UserSideBar from './components/dashboard/UserSideBar';
import TeamDetails from './components/manager/TeamDetails';
import TeamStatus from './components/manager/TeamStatus';
import Attendence from './components/pages/Attendence';
import Calender from './components/pages/Calender';
import DailyAttendence from './components/pages/DailyAttendence';
import HolidayCalender from './components/pages/HolidayCalender';
import LeaveApply from './components/pages/LeaveApply';
import Profile from './components/pages/Profile';
import Reporting from './components/pages/Reporting';
import SignIn from './components/pages/SignIn';
import Home from './components/pages/Home'
import ManagerDashboard from './components/dashboard/ManagerDashboard';
// import ManagerSideBar from './components/dashboard/ManagerSideBar';
import SideBar from './components/dashboard/SideBar';
import EmployeeDetails from './components/admin/EmployeeDetails';
import LeaveBalance from './components/pages/LeaveBalance';
import Regularised from './components/pages/Regularised';
import SignUp from './components/pages/SignUp';
import TeamLeave from './components/manager/TeamLeave';
import AdminCalender from'./components/admin/AdminCalender.jsx';

import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme();
function App() {

  return (
    <>
    <div className="App">
    
<BrowserRouter>

  <Routes>



<Route path='/' exact element={<SignIn />}/>

    <Route path='/Profile' exact element={<Profile />}/>
    <Route path='/EmployeeDetails' exact element={<EmployeeDetails/>}/>
    <Route path='/LeaveBalance' exact element={<LeaveBalance />}/>
    <Route path='/Profile' exact element={<Profile />}/>
    <Route path='/Profile' exact element={<Profile />}/>
   
    <Route path='/AddEmployee' exact element={<AddEmployee />}/>
    <Route path='/NavBar' exact element={< NavBar/>}/>
    <Route path='/HolidayCalender' exact element={<HolidayCalender />}/>
    <Route path='/Calender' exact element={< Calender/>}/>
    <Route path='/SignIn' exact element={< SignIn/>}/>
    <Route path='/SignUp' exact element={< SignUp/>}/>
    <Route path='/AddDepartment' exact element={<AddDepartment />}/>
    <Route path='/DailyAttendence' exact element={<DailyAttendence />}/>
    <Route path='/LeaveApply' exact element={< LeaveApply/>}/>
    <Route path='/Reporting' exact element={<Reporting />}/>
    <Route path='/UserDashboard' exact element={< UserDashboard/>}/>
    <Route path='/AdminDashboard' exact element={<AdminDashboard />}/>
    <Route path='/AdminCalender' exact element={< AdminCalender/>}/>
    <Route path='/AddEvents' exact element={<AddEvents />}/>
    <Route path='/TeamDetails' exact element={<TeamDetails />}/>
    <Route path='/TeamStatus' exact element={ < TeamStatus/> }/>
    <Route path='/TeamLeave' exact element={< TeamLeave/>}/>
    <Route path='/Attendence' exact element={< Attendence/>}/>
    <Route path='/ManagerDashboard' exact element={<ManagerDashboard/>}/>
  
    
    <Route path='/SideBar' exact element={<SideBar/>}/>
   
    <Route path='/Home' exact element={<Home/>}/>
    <Route path='/Regularised' exact element={<Regularised/>}/>
  

    
    </Routes>
</BrowserRouter>
    </div>
    </>
  );
}

export default App; 
