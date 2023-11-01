import BoardComponent from "./components/BoardComponent";
import {useEffect, useState} from "react";
import {Board} from "./models/Board"
import './App.css'


function App() {

    const [board, setBoard] = useState(new Board())

    const restart = () => {
        const newBoard = new Board()
        newBoard.initSquares()
        setBoard(newBoard)
    }

    useEffect(() => {
        restart()
    }, []);



    return <div className="app"><BoardComponent board={board} setBoard={setBoard} restart={restart}/></div>
}

export default App
