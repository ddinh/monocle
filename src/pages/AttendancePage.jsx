import React from 'react';
import './AttendancePage.css';
import { inject, observer } from 'mobx-react';

class AttendancePage extends React.Component {
  constructor(props) {
    super(props);
  }

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
    const { attendanceUnlocked, code } = this.props.store;
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
                  Unlock Attendance
                </button>
              ) : (
                <button className="attendance" onClick={this.handleLock}>
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
