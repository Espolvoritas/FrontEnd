import {React, useState, useRef, useEffect} from "react";
import '../css/gameboard.css';
import Dice from 'react-dice-roll';
import { useHistory } from "react-router-dom";
import {Suspicion, ShowSuspicion} from "./suspicion"

const GameBoard = () => {

    const history = useHistory()
    const datahost = history.location.state
    const ws = useRef(null);

    const [actualTurn, setData] = useState("")

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8000/gameBoard/" 
                                + String(datahost["player_id"]) + "/rollDice")
        ws.current.onmessage = (event) => {
            setData(JSON.parse(event.data));
        };
    }, []);

    return (
    <div className="background-image">
        <div className="DiceRoll">
            <Dice placement="botton-left" faceBg="black" size="70" 
                onRoll={(value) => ws.current.send(value)}/>
        </div>
        <div className="Turn">
            <h1>Esta jugando el detective: {actualTurn}</h1>
        </div>
    </div>
    );
}

export default GameBoard;