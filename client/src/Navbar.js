import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isReceptionist }) => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/animals" activeClassName="active">
            Animals
          </NavLink>
        </li>
        <li>
          <NavLink to="/staff-members" activeClassName="active">
            Staff Members
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" activeClassName="active">
            Events
          </NavLink>
        </li>
        {isReceptionist && (<li>
          <NavLink to="/tickets" activeClassName="active">
            Tickets
          </NavLink>
        </li>)}
        <li>
          <NavLink to="/feedback" activeClassName="active">
            Feedback
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
