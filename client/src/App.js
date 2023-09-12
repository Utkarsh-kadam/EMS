import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import { ShowEventList } from "./components/showEvent";
import { CreateEvent } from "./components/createEvent";
import Login from "./components/Logincomp";
import Registration from "./components/Registercomp";
import "./App.scss";

function App() {
    return (
        <div className="app-contents">
            <BrowserRouter>
                <Routes> 
                    <Route path="/" element={<Login/>} />
                    <Route exact path="/event" element={<ShowEventList/>} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/Register" element={<Registration />} />

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
