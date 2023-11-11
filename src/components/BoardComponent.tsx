import SquareComponent from "./SquareComponent";
import {Fragment, useContext} from "react";
import {Square} from "../models/Square";
import {Board} from "../models/Board";
import {ComputerPlayer} from "../models/ComputerPlayer";
import CountContext from "../state/CountContext";

export interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    restart: () => void;
    computer: ComputerPlayer;
}

export default function BoardComponent({board, setBoard, restart, computer}: BoardProps) {

    const counter = useContext(CountContext)

    const showWinner = () => {
        counter[board.checkWinner()]((prev: number) => prev + 1)

        // setTimeout(() => restart(), 500)
    }
    const click = (square: Square) => {
        if (!square.available) return
        square.markSquare("x")

        if (board.checkWinner()) {
            showWinner()
        } else {
            setTimeout(() => {
                computer.makeMove()
                updateBoard()
                if (board.checkWinner()) {
                    showWinner()
                } else {
                    if (board.isFull()) {
                        setTimeout(() => {
                            alert("Draw")
                            counter["draw"](prev => prev + 1)
                            restart()
                        }, 500)
                    }
                }
            }, 500)
            updateBoard()
            

        }
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return <div className="board">
        {board.squares.map((row, index: number) => {
            return <Fragment key={index}>
                {row.map((square: Square) => <SquareComponent board={board} square={square} click={click}
                                                              key={square.id}/>)}
            </Fragment>
        })}
    </div>
}