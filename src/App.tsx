import BoardComponent from "./components/BoardComponent";
import {useEffect, useState} from "react";
import {Board} from "./models/Board"
import './App.css'
import {ComputerPlayer} from "./models/ComputerPlayer";
import CountContext from "./state/CountContext";


function App() {

    const [board, setBoard] = useState(new Board())
    const [computer, setComputer] = useState(new ComputerPlayer(board))

    const [countX, setCountX] = useState(0)
    const [countO, setCountO] = useState(0)
    const [draws, setDraws] = useState(0)


    const restart = () => {
        const newBoard = new Board()
        newBoard.initSquares()
        setBoard(newBoard)
        setComputer(new ComputerPlayer(newBoard))
    }

    useEffect(() => {
        restart()
    }, []);


    return (<CountContext.Provider value={{'x': setCountX, 'o': setCountO, "draw": setDraws}}>
            <div className="app">
                <BoardComponent board={board} setBoard={setBoard} restart={restart}
                                computer={computer}/>
                <div className="scores">
                    <p className="player"><span>PLAYER: </span> <span>{countX}</span></p>
                    <p className="player">TIE: {draws}</p>
                    <p className="player">COMPUTER: {countO}</p>
                </div>

            </div>
        </CountContext.Provider>
    )
}

export default App
