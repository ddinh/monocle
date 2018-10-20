import React, { Component } from 'react';
import './App.css';
import QuestionPage from './pages/QuestionPage';
import AttendancePage from './pages/AttendancePage';
import PresentationPage from './pages/PresentationPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route
            path="/question/new"
            component={() => <QuestionPage socket={this.props.socket} />}
          />
          <Route path="/attendance" component={AttendancePage} />
          <Route path="/presentation" component={PresentationPage} />
        </div>
      </Router>
    );
  }
}

export default App;
