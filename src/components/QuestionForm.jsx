import React from 'react';
import './QuestionForm.css';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

class QuestionForm extends React.Component {
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

  handleSelectType = e => {
    this.setState({
      ...this.state,
      type: parseInt(e.target.value)
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

    this.props.store.send('createQuestion', data);
  };

  render() {
    const { question } = this.state;
    const { redirectQuestion } = this.props.store;

    if (redirectQuestion) {
      return <Redirect to="/question" />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label className="question">Question</label>
            <input
              type="text"
              className="question"
              value={question}
              placeholder="e.g. What is 1+1?"
              autoFocus={true}
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

          <button onClick={this.handleSubmit}>Create Question</button>
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
            <select value={numChoices} onChange={this.handleChangeNumChoices}>
              {[...Array(27).keys()].map(i => {
                return (
                  <option value={i} key={i}>
                    {i}
                  </option>
                );
              })}
            </select>

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
    const letter = String.fromCharCode(65 + number);

    return (
      <div className="choice" key={number}>
        <div className="choice-number">{letter}.</div>
        <input type="text" onChange={this.handleChoiceChange(letter)} />
      </div>
    );
  }
}

export default inject('store')(observer(QuestionForm));
