import {React, useState} from "react";
import Dice from 'react-dice-roll';
import { emitCustomEvent } from 'react-custom-events';

const RollDice = (player_id, actualTurn) => {
    const [thrown, setThrown] = useState(false)
    let isPlaying = (player_id === actualTurn)

    const dice = async (value, player_id) => {
        setThrown(true)

        const diceData = {
            "playerId": player_id,
            "roll": value
        }
        const response = await fetch('http://127.0.0.1:8000/gameBoard/rollDice', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(diceData)
        }) 
        const res = await response.json()
        if(response.status === 200){
            emitCustomEvent('init_moves', res)
        }
        
    }

    return (

        <div className="DiceRoll">
            <Dice placement="botton-left" faceBg="black" size="70"  
                disabled={isPlaying && !thrown} onRoll={(value) => dice(value, player_id) }/>
        </div>

    );

}

export default RollDice;