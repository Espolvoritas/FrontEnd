import {React, useRef} from "react";
import Dice from 'react-dice-roll';

const RollDice = (player_id, actualTurn) => {

    let isPlaying = (player_id === actualTurn)
    let tuvieja = useRef(true)

    const dice = async (value, player_id) => {
        console.log(player_id + " " + value)
        const diceData = {
            "playerId": player_id,
            "roll": value
        }
        await fetch('http://127.0.0.1:8000/gameBoard/rollDice', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(diceData)
        })

        tuvieja.current = false

        console.log()
    }

    return (

        <div className="DiceRoll">
            <Dice placement="botton-left" faceBg="black" size="70"  
                disabled={isPlaying && tuvieja.current} onRoll={(value) => dice(value, player_id) }/>
        </div>

    );

}

export default RollDice;