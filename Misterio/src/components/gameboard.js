import {React, useState, useRef, useEffect} from "react";
import Dice from 'react-dice-roll';
import {useHistory} from "react-router-dom";
import Cards from "./cards";
import Rules from "./rules";

const GameBoard = () => {

    const history = useHistory()
    const datahost = history.location.state
    const ws = useRef(null);
    const [currentPlayer, setTurn] = useState("")
    const [cards, setCards] = useState([])
    const isPlaying = (datahost["player_name"] === currentPlayer)

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8000/gameBoard/"
                                + String(datahost["player_id"]))
        ws.current.onmessage = (event) => {
            if(JSON.parse(event.data)["code"] & 1)
                setTurn(JSON.parse(event.data)["currentPlayer"]);
            if (JSON.parse(event.data)["code"] & 2)
                setCards(JSON.parse(event.data)["cards"]);
        };
    }, [])

    return (
        <div className="background-image">
            <div className="DiceRoll">
                <Dice placement="botton-left" faceBg="black" size="70"  
                    disabled={!isPlaying} onRoll={(value) => ws.current.send(value)}/>
            </div>
            <div className="Turn">
                <h1>Esta jugando el detective: {currentPlayer}</h1>
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