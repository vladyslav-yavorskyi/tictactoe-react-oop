import SquareComponent from "./SquareComponent";
import {Fragment, useState} from "react";
import {Square} from "../models/Square";
import {Board} from "../models/Board";
import {ComputerPlayer} from "../models/ComputerPlayer";

export interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    restart: () => void;
    computer: ComputerPlayer;
}
export default function BoardComponent({board, setBoard, restart, computer}: BoardProps) {


    const click = (square: Square) => {
        if (square.available) {
            square.markSquare("x")
            updateBoard()
        } else return

        if (board.checkWinner()) {
            setTimeout(() => {
                alert(`The winner is ${board.checkWinner()}`)

                restart()
            }, 500)
        } else {
            setTimeout(() => {
                computer.makeMove()
                updateBoard()
                if (board.checkWinner()) {
                    setTimeout(() => {
                        alert(`The winner is ${board.checkWinner()}`)

                        restart()
                    }, 500)
                }
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