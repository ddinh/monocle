import React from 'react';
import './QuestionForm.css';

export default class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      type: 1,
      numChoices: 4,
      choices: {}
    };
  }

  handleSelectType = e => {
    this.setState({
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

  handleChoiceChange = (i) => (e) => {
    const choices = this.state.choices;
    choices[i] = e.target.value;

    this.setState({
      ...this.state,
      choices: choices
    })
  }

  handleQuestionChange = (e) => {
    this.setState({
      ...this.state,
      question: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const data = this.state;
    data.choices = Object.values(data.choices)

    const payload = {
      type: "QuestionPOST",
      data: JSON.stringify(data)
    }

    console.log(payload);
  };

  render() {
    const { question } = this.state;
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

    if (type == 1) {
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
      <div className="choice">
        <div className="choice-number">{number})</div>
        <input type="text" onChange={this.handleChoiceChange(number)}/>
      </div>
    );
  }
}
