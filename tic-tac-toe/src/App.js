
import * as React from 'react';

function Board() {
  // const squares = Array(9).fill(null);
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [nextValue, setNextValue] = React.useState(calculateNextValue(squares));

  function selectSquare(square) {
    if (squares[square]) return;

    const nextSquares = squares.slice();
    nextSquares[square] = nextValue;
    setSquares(nextSquares);

    setNextValue(calculateNextValue(nextSquares));
  }

  function restart() {
    const nextSquares = Array(9).fill(null);
    setSquares(nextSquares);
    setNextValue(calculateNextValue(nextSquares));
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  return (
    <div >
      <div className='text-black text-5xl mb-2 font-bold text-center'>TIC TAC TOE</div>
      <div className='text-black text-xl font-bold text-center'>{status}</div>
      <div className='container aspect-square mx-auto max-w-lg columns-3'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      <div className='grid place-content-center'>
        <button className='border-4 border-blue-200 text-white p-4 rounded-lg bg-blue-600 hover:bg-blue-800' onClick={restart}>
          restart
        </button>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div >
      <div >
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
