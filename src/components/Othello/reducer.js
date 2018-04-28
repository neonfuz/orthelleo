import {
  add,
  flatten,
  lensPath,
  lensProp,
  over,
  set,
  view,
  xprod,
  zipWith,
} from 'ramda';

import { TRY_PLACE } from './actions';

/* eslint no-sparse-arrays: 0 */

// Piece constants
const W = 'W', B = 'B';
const pieceNames = {W: 'white', B: 'black'};
const otherPlayer = {W: B, B: W};
export { W, B, pieceNames, otherPlayer };

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

function calcScore(board) {
  const scores = flatten(board).reduce(
    (scores, cell) => over(lensProp(cell), add(1), scores),
    {0: 0, W: 0, B: 0}
  );
  // TODO fix up a bit
  return {
    W: scores.W,
    B: scores.B,
    remaining: scores[0]
  };
}

// Trace in 'move' direction and place pieces according to othello rules
// Returns 'board' unchanged if it doesn't find a valid trace
function trace(board, player, move, pos, depth=0) {
  switch (view(lensPath(move(pos)), board)) {
    case otherPlayer[player]:
      const newBoard = trace(board, player, move, move(pos), depth+1);
      if (newBoard === board) return board;
      return set(lensPath(pos), player, newBoard);
    case player:
      if (depth > 0)
        return set(lensPath(pos), player, board);
      return board;
    default:
      return board;
  }
}

// Move functions for all 8 directions
const moves = xprod([-1,0,1], [-1,0,1])
  .filter(([x,y]) => x || x !== y)
  .map(direction => zipWith(add, direction));

// Try to place the piece on the board at the given position
function tryPlace(board, player, pos) {
  // Make sure cell is empty
  if (view(lensPath(pos), board) !== 0)
    return board;

  // Trace in all 8 directions
  return moves.reduce(
    (board, move) => trace(board, player, move, pos),
    board
  );
}

function reducer(state = defaultOthello, action) {
  const { turn, board } = state;
  switch (action && action.type) {
    case TRY_PLACE:
      const { x, y } = action.payload;
      const newBoard = tryPlace(board, turn, [y, x])
      if (board === newBoard)
        return state;
      return {
        turn: otherPlayer[turn],
        board: newBoard,
        score: calcScore(newBoard),
      };
    default:
      return state;
  }
}

export default reducer;
