import React, { Component } from 'react';
import './App.css';
import QuestionPage from './pages/QuestionPage';
import AttendancePage from './pages/AttendancePage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/question" component={QuestionPage} />
          <Route path="/attendance" component={AttendancePage} />
        </div>
      </Router>
    );
  }
}

export default App;
