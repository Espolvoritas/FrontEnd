import {React, useState} from "react";
import '../css/gameboard.css';
import Dice from 'react-dice-roll';

const GameBoard = () => {
    const [actualTurn, setData] = useState("")

    const ws2 = new WebSocket("ws://localhost:8000/gameboard/A DEFINIR")
    ws2.onmessage = (event) => {
        setData(JSON.parse(event.actualTurn));
    };

    const ws = new WebSocket("ws://localhost:8000/gameboard/${userID}/rollDice")

    return (
     <div className="background-image">
        <div className="DiceRoll">
            <Dice placement="botton-left" faceBg="black" size="70" onRoll={(value) => ws.send(value)}/>
        </div>
        <div className="Turn">
            <h1>Esta jugando el detective: {actualTurn}</h1>
        </div>
    </div>
    )
}

export default GameBoard;

