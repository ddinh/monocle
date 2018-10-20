import React from 'react';
import QuestionForm from '../components/QuestionForm';
import './QuestionPage.css';

export default class QuestionPage extends React.Component {
  render() {
    return (
      <div className="question-page">
        <QuestionForm />
      </div>
    );
  }
}
