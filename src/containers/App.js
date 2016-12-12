import React, { Component } from 'react';
import Header from '../components/Header';

import '../styles-local/App.css';


class App extends Component {

  render() {
    return (
      <div className="ops-container">
        <Header />
        <div className="container">{this.props.children}</div>
      </div>
    );
  }

}


export default App;
