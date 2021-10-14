import React from "react";
import '../css/turn.css';
import Dice from 'react-dice-roll';

const Turn = () => {
    return(
     <div className="background-image">
        <div className="Dice">
        Haz click en el dado para tirarlo <p/>
            <Dice faceBg="black" size="70" sound="../media/rolling-dice.mp3" onRoll={(value) => console.log(value)} />
        </div>
        </div>
        
    ) 
}
export default Turn;