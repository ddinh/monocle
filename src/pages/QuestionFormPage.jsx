import React from 'react';
import QuestionForm from '../components/QuestionForm';
import './QuestionFormPage.css';

export default class QuestionFormPage extends React.Component {
  render() {
    return (
      <div className="question-form-page">
        <QuestionForm />
      </div>
    );
  }
}
