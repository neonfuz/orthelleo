/* eslint no-sparse-arrays: 0 */

// Piece constants
const W = 'W', B = 'B';
export { W, B };

const defaultState = {
  turn: 'white',
  board: [
    [ , , , , , , , ],
    [ , , , , , , , ],
    [ , , , , , , , ],
    [ , , ,W,B, , , ],
    [ , , ,B,W, , , ],
    [ , , , , , , , ],
    [ , , , , , , , ],
    [ , , , , , , , ],
  ],
};

function reducer(state = defaultState, action) {
  switch (action && action.type) {
    default: return state;
  }
}

export default reducer;
