import React, { Component } from 'react';
import './App.css';
import QuestionPage from './pages/QuestionPage';
import QuestionFormPage from './pages/QuestionFormPage';
import AttendancePage from './pages/AttendancePage';
import PresentationPage from './pages/PresentationPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import socket from './socket';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: true
    };
  }

  componentDidMount() {
    var socketOpen = false;

    setTimeout(() => {
      if (!socketOpen) {
        this.setState({
          connected: false
        });
      }
    }, 1000);

    socket.addEventListener('open', () => {
      this.setState({
        connected: true
      });

      socketOpen = true;
    });

    socket.addEventListener('close', () => {
      if (socketOpen) {
        this.setState({
          connected: false
        });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/* {this.renderLoading()} */}
          <Navbar />
          <Route path="/question" exact={true} component={QuestionPage} />
          <Route path="/question/new" component={QuestionFormPage} />
          <Route path="/attendance" component={AttendancePage} />
          <Route path="/presentation" component={PresentationPage} />
        </div>
      </Router>
    );
  }

  renderLoading = () => {
    const { connected } = this.state;

    if (!connected) {
      return <div className="loading">Establishing a connection...</div>;
    } else {
      return <div />;
    }
  };
}

export default App;
