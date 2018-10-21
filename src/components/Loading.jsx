import React from 'react';
import { inject, observer } from 'mobx-react';

class Loading extends React.Component {
  render() {
    const { store } = this.props;

    if (!store.socket) {
      return <div className="loading">Establishing a connection...</div>;
    } else {
      return <div />;
    }
  }
}

export default inject('store')(observer(Loading));
