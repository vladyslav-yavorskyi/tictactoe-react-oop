import {Square} from "../models/Square";
import {Board} from "../models/Board";

interface SquareProps {
    square: Square;
    board: Board;
    click: (square: Square) => void;

}

export default function SquareComponent({square, board, click}: SquareProps) {

    console.log(board.roundEnded)

    return <div onClick={() => click(square)} className="square">
        {square.selectedBy &&
            <div
                className={["container appear ", square.isWinningSquare ? "blink" : board.roundEnded ? 'darkened' : ''].join(" ")}
                data-content={square.selectedBy === "x" ? "x" : square.selectedBy === "o" ? "o" : ""}></div>}
    </div>
}