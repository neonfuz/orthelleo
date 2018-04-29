import React from 'react';
import { connect } from 'react-redux';
import './style.css';

import Board from './Board';
import { aiPlace, tryPlace } from './actions';
import { pieceNames } from './reducer';

const Othello = ({turn, board, aiPlace, tryPlace, score}) => (
  <div className="Othello">
    <div style={{padding: '1em'}}>
      Current turn: {pieceNames[turn] || ''}
    </div>
    <Board board={board} onClickCell={tryPlace} />
    <div style={{padding: '1em'}}>
      black: {score.B}, white: {score.W}, remaining: {score.remaining}
    </div>
    <button onClick={aiPlace}>AI move</button>
  </div>
);

export default connect(
  (state) => (state.othello),
  { tryPlace, aiPlace }
)(Othello);
