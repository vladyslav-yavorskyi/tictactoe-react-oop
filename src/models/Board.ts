import {Square} from "./Square";


export class Board {

    squares: Square[][] = [];
    roundEnded = false;

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
        newBoard.roundEnded = this.roundEnded;
        return newBoard;
    }

    public isFull() {
        for (let i = 0; i < 3; i++) {
            const row = this.squares[i];
            for (let j = 0; j < row.length; j++) {
                const square = row[j];
                if (square.available) {
                    return false;
                }
            }
        }
        return true;
    }

    public endRound() {
        this.roundEnded = true;
    }

    public checkWinner() {
        const squares = this.squares;
        // check rows
        for (let i = 0; i < 3; i++) {
            if (squares[i][0].selectedBy === squares[i][1].selectedBy && squares[i][1].selectedBy === squares[i][2].selectedBy && squares[i][0].selectedBy !== null) {
                squares[i].forEach(square => square.isWinningSquare = true);
                this.roundEnded = true;
                return squares[i][0].selectedBy;
            }
        }
        // check columns
        for (let i = 0; i < 3; i++) {
            if (squares[0][i].selectedBy === squares[1][i].selectedBy && squares[1][i].selectedBy === squares[2][i].selectedBy && squares[0][i].selectedBy !== null) {
                squares.forEach(row => row[i].isWinningSquare = true);
                this.roundEnded = true;
                return squares[0][i].selectedBy;
            }
        }
        // check diagonals
        if (squares[0][0].selectedBy === squares[1][1].selectedBy && squares[1][1].selectedBy === squares[2][2].selectedBy && squares[0][0].selectedBy !== null) {
            squares.forEach((row, i) => row[i].isWinningSquare = true);
            this.roundEnded = true;
            return squares[0][0].selectedBy;
        }
        if (squares[0][2].selectedBy === squares[1][1].selectedBy && squares[1][1].selectedBy === squares[2][0].selectedBy && squares[0][2].selectedBy !== null) {
            squares.forEach((row, i) => row[2 - i].isWinningSquare = true);
            this.roundEnded = true;
            return squares[0][2].selectedBy;
        }

        if (this.isFull()) {
            this.roundEnded = true;
            return 'draw';
        }

        return null;
    }

}