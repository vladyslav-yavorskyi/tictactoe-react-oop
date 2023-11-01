import SquareComponent from "./SquareComponent";
import {Fragment, useState} from "react";
import {Square} from "../models/Square";
import {Board} from "../models/Board";

export interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    restart: () => void;
}
export default function BoardComponent({board, setBoard, restart}: BoardProps) {

    const [currentPlayer, setCurrentPlayer] = useState<"x" | "o">("x")

    const click = (square: Square) => {
        if (square.available)
            square.markSquare(currentPlayer)
            setCurrentPlayer(currentPlayer === "x" ? "o" : "x")
            updateBoard()
        if (board.checkWinner()) {
            setTimeout(() => {
                alert(`The winner is ${board.checkWinner()}`)

                restart()
                setCurrentPlayer("x")
            }, 500)
        }
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return <div className="board">
        {board.squares.map((row, index: number) => {
            return <Fragment key={index}>
                {row.map((square: Square) => <SquareComponent square={square} click={click} key={square.id}/>)}
            </Fragment>
        })}
    </div>
}