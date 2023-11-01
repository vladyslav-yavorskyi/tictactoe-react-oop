import {Square} from "./Square";


export class Board {

    squares: Square[][] = [];

    public initSquares() {
        for (let i = 0; i < 3; i++) {
            const row: Square[] = [];
            for (let j = 0; j < 3; j++) {
                row.push(new Square(null));
            }
            this.squares.push(row);
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.squares = this.squares;
        return newBoard;
    }

    public checkWinner() {
        const squares = this.squares;
        console.log(squares)
        // check rows
        for (let i = 0; i < 3; i++) {
            if (squares[i][0].selectedBy === squares[i][1].selectedBy && squares[i][1].selectedBy === squares[i][2].selectedBy && squares[i][0].selectedBy !== null) {
                return squares[i][0].selectedBy;
            }
        }
        // check columns
        for (let i = 0; i < 3; i++) {
            if (squares[0][i].selectedBy === squares[1][i].selectedBy && squares[1][i].selectedBy === squares[2][i].selectedBy && squares[0][i].selectedBy !== null) {
                return squares[0][i].selectedBy;
            }
        }
        // check diagonals
        if (squares[0][0].selectedBy === squares[1][1].selectedBy && squares[1][1].selectedBy === squares[2][2].selectedBy && squares[0][0].selectedBy !== null) {
            return squares[0][0].selectedBy;
        }
        if (squares[0][2].selectedBy === squares[1][1].selectedBy && squares[1][1].selectedBy === squares[2][0].selectedBy && squares[0][2].selectedBy !== null) {
            return squares[0][2].selectedBy;
        }
        return null;
    }

}