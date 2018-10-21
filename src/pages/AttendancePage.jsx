import React from 'react';
import './AttendancePage.css';
import { inject, observer } from 'mobx-react';

class AttendancePage extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.send('getStudents');
  }

  handleUnlock = () => {
    const { store } = this.props;
    store.send('startAttendance');
  };

  handleLock = () => {
    const { store } = this.props;
    store.send('stopAttendance');
  };

  render() {
    const { attendanceUnlocked } = this.props.store;
    const { users } = this.props.store;

    return (
      <div className="attendance-page">
        <div className="col attendance-col">
          <div>
            {this.renderMessage()}

            {this.renderCode()}

            <div>
              {!attendanceUnlocked ? (
                <button className="attendance" onClick={this.handleUnlock}>
                  <i className="material-icons">lock_open</i>
                  Unlock Attendance
                </button>
              ) : (
                <button className="attendance" onClick={this.handleLock}>
                  <i className="material-icons">lock</i>
                  Lock Attendance
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col student-col">
          <div className="row row-header">Users</div>
          {users.map(name => (
            <div className="row row-item" key={name}>
              <i className="material-icons">person</i>
              {name}
            </div>
          ))}
        </div>
      </div>
    );
  }

  renderCode = () => {
    const { code, attendanceUnlocked } = this.props.store;
    if (attendanceUnlocked) {
      return <div className="code">{code}</div>;
    } else {
      return <div />;
    }
  };

  renderMessage = () => {
    const { attendanceUnlocked } = this.props.store;
    if (attendanceUnlocked) {
      return <div className="message">Waiting for users...</div>;
    } else {
      return <div className="message">Attendance is currenty locked.</div>;
    }
  };
}

export default inject('store')(observer(AttendancePage));
