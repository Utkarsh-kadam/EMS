import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import { ShowEventList } from "./components/showEvent";
import { CreateEvent } from "./components/createEvent";
import { UserDash } from "./components/userDash";
import  UserRegistered  from "./components/userRegistered";
import Login from "./components/Logincomp";
import Registration from "./components/Registercomp";
import Records from "./components/records"
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
                    <Route path="/reports" element={<Records />} />



                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
