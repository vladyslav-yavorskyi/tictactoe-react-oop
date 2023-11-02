import BoardComponent from "./components/BoardComponent";
import {useEffect, useState} from "react";
import {Board} from "./models/Board"
import './App.css'
import {ComputerPlayer} from "./models/ComputerPlayer";


function App() {

    const [board, setBoard] = useState(new Board())
    const [computer, setComputer] = useState(new ComputerPlayer(board))

    const restart = () => {
        const newBoard = new Board()
        newBoard.initSquares()
        setBoard(newBoard)
        setComputer(new ComputerPlayer(newBoard))
    }

    useEffect(() => {
        restart()
    }, []);



    return <div className="app"><BoardComponent board={board} setBoard={setBoard} restart={restart} computer={computer}/></div>
}

export default App
