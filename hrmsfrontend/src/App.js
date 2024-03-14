import './App.css';
import AddDepartment from './components/admin/AddDepartment';
import AddEmployee from './components/admin/AddEmployee';
import AddEvents from './components/admin/AddEvents';
import AdminDashboard from './components/dashboard/AdminDashboard';
import AdminSideBar from './components/dashboard/AdminSideBar';
import NavBar from './components/dashboard/NavBar';
import UserDashboard from './components/dashboard/UserDashboard';
import UserSideBar from './components/dashboard/UserSideBar';
import TeamDetails from './components/manager/TeamDetails';
import TeamStatus from './components/manager/TeamStatus';
import Attendence from './components/pages/Attendence';
import Caleander from './components/pages/Caleander';
import DailyAttendence from './components/pages/DailyAttendence';
import HolidayCalender from './components/pages/HolidayCalender';
import LeaveApply from './components/pages/LeaveApply';
import Profile from './components/pages/Profile';
import Reporting from './components/pages/Reporting';
import SignIn from './components/pages/SignIn';

function App() {
  return (
    <>
    <div className='container-fluid'>
    <NavBar/>
    <HolidayCalender/>
    <Caleander/>
    <SignIn/>
    <AddDepartment/>
    <AddEmployee/>
    <Profile/>
    <DailyAttendence/>
    <Attendence/>
    <LeaveApply/>
    <Reporting/>
    <UserDashboard/>
    <UserSideBar/>
    <AdminDashboard/>
    <AdminSideBar/>
    <AddEvents/>
    <TeamDetails/>
    <TeamStatus/>
    
    </div>
   

    </>
  );
}

export default App;
