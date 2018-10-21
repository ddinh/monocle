import React, { Component } from 'react';
import './App.css';
import QuestionPage from './pages/QuestionPage';
import QuestionFormPage from './pages/QuestionFormPage';
import AttendancePage from './pages/AttendancePage';
import PresentationPage from './pages/PresentationPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Store from './store';
import { Provider } from 'mobx-react';
import Loading from './components/Loading';

const store = new Store();

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Loading />
            <Navbar />
            <Route path="/question" exact={true} component={QuestionPage} />
            <Route path="/question/new" component={QuestionFormPage} />
            <Route path="/attendance" component={AttendancePage} />
            <Route path="/presentation" component={PresentationPage} />
          </div>
        </Router>
      </Provider>
    );
  }

  renderLoading = () => {
  };
}

export default App;
