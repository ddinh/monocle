import React from 'react';
import './QuestionPage.css';
import socket from '../socket';
import { Redirect } from 'react-router-dom';

var socketRef;
var socketRef2;

export default class QuestionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      answers: {},
      question: {},
      unlocked: false,
      redirect: false
    };
  }

  componentDidMount() {
    socketRef = () => {
      socket.send(
        JSON.stringify({
          type: 'getQuestionDetails',
          data: JSON.stringify({ id: '0' })
        })
      );
    };

    socketRef2 = e => {
      const response = JSON.parse(e.data);

      if (response.type === 'answerQuestion') {
        const answer = JSON.parse(response.data);

        this.setState({
          ...this.state,
          answers: { ...this.state.answers, [answer.name]: answer.answer }
        });
      }

      if (response.type === 'getQuestionDetailsResponse') {
        console.log('---------');
        console.log(response);
      }
    };

    socket.addEventListener('open', socketRef);
    socket.addEventListener('message', socketRef2);
  }

  componentWillUnmount() {
    socket.removeEventListener('open', socketRef);
    socket.removeEventListener('message', socketRef2);
  }

  handleLock = () => {
    socket.send(
      JSON.stringify({
        type: 'lockQuestion',
        id: this.state.id
      })
    );
  };

  render() {
    const { answers, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/questions/new" />;
    }

    return (
      <div className="question-page">
        <div className="question-col">
          <div>Question</div>
          {this.renderButton()}
        </div>

        <div className="answer-col row">
          <div className="col">
            <div className="row row-header">Name</div>
            {Object.keys(answers).map(name => (
              <div className="row row-item" key={name}>
                {name}
              </div>
            ))}
          </div>
          <div className="col">
            <div className="row row-header">Answer</div>
            {Object.keys(answers).map(name => (
              <div className="row row-item">{answers[name]}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  handleNew = () => {
    this.setState({
      redirect: true
    });
  };

  renderButton() {
    const { unlocked } = this.state;

    if (unlocked) {
      return <button onClick={this.handleLock}>Lock Answering</button>;
    } else {
      return <button onClick={this.handleNew}>New Question</button>;
    }
  }

  renderQuestion() {
    return <div>Name</div>;
  }
}
