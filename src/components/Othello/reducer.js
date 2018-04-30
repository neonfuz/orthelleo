import {
  memoizeWith,
  add,
  assoc,
  flatten,
  lensPath,
  lensProp,
  map,
  maxBy,
  over,
  path,
  reduce,
  set,
  view,
  xprod,
  zipWith,
} from 'ramda';

import {
  AI_PLACE,
  TRY_PLACE,
  RESTART,
} from './actions';

/* eslint no-sparse-arrays: 0 */

// Piece constants
const W = 'W', B = 'B';
const pieceNames = {W: 'white', B: 'black'};
const otherPlayer = {W: B, B: W};
export { W, B, pieceNames, otherPlayer };

const defaultOthello = {
  turn: B,
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

const allMoves = xprod([0,1,2,3,4,5,6,7], [0,1,2,3,4,5,6,7]);

const getPossibleMoves = memoizeWith(
  (b, p) => JSON.stringify({b,p}),
  (board, player) => {
    let possibleMoves = [];
    allMoves.forEach(pos => {
      const b = tryPlace(board, player, pos);
      if (b !== board)
        possibleMoves.push({move: pos, board: b});
    });
    return Object.freeze(possibleMoves);
  }
);

const randInt = max => Math.floor(Math.random() * max);

function randomPlace(board, player) {
  const possibleMoves = getPossibleMoves(board, player);
  return (possibleMoves.length === 0) ? (
    board
  ) : (
    possibleMoves[randInt(possibleMoves.length)].board
  );
}

function greedyPlace(board, player) {
  const possibleMoves = getPossibleMoves(board, player);
  return reduce(maxBy(calcScore), possibleMoves).board;
}

const addScore = map(move=>assoc('score', calcScore(move.board), move));

const flatMemo = memoizeWith(arr => arr.join(''));

const smartPlace = flatMemo((board, player, origPlayer=player, depth=0) => {
  const possibleMoves = addScore(getPossibleMoves(board, player));
  if (possibleMoves.length === 0)
    return board;
  const deepMoves = (depth > 65) ? possibleMoves : (
    possibleMoves.map(move=>smartPlace(board, otherPlayer[player], origPlayer || player, depth+1))
  );
  const best = deepMoves.reduce(maxBy(path(['score', origPlayer || player])));
  return depth === 0 ? best.board : best;
});

function reducer(state = defaultOthello, action) {
  const { turn, board } = state;
  switch (action && action.type) {
    case TRY_PLACE:
      const { x, y } = action.payload;
      const newBoard = tryPlace(board, turn, [y, x])
      if (board === newBoard)
        return state;
      return {
        turn: getPossibleMoves(newBoard, otherPlayer[turn]).length ?
              otherPlayer[turn] : turn,
        board: newBoard,
        score: calcScore(newBoard),
      };
    case AI_PLACE:
      const newBoard2 = turn === B ? smartPlace(board, turn) : randomPlace(board, turn);
      if (board === newBoard2)
        return state;
      return {
        turn: getPossibleMoves(newBoard, otherPlayer[turn]).length === 0 ?
              otherPlayer[turn] : turn,
        board: newBoard2,
        score: calcScore(newBoard2),
      };
    case RESTART:
      return defaultOthello;
    default:
      return state;
  }
}

export default reducer;
