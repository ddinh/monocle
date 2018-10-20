import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  render() {
    return <div className="navbar">
      <div className="logo">monocle</div>
      <div className="link">
        <Link to="/attendance">Attendance</Link>
        <Link to="/question">Current Question</Link>
        <Link to="/question/new">New Question</Link>
      </div>
    </div>
  }
}