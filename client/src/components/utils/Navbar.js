import { useState } from "react";
import { Link } from "react-router-dom";



export default function Navbar({ isAdmin }) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
        <img src="/ems.png" alt="EMS" className="logo" />
      <a href="" className="brand-name">
        EMS
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        
        {isAdmin ? (
            <>
            <ul>
            <li>
                <Link to="/create-event">New Event</Link>
              </li>
              <li>
                <Link to="/event">All Events</Link>
              </li>
              <li>
                <Link to="/reports">Reports</Link>
              </li>
             
              </ul>
            </>
          ) : (
            <>
            <ul>
              <li>
                <Link to="/userRegistered">Registered Events</Link>
              </li>
              <li>
                <Link to="/userDash">All Events</Link>
              </li>
              <li>
                <Link to="">Event Gallery</Link>
              </li>
              </ul>
            </>
          )}
       
      </div>
    </nav>
  );
}
