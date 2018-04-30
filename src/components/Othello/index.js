import React from 'react';
import { connect } from 'react-redux';
import './style.css';

import Board from './Board';
import { aiPlace, tryPlace, restart } from './actions';
import { pieceNames } from './reducer';

const Othello = ({turn, board, aiPlace, tryPlace, restart, score}) => (
  <div className="Othello">
    <Board board={board} onClickCell={tryPlace} />
    <div className="Othello-sidebar">
      <div className="sidebar-turn">
        Current turn: {pieceNames[turn] || ''}
      </div>
      <div className="score-B">black: {score.B}</div>
      <div className="score-W">white: {score.W}</div>
      <div className="score-0">remaining: {score.remaining}</div>
      <div className="sidebar-buttons">
        <button onClick={aiPlace}>AI move</button>
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  </div>
);

export default connect(
  (state) => (state.othello),
  { tryPlace, aiPlace, restart }
)(Othello);
