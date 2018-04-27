/* eslint no-sparse-arrays: 0 */

// Piece constants
const W = 'W', B = 'B';
const pieceNames = {W: 'white', B: 'black'};
export { W, B, pieceNames };

const defaultState = {
  othello: {
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
  }
};

function reducer(state = defaultState, action) {
  switch (action && action.type) {
    default: return state;
  }
}

export default reducer;
