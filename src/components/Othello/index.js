import React from 'react';
import { connect } from 'react-redux';
import './style.css';

import Board from './Board';

import { pieceNames } from './reducer';

const Othello = ({turn, board}) => (
  <div className="Othello">
    <div style={{padding: '1em'}}>
      Current turn: {pieceNames[turn] || ''}
    </div>
    <Board board={board} />
  </div>
);

export default connect(
  (state) => (state.othello)
)(Othello);
