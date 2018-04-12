import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import './styles/normalize.css';
import './styles/skeleton.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;
