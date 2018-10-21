import React from 'react';
import './TranscriptionPage.css';
import { inject, observer } from 'mobx-react';

class TranscriptionPage extends React.Component {
  render() {
    const { transcription } = this.props.store;
    return (
      <div className="transcription-page">
        <div className="text">{transcription}</div>
      </div>
    );
  }
}

export default inject('store')(observer(TranscriptionPage));
