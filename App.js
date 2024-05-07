import React, { useState } from 'react'; // Importing React library and useState hook for managing state
import './styles.css'; // Importing CSS file for styling

// React component for rendering individual squares
function Square( { value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
} 

// React component for rendering the game board
function Board( { xIsNext, squares, onPlay }) {
    // Function to handle square click events
    function handleClick(i) {
        // Ignore click if the game is won or square is already filled
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // Clone the current squares array
        const nextSquares = squares.slice();
        // Update the square with 'X' or 'O' based on current player
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        // Call the onPlay function to update the game state
        onPlay(nextSquares);
    }

    // Calculate the winner of the game
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    // Render the game board
    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
}

// Main game component
export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]); // State for storing game history
    const [currentMove, setCurrentMove] = useState(0); // State for tracking current move
    const xIsNext = currentMove % 2 === 0; // Boolean indicating if it's X's turn
    const currentSquares = history[currentMove]; // Get current squares configuration

    // Function to handle a move in the game
    function handlePlay(nextSquares) {
        // Update the game history with the new squares configuration
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1); // Update the current move
    }

    // Function to jump to a specific move in the game history
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    // Generate list of moves in the game
    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    // Render the game
    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

// Function to check if there's a winner in the game
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
