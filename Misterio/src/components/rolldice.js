import {React, useState} from "react";
import Dice from 'react-dice-roll';
import { emitCustomEvent,  useCustomEventListener } from 'react-custom-events';

const RollDice = (player_id, isPlaying) => {
    const [thrown, setThrown] = useState(false);

    useCustomEventListener('dice', data => {
        setThrown(data)
    });

    const dice = async (value, player_id) => {

        const diceData = {
            "player_id": player_id,
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
            setThrown(true)
            emitCustomEvent('init_moves', res)
        }
    }
    return (
        <div className="DiceRoll">
            <Dice placement="botton-left" faceBg="black" size="70"  
                disabled={!isPlaying ^ thrown} onRoll={(value) => dice(value, player_id)}/>
        </div>
    );
}

export default RollDice;