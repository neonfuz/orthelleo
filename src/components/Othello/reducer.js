import { lensPath, set, view } from 'ramda';

import { TRY_PLACE } from './actions';

/* eslint no-sparse-arrays: 0 */

// Piece constants
const W = 'W', B = 'B';
const pieceNames = {W: 'white', B: 'black'};
const nextTurn = {W: B, B: W};
export { W, B, pieceNames, nextTurn };

const defaultOthello = {
  turn: W,
  board: [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,W,B,0,0,0],
    [0,0,0,B,W,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
  ],
  score: {
    W: 2, B: 2, remaining: 62,
  }
};

function tryPlace(board, player, x, y) {
  const piece = lensPath([y, x]);
  if (view(piece, board) !== 0)
    return board;
  return set(lensPath([y, x]), player, board);
}

function reducer(state = defaultOthello, action) {
  const { turn, board, score } = state;
  switch (action && action.type) {
    case TRY_PLACE:
      const { x, y } = action.payload;
      const newBoard = tryPlace(board, turn, x, y)
      if (board === newBoard)
        return state;
      return {
        turn: nextTurn[turn],
        board: newBoard,
        score: score,
      };
    default:
      return state;
  }
}

export default reducer;
