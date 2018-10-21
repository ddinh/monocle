import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  render() {
    if (window.location.pathname === '/presentation') { 
      return ''
    }

    return (
      <div className="navbar">
        <div className="logo">monocle</div>
        <div className="links">
          <Link to="/attendance">Attendance</Link>
          <Link to="/question">Current Question</Link>
        </div>
        <a className="presentation" href="/presentation" target="_blank">
          Presentation
        </a>
      </div>
    );
  }
}
