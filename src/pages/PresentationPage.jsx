import React from 'react';
import Chart from 'chart.js';
import { observer, inject } from 'mobx-react';

import './PresentationPage.css';

class PresentationPage extends React.Component {
  componentDidMount() {}

  updateChart = () => {
    var ctx = document.getElementById('myChart');
    const answers = ['1', '1', '1', '1', '4', '3', '2'];
    const choices = ['1', '2', '3', '4'];
    const answerCount = {};

    answers.forEach(a => {
      if (!answerCount[a]) {
        answerCount[a] = 1;
      } else {
        answerCount[a]++;
      }
    });

    const data = choices.map(c => answerCount[c]);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: choices,
        datasets: [
          {
            label: 'Answers',
            data: data,
            backgroundColor: [
              'rgba(88, 44, 131, .85)',
              'rgba(88, 44, 131, .25)',
              'rgba(88, 44, 131, .17)',
              'rgba(88, 44, 131, .45)',
              'rgba(88, 44, 131, .75)',
              'rgba(88, 44, 131, 1)'
            ],
            borderColor: [
              'rgba(88, 44, 131, .85)',
              'rgba(88, 44, 131, .25)',
              'rgba(88, 44, 131, .2)',
              'rgba(88, 44, 131, .45)',
              'rgba(88, 44, 131, .75)',
              'rgba(88, 44, 131, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  };

  render() {
    const { store } = this.props;

    if (store.attendanceUnlocked) {
      return this.renderAttendanceCode(store.code);
    } else {
      return <div />;
    }
  }

  renderAttendanceCode(code) {
    return (
      <div className="presentation-page">
        <div className="code">{code}</div>
      </div>
    );
  }

  renderWaitingQuestion() {
    return (
      <div className="presentation-page">
        <div className="waiting">Waiting for question...</div>
      </div>
    );
  }

  renderWaitingResults() {
    return (
      <div className="presentation-page">
        <div className="waiting">Waiting for results...</div>
      </div>
    );
  }

  renderShortAnswer() {
    return (
      <div className="presentation-page">
        <div className="waiting">Short answer question.</div>
      </div>
    );
  }

  renderChart() {
    return (
      <div className="presentation-page">
        <div className="chart">
          <canvas id="myChart" width="100" height="100" />
        </div>
      </div>
    );
  }
}

export default inject('store')(observer(PresentationPage));
