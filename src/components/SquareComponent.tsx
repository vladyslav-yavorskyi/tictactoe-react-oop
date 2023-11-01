import {Square} from "../models/Square";

interface SquareProps {
    square: Square;
    click: (square: Square) => void;

}
export default function SquareComponent({square, click}: SquareProps) {
    return <div onClick={() => click(square)} className="square">
        {square.selectedBy === "x" ? "x" : square.selectedBy === "o" ? "o" : ""}
    </div>
}