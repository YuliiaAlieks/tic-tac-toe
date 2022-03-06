import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

// class Square extends React.Component {
//     render() {
//         return (
//             <button
//                 className="square"
//                 onClick={() => this.props.onClick()}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }


function Board(props) {
    const renderSquare = (i) => {
        return (<Square
            value={props.squares[i]}
            onClick={() => props.onClick(i)}
        />);
    }

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

// class Board extends React.Component {
//     renderSquare(i) {
//         return (<Square
//             value={this.props.squares[i]}
//             onClick={() => this.props.onClick(i)}
//         />);
//     }

//     render() {
//         return (
//             <div>
//                 <div className="board-row">
//                     {this.renderSquare(0)}
//                     {this.renderSquare(1)}
//                     {this.renderSquare(2)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(3)}
//                     {this.renderSquare(4)}
//                     {this.renderSquare(5)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(6)}
//                     {this.renderSquare(7)}
//                     {this.renderSquare(8)}
//                 </div>
//             </div>
//         );
//     }
// }


function Game() {
    const [state, setState] = useState({
        history: [{ squares: Array(9).fill(null) }],
        xIsNext: true
    });

    const handleClick = (i) => {
        const history = state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = state.xIsNext ? 'X' : 'O';
        setState({
            history: history.concat(
                [{
                    squares: squares,
                }]),
            xIsNext: !state.xIsNext
        });
    }


    const showPlayer = () => {
        const history = state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        if (winner) {
            return `Winner: ${winner}`;
        } else {
            return 'Next player: ' + (state.xIsNext ? 'X' : 'O');
        }
    }


    const player = showPlayer();

    const current = state.history[state.history.length - 1];

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)} />
            </div>
            <div className="game-info">
                <div>{player}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}

// class Game extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             history: [
//                 {
//                     squares: Array(9).fill(null),
//                 }
//             ],
//             xIsNext: true
//         };
//     }

//     handleClick(i) {
//         const history = this.state.history;
//         const current = history[history.length - 1];
//         const squares = current.squares.slice();
//         if (calculateWinner(squares) || squares[i]) {
//             return;
//         }
//         squares[i] = this.state.xIsNext ? 'X' : 'O';
//         this.setState({
//             history: history.concat(
//                 [{
//                     squares: squares,
//                 }]),
//             xIsNext: !this.state.xIsNext
//         });


//     }

//     render() {
//         const history = this.state.history;
//         const current = history[history.length - 1];
//         const winner = calculateWinner(current.squares);
//         let status;
//         if (winner) {
//             status = `Winner: ${winner}`;
//         } else {
//             status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//         }

//         return (
//             <div className="game">
//                 <div className="game-board">
//                     <Board 
//                     squares={current.squares}
//                     onClick={(i) => this.handleClick(i)} />
//                 </div>
//                 <div className="game-info">
//                     <div>{status}</div>
//                     <ol>{/* TODO */}</ol>
//                 </div>
//             </div>
//         );
//     }
// }

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


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