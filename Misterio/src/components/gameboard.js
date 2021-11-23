import {React, useState, useRef, useEffect} from "react";
import Cards from "./cards";
import Rules from "./rules";
import {Suspicion, ShowSuspicionResult, ChooseCard, ShowStatus, NotifySend, NotifySuspicion} from "./suspicion"
import { emitCustomEvent,  useCustomEventListener } from 'react-custom-events';
import { useHistory } from "react-router-dom";
import logo from "../media/MisterioBoard.jpeg";
import {Acusation, NotifyAcusation} from "./acusation"
import Chat from './chat'
import {SalemCard, ShowSalemCardResult, PlayerUsedSalem} from "./salemcard";
import RollDice from './rolldice'
import {PlayerOnGrid, Trapopup} from "./playerongrid";
import Report from "./report";

const GameBoard = () => {

    const history = useHistory()
    const datahost = history.location.state
    const ws = useRef(null);
    const [actualTurn, setTurn] = useState("")
    const [cards, setCards] = useState([])
    const [usedSalem, setUsedSalem] = useState(false)
    const [playerUsedSalem, setPlayerUsedSalem] = useState("")
    let [card, setCard] = useState(0);
    let [accused, setAccused] = useState("");
    let arriveSus = useRef(false)
    let [roomId, setRoomId] = useState(0)
    const isLobby = true

    const isPlaying = (datahost["player_name"] === actualTurn)

    useCustomEventListener('room', data => {
        setRoomId(data)
    });

    const [receibedCard, setreceibedCard] = useState(0)
    const [showSalemBool, setShowSalemBool] = useState(false)
    useCustomEventListener("envelopeCard", envelopeCard => {
        setreceibedCard(envelopeCard);
        setShowSalemBool(true);
    });

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8000/gameBoard/"
                                + String(datahost["player_id"]))
        ws.current.onmessage = (event) => {
            console.log(event.data)
            emitCustomEvent('websocket', JSON.parse(event.data));
            if(JSON.parse(event.data)["code"] & 1){
                setTurn(JSON.parse(event.data)["current_player"]);
                emitCustomEvent('dice', false);
            }
            if (JSON.parse(event.data)["code"] & 131)
                setCards(JSON.parse(event.data)["cards"]);
            if (JSON.parse(event.data)["code"] & 8){
                arriveSus = true
            }
            if(JSON.parse(event.data)["code"] & 2048){
                setUsedSalem(true)
                setPlayerUsedSalem(JSON.parse(event.data)["current_player"])
            }
        };
    }, []);

    useCustomEventListener('res-sus', resSus => {

        if(accused !== "" || card !== 0){
            setAccused("")
            setCard(0)
        }

        setAccused(resSus[0])
        setCard(resSus[1])
    })

    return(
        <div className="background-image" >
            <img src={logo} className="gameboard-img" alt = ""></img>
            <div>
                {Suspicion(roomId, datahost["player_id"])}
                {NotifySuspicion()}
                {ChooseCard(ws.current, arriveSus)}
                {ShowStatus()}
                {NotifySend()}
                {ShowSuspicionResult(accused, card)}
            </div>
            <div>
                {Rules()}
            </div>
            <div>
                {Cards(cards)}
            </div>
                {RollDice(datahost["player_id"], isPlaying)}
            <div className="Turn">
                {((datahost["player_name"] === actualTurn))
                ? <div className="text-turn" >Es tu turno</div>
                : <div className="text-turn">Es el turno de: {actualTurn}</div>
                } 
            </div>
                {PlayerOnGrid(datahost["player_id"])}
            <div className="Acusation-main">
                {Acusation(isPlaying )}
                {NotifyAcusation(datahost["gameName"])}
            </div>
            <div className="Chat-component">
                {Chat(ws.current, isLobby, datahost["gameName"])}
            </div>

            <div>
                {Report(datahost["gameName"])}
            </div>

            <div className = "SalemButton">
                {SalemCard(datahost["player_id"])}
            </div>
            <div>
                {
                    showSalemBool ? 
                        <div>
                            {ShowSalemCardResult(receibedCard)}
                        </div>
                    :   <p></p>
                }
            </div>
            <div>
                {
                    usedSalem ?
                        <div>
                            {PlayerUsedSalem(playerUsedSalem)}
                        </div>
                    :   <p></p> 
                }
            </div>
            <div>
                {Trapopup()}
            </div>
        </div>
    );
}

export default GameBoard;