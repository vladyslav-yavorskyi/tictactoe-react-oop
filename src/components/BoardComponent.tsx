import SquareComponent from "./SquareComponent";
import {Fragment, useContext} from "react";
import {Square} from "../models/Square";
import {Board} from "../models/Board";
import {ComputerPlayer} from "../models/ComputerPlayer";
import CountContext from "../state/CountContext";
import useSound from "use-sound";

export interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    restart: () => void;
    computer: ComputerPlayer;
}

export default function BoardComponent({board, setBoard, restart, computer}: BoardProps) {

    const counter = useContext(CountContext)
    const [play] = useSound(
        '/assets/audio/click.wav',
        {volume: 0.25}
    );
   

    const showWinner = () => {
        counter[board.checkWinner()]((prev: number) => prev + 1)
        setTimeout(() => {
            play()
            setTimeout(() => {
                play()
                setTimeout(() => {
                    play()
                }, 200)
            }, 200)
        }, 200)


    }
    const click = (square: Square) => {
        if (!square.available) return
        square.markSquare("x")
        play();
        if (board.checkWinner()) {
            showWinner()
        } else {
            setTimeout(() => {
                computer.makeMove()
                play();
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