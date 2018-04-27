import React from 'react';

const Piece = ({type}) => (
  <div className={`Piece-${type}`} />
);

const Cell = ({x, y, type}) => (
  <div className={`Cell`}
       style={{ gridRow: y+1, gridColumn: x+1 }}>
    <Piece type={type} />
  </div>
);

const Board = ({board}) => (
  <div className="Board">
    { board.map((row, y) =>
      row.map((type, x) => (
        <Cell {...{x, y, type}} key={`Cell-${x}-${y}`} />
      ))
    ) }
  </div>
);

export default Board;
