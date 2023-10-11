import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import { ShowEventList } from "./components/admin/showEvent";
import { CreateEvent } from "./components/admin/createEvent";
import { UserDash } from "./components/user/userDash";
import  UserRegistered  from "./components/user/userRegistered";
import Login from "./components/auth/Logincomp";
import Registration from "./components/auth/Registercomp";
import Reports from "./components/admin/reports"
import FeedbackForm from "./components/user/FeedbackForm";
import MarkAttendance from "./components/user/AttendanceForm";
import FeedbackAnalysis from './components/admin/FeedbackAnalysis';
import AttendanceReport from "./components/admin/AttendanceReport";
import RPP from "./components/admin/RPP";
import Notice from "./components/admin/Notice";
import "./App.scss";

function App() {
    return (

        <div className="app-contents">
            <BrowserRouter>
                <Routes> 
                    <Route path="/" element={<Login/>} />
                    <Route exact path="/event" element={<ShowEventList/>} /> //show all events and actions currently admin dash
                    <Route exact path="/userDash" element={<UserDash/>} /> //show all events 
                    <Route exact path="/userRegistered" element={<UserRegistered/>} /> //show registred events only currently user dashboard
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/Register" element={<Registration />} />
                    <Route path="/reports" element={<Reports />} /> //event records for admin dash
                    <Route path="/feedback/:eventId/:userId/:name" element={<FeedbackForm/>} />
                    <Route path="/attendance/:eventId/:userId/:name" element={<MarkAttendance />} />
                    <Route path="/feedback-analysis/:eventId/:eventName/:eventDate" element={<FeedbackAnalysis/>} />
                    <Route path="/attendance-report/:eventId/:eventName/:eventDate" element={<AttendanceReport/>} />
                    <Route path="/rpp/:eventId" element={<RPP/>} />
                    <Route path="/notice/:eventId/:eventName/:eventDate/:venue" element={<Notice/>} />


                    
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
