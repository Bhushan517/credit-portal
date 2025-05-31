import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

import logo from "../assets/baapcompany_logo.jpg";
const Dashboard = () => {
  return (
    <aside className="sidebar">
      <div className="logo-container"></div>
      <nav className="menu">
        <img src={logo} alt="logo" className="logo" /> <br /> <br />
        <ul>
          <li className="menu-item active">
            <span className="icon">📄</span>
            <Link to="/resume">
              <span>Resume</span>
            </Link>{" "}
          </li>
          <li className="menu-item">
            <span className="icon">📊</span>
            <Link to="/creditscore">
              <span>Credit Score</span>
            </Link>
          </li>
          <li className="menu-item">
            <span className="icon">✍️</span>
            <Link to="/tests">
              <span>Tests</span>
            </Link>{" "}
          </li>
          <li className="menu-item">
            <span className="icon">🏆</span>
            <span>Leader Board</span>
          </li>
          <li className="menu-item">
            <span className="icon">💼</span>
            <span>Jobs</span>
          </li>
          <li className="menu-item">
            <span className="icon">📑</span>
            <span>My Applications</span>
          </li>
        </ul>
      </nav>
      {/* <div className="user-profile">
        <div className="avatar">U</div>
        <div className="user-info">
          <span className="user-name">User Name</span>
          <span className="user-email">user@example.com</span>
        </div>
      </div> */}
    </aside>
    
  );
};

export default Dashboard;
