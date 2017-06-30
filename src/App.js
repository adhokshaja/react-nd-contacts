import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class IntroPara extends Component{
  render() {
    return (
      <p className="App-intro">
        I've created this paragraph as a seperate component.
      </p>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Testing</h2>
        </div>
        <IntroPara/>
      </div>
    );
  }
}

export default App;
