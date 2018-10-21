import React from 'react';
import './QuestionPage.css';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      unlocked: false,
      redirect: false
    };
  }

  componentDidMount() {
    const { store } = this.props;
    store.send('getQuestionDetails', { id: 0 });
  }

  handleLock = () => {
    this.props.store.send('lockQuestion', { id: this.state.id });
  };

  render() {
    const { redirect } = this.state;
    const { answers } = this.props.store;

    if (redirect) {
      return <Redirect to="/question/new" />;
    }

    return (
      <div className="question-page">
        <div className="question-col">
          {this.renderQuestion()}
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
              <div className="row row-item" key={name}>
                {answers[name]}
              </div>
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

  handleRemove = () => {
    const { store } = this.props;
    store.send('removeQuestion');
  };

  renderButton() {
    const { unlocked, question } = this.state;

    if (unlocked) {
      return <button onClick={this.handleLock}>Lock Answering</button>;
    } else {
      return (
        <div>
          <button onClick={this.handleNew}>New Question</button>
          {this.renderHideQuestion()}
        </div>
      );
    }
  }

  renderHideQuestion() {
    const { question } = this.props.store;
    if (question) {
      return <button onClick={this.handleRemove}>Remove Question</button>;
    } else {
      return <div />;
    }
  }

  renderQuestion() {
    const { question } = this.props.store;

    if (question) {
      return <div className="message">Question: {question.question}</div>;
    } else {
      return <div className="message">No question in progress.</div>;
    }
  }
}

export default inject('store')(observer(QuestionPage));
