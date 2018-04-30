import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from '../Home';
import Othello from '../Othello';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/play" component={Othello} />
        </div>
      </Router>
    );
  }
}

export default App;
