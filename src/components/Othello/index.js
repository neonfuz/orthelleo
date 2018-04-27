import React from 'react';
import { connect } from 'react-redux';
import './style.css';

import Board from './Board';
import { tryPlace } from './actions';
import { pieceNames } from './reducer';

const Othello = ({turn, board, tryPlace}) => (
  <div className="Othello">
    <div style={{padding: '1em'}}>
      Current turn: {pieceNames[turn] || ''}
    </div>
    <Board board={board} onClickCell={tryPlace} />
  </div>
);

export default connect(
  (state) => (state.othello),
  { tryPlace }
)(Othello);
