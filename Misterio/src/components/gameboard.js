import {React, useState, useRef, useEffect} from "react";
import Dice from 'react-dice-roll';
import {useHistory} from "react-router-dom";
import Cards from "./cards";
import Rules from "./rules";
import {Suspicion, ShowSuspicionResult, ChooseCard, ShowStatus, NotifySend, NotifySuspicion} from "./suspicion"
import { emitCustomEvent } from 'react-custom-events';
import { useCustomEventListener } from 'react-custom-events';

const GameBoard = () => {

    const history = useHistory()
    const datahost = history.location.state
    const ws = useRef(null);
    const [currentPlayer, setTurn] = useState("")
    const [cards, setCards] = useState([])
    const isPlaying = (datahost["player_name"] === currentPlayer)
    const [message, setMessage] = useState("")
    const [card, setCard] = useState("");
    const [accused, setAccused] = useState("");
    let arriveSus = useRef(false)
    const [actualTurn, setData] = useState("")
    const isPlaying = (datahost["player_name"] === actualTurn)

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8000/gameBoard/"
                                + String(datahost["player_id"]))
        ws.current.onmessage = (event) => {
            emitCustomEvent('websocket', JSON.parse(event.data));
            if(JSON.parse(event.data)["code"] & 1)
                setTurn(JSON.parse(event.data)["currentPlayer"]);
            if (JSON.parse(event.data)["code"] & 2)
                setCards(JSON.parse(event.data)["cards"]);
            if (JSON.parse(event.data)["code"] & 8){
                arriveSus = true
            }
        };
    }, [])

    console.log(arriveSus)

    async function handleDice(value) {
        const diceValue = {
            "playerId": datahost["player_id"], 
            "roll": value
        }
        const response = await fetch('http://127.0.0.1:8000/gameBoard/rollDice', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(diceValue)   
        })
    }

    useCustomEventListener('res-sus', resSus => {
        setAccused(resSus[0])
        setCard(resSus[1])
    })

    return (
        <div className="background-image">
            <div className="DiceRoll">
                <Dice placement="botton-left" faceBg="black" size="70"  
                    disabled={!isPlaying} onRoll={(value) => handleDice(value)}/>
            </div>
            <div className="Turn">
                <h1>Esta jugando el detective: {currentPlayer}</h1>
            </div>
            <div>
                {(datahost["player_id"] === 1) ? Suspicion(13,1) : <b/> }
                {NotifySuspicion()}
                {arriveSus ? ChooseCard(ws.current): <b/> }
                {ShowStatus()}
                {NotifySend()}
                {(accused !== "" && card !== "") ? ShowSuspicionResult(accused, card) : <b/>}
                {(message === "") ? <b/> : <Rules message={message}/>}
            </div>
            <div>
                {Rules()}
            </div>
            <div>
                {Cards(cards)}
            </div>
        </div>
    );
}

export default GameBoard;