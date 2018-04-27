import React, { Component } from 'react';
import './App.css';

import Othello from '../Othello';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">
            Othello
          </div>
        </header>
        <Othello />
      </div>
    );
  }
}

export default App;
