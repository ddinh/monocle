import React from 'react';
import './AttendancePage.css';

export default class AttendancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // can be 'locked' or 'unlocked'
      status: 'locked'
    };
  }

  handleUnlock = () => {
    this.setState({
      ...this.state,
      status: 'unlocked'
    });
  };

  handleLock = () => {
    this.setState({
      ...this.state,
      status: 'locked'
    });
  };

  render() {
    const { status } = this.state;
    return (
      <div className="attendance-page">
        {this.renderMessage()}

        <div>
          {status === 'locked' ? (
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
    );
  }

  renderMessage = () => {
    const { status } = this.state;
    if (status === 'locked') {
      return <div className="message">Attendance is currenty locked.</div>;
    } else {
      return <div className="message">Waiting for users...</div>;
    }
  };
}
