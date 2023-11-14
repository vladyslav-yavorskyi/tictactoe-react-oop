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
    }
    const click = (square: Square) => {
        if (!square.available) return
        square.markSquare("x")

        if (board.checkWinner()) {
            showWinner()
        } else {
            setTimeout(() => {
                computer.makeMove()
                board.checkWinner() && board.endRound()
                updateBoard()

                if (board.checkWinner()) {
                    board.endRound()
                    showWinner()
                } else {
                    if (board.isFull()) {
                        setTimeout(() => {
                            showWinner()
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

    return <div className="game">
        <div className='board'>
            {board.squares.map((row, index: number) => {
                return <Fragment key={index}>
                    {row.map((square: Square) => <SquareComponent board={board} square={square} click={click}
                                                                  key={square.id}/>)}
                </Fragment>
            })}
        </div>
        <div className="restart" style={{display: board.roundEnded ? "block" : "none"}} onClick={restart}>Restart</div>
    </div>
}