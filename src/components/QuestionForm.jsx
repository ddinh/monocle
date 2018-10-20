import React from 'react';
import './QuestionForm.css';
import socket from '../socket.js';
import { Redirect } from 'react-router-dom';

var socketRef;

export default class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      type: 1,
      numChoices: 4,
      choices: {},
      redirect: false
    };
  }

  componentDidMount() {
    socketRef = e => {
      const obj = JSON.parse(e.data);

      if (obj.type === 'createQuestionResponse') {
        const data = JSON.parse(obj.data);

        if (data.status === 0) {
          this.setState({
            redirect: true
          });
        }
      }
    };

    socket.addEventListener('message', socketRef);
  }

  componentWillUnmount() {
    socket.removeEventListener('message', socketRef);
  }

  handleSelectType = e => {
    this.setState({
      ...this.state,
      type: e.target.value
    });
  };

  handleChangeNumChoices = e => {
    if (e.currentTarget.value) {
      this.setState({
        ...this.state,
        numChoices: parseInt(e.currentTarget.value)
      });
    }
  };

  handleChoiceChange = i => e => {
    const choices = this.state.choices;
    choices[i] = e.target.value;

    this.setState({
      ...this.state,
      choices: choices
    });
  };

  handleQuestionChange = e => {
    this.setState({
      ...this.state,
      question: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = this.state;
    data.choices = Object.values(data.choices);
    delete data.redirect;

    const payload = {
      type: 'createQuestion',
      data: JSON.stringify(data)
    };

    socket.send(JSON.stringify(payload));
  };

  render() {
    const { question, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/question" />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="">Question</label>
            <input
              type="text"
              className="question"
              value={question}
              onChange={this.handleQuestionChange}
            />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <select onChange={this.handleSelectType}>
              <option value="1">Multiple Choice</option>
              <option value="0">Short Answer</option>
            </select>
          </div>

          {this.renderMultipleChoiceFields()}

          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }

  renderMultipleChoiceFields = () => {
    const { type, numChoices } = this.state;

    if (type === 1) {
      return (
        <div>
          <div>
            <label htmlFor="">Number of choices</label>
            <input
              type="number"
              value={numChoices}
              onChange={this.handleChangeNumChoices}
            />

            <label htmlFor="">Answer Choices</label>
            {[...Array(numChoices).keys()].map(i => this.renderChoiceField(i))}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  };

  renderChoiceField(number) {
    return (
      <div className="choice" key={number}>
        <div className="choice-number">{number})</div>
        <input type="text" onChange={this.handleChoiceChange(number)} />
      </div>
    );
  }
}
