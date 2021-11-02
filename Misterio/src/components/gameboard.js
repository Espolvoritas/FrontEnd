import {React, useState, useRef, useEffect} from "react";
import Dice from 'react-dice-roll';
import { useHistory } from "react-router-dom";

const GameBoard = () => {

    const history = useHistory()
    const datahost = history.location.state
    const ws = useRef(null);
    const [actualTurn, setData] = useState("")
    const isPlaying = (datahost["player_name"] === actualTurn)
    console.log("Si: " + datahost["player_name"])
    console.log("No: " + datahost["player_name"])

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8000/gameBoard/" 
                                + String(datahost["player_id"]))
        ws.current.onmessage = (event) => {
            setData(JSON.parse(event.data));
        };
    }, []);

    return (
    <div className="background-image">
        <div className="DiceRoll">
            <Dice placement="botton-left" faceBg="black" size="70"  
                disabled={!isPlaying} onRoll={(value) => ws.current.send(value)}/>
        </div>
        <div className="Turn">
            <h1>Esta jugando el detective: {actualTurn}</h1>
        </div>
    </div>
    );
}

export default GameBoard;