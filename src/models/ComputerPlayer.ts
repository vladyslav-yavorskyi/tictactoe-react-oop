import {Board} from "./Board";

export class ComputerPlayer {
    public board: Board;

    constructor(board: Board) {
        this.board = board
    }

    public makeMove() {
        const squares = this.board.squares;
        const availableSquares = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (squares[i][j].available) {
                    availableSquares.push([i, j]);
                }
            }
        }
        if (availableSquares.length === 0)
            return;
        
        const randomSquare = availableSquares[Math.floor(Math.random() * availableSquares.length)];
        squares[randomSquare[0]][randomSquare[1]].markSquare('o');
    }
}