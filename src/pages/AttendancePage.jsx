import React from 'react';
import './AttendancePage.css';
import socket from '../socket';

var socketRef;
var socketRef2;

export default class AttendancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // can be 'locked' or 'unlocked'
      status: 'locked',
      users: ['abc', '123', 'a asoidjf oisjfio aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa']
    };
  }

  componentDidMount() {
    socketRef = () => {
      socket.send(
        JSON.stringify({
          type: 'getStudents'
        })
      );
    };

    socketRef2 = e => {
      const response = JSON.parse(e.data);

      if (response.type === 'getStudentsResponse') {
        const data = JSON.parse(response.data);

        this.setState({
          ...this.state,
          users: data.users,
          unlocked: data.unlocked
        });
      }
    };

    socket.addEventListener('open', socketRef);
    socket.addEventListener('message', socketRef2);
  }

  componentWillUnmount() {
    socket.removeEventListener('open', socketRef);
    socket.removeEventListener('message', socketRef2);
  }

  handleUnlock = () => {
    socket.send(
      JSON.stringify({
        type: 'startAttendance'
      })
    );

    this.setState({
      ...this.state,
      status: 'unlocked'
    });
  };

  handleLock = () => {
    socket.send(
      JSON.stringify({
        type: 'stopAttendance'
      })
    );

    this.setState({
      ...this.state,
      status: 'locked'
    });
  };

  render() {
    const { status } = this.state;
    return (
      <div className="attendance-page">
        <div className="col attendance-col">
          <div>
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
        </div>
        <div className="col student-col">
          <div className="row row-header">User</div>
          {this.state.users.map(name => (
            <div className="row row-item" key={name}>
              {name}
            </div>
          ))}
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
