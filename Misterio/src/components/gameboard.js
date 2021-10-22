import React from "react";
import '../css/gameboard.css';
import Dice from 'react-dice-roll';

const GameBoard = () => {
    const ws = new WebSocket("ws://localhost:8000/gameboard/${userID}/rollDice")
  
    return (
     <div className="background-image">
        <div className="DiceRoll">
            <Dice placement="botton-left" faceBg="black" size="70" onRoll={(value) => ws.send(value)}/>
        </div>
    </div>
    ) 
}
export default GameBoard;
