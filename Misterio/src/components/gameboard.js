import {React, useState, useRef, useEffect} from "react";
import Dice from 'react-dice-roll';
import {useHistory} from "react-router-dom";
import Cards from "./cards";
import Rules from "./rules";
import Acusation from "./acusation"
import { emitCustomEvent } from 'react-custom-events';
import Popup from "reactjs-popup";

const GameBoard = () => {

    const history = useHistory();
    const datahost = history.location.state;
    const ws = useRef(null);
    const [currentPlayer, setTurn] = useState("");
    const [acusationMade, setAcusationMade] = useState(false);
    const [acusationRes, setAcusationRes] = useState(false);
    const [acusationPlayer, setAcusationPlayer] = useState("");
    const [allLost, setAllLost] = useState(false);

    const isPlaying = (datahost["player_name"] === currentPlayer)

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8000/gameBoard/"
                                + String(datahost["player_id"]))
        ws.current.onmessage = (event) => {
            emitCustomEvent('newMessage', JSON.parse(event.data));
            if (JSON.parse(event.data)["code"] & 1){
                setTurn(JSON.parse(event.data)["currentPlayer"])
            }
            if(JSON.parse(event.data)["code"] & 512){
                setAcusationMade(true);
                setAcusationRes(JSON.parse(event.data)["data"]["won"]);
                console.log(acusationRes + "resultado acus");
                setAcusationPlayer(JSON.parse(event.data)["data"]["player"])
            }
            if(JSON.parse(event.data)["code"] & 1024){
                setAllLost(true);
            }
        };
    }, [])

    async function handleDice(value) {
        const diceValue = {
            "playerId": datahost["player_id"], 
            "roll": value
        }
        fetch('http://127.0.0.1:8000/gameBoard/rollDice', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(diceValue)   
        })
    }

    function closeModal() {
        if (acusationRes || allLost){
            const state =  {"allLost" : allLost, "acusationPlayer" : acusationPlayer};
            history.push('/endgame', state);
        }
    }

    return(
        <div className="background-image">
            <div className="DiceRoll">
                <Dice placement="botton-left" faceBg="black" size="70"  
                    disabled={!isPlaying} onRoll={(value) => handleDice(value)}/>
            </div>
            <div className="Turn">
                <h1>Esta jugando el detective: {currentPlayer}</h1>
            </div>
            <div>
                {Rules()}
            </div>
            <div>
                {Cards()}
            </div>
            <div>
                {Acusation(isPlaying)}
            </div>
            <div>
                <Popup 
                    modal 
                    open={acusationMade} 
                    closeOnDocumentClick = {false}
                    onClose = {closeModal()}
                >
                {close => (
                    <div className = "acusationResult">
                        <button className="close-result" onClick={close}>✖</button> <br/>
                        <div className = "acusationText">
                            La acusacion del jugador <b>{acusationPlayer}</b> fue 
                            {(acusationRes) ? <b>acertada, felicitaciones</b>  : <b> erronea</b>}
                        </div>
                    </div>
                )}
                </Popup>
            </div>
        </div>
    );
}

export default GameBoard;