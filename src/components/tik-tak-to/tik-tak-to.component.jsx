import React from 'react';
import Square from '../square/square.component';

class TikTakToComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            board: [[null, null, null],
            [null, null, null],
            [null, null, null]],
            currentPlayer: 'o',
            winner: null,
            tie: false
        }
    }

    onTick = (rowIndex, columnIndex) => {
        if (this.state.winner || this.state.tie) {
            return;
        }

        let newBoard = this.state.board;
        newBoard[rowIndex][columnIndex] = this.state.currentPlayer;
        let currentPlayer = this.state.currentPlayer;

        let winner;
        if (this.evaluateWin(currentPlayer, newBoard)) {
            winner = currentPlayer;
        }

        let tie = this.evaluateTie(newBoard, winner);

        if (!winner) {
            currentPlayer = currentPlayer === 'o' ? 'x' : 'o';
        }

        this.setState({
            board: newBoard,
            currentPlayer: currentPlayer,
            winner: winner,
            tie: tie
        });
    }

    evaluateTie(board, winner) {
        let done = true;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === null) {
                    done = false;
                }
            }
        }

        return done && !winner;
    }

    evaluateWin(currentPlayer, board) {
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] === currentPlayer &&
                board[i][1] === currentPlayer &&
                board[i][2] === currentPlayer) {
                return true;
            }
        }

        for (let i = 0; i < board.length; i++) {
            if (board[0][i] === currentPlayer &&
                board[1][i] === currentPlayer &&
                board[2][i] === currentPlayer) {
                return true;
            }
        }

        if (board[0][0] === currentPlayer &&
            board[1][1] === currentPlayer &&
            board[2][2] === currentPlayer) {
            return true;
        }

        if (board[0][3] === currentPlayer &&
            board[1][1] === currentPlayer &&
            board[3][0] === currentPlayer) {
            return true;
        }

        return false;
    }

    render() {
        return (
            <div className='tik-tak-to-container'>
                {
                    <h2>{`Current player: ${this.state.currentPlayer}`}</h2>
                }
                {
                    (this.state.board.map((row, rowIndex) => (
                        <div>
                            {row.map((value, columnIndex) => (
                                <Square rowIndex={rowIndex} columnIndex={columnIndex} value={value} onTick={this.onTick}></Square>
                            ))}
                        </div>
                    )))
                }

                {
                    this.state.winner ?
                        <h2>{`Player ${this.state.winner} won`}</h2> :
                        null
                }

                {
                    this.state.tie ?
                        <h2>It is a tie</h2> :
                        null
                }

            </div>



        );
    }
}

export default TikTakToComponent;