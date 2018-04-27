import React from 'react';

const Piece = ({type}) => (
  <div className={`Piece-${type}`} />
);

const Cell = ({x, y, type, onClickCell}) => (
  <div className={`Cell`}
       style={{ gridRow: y+1, gridColumn: x+1 }}
       onClick={() => onClickCell(x, y)}>
    <Piece type={type} />
  </div>
);

const Board = ({board, onClickCell}) => (
  <div className="Board">
    { board.map((row, y) =>
      row.map((type, x) => (
        <Cell {...{x, y, type, onClickCell}} key={`Cell-${x}-${y}`} />
      ))
    ) }
  </div>
);

export default Board;
