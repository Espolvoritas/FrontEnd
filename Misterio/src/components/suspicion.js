import React, { useState } from "react";
import Popup from "reactjs-popup";
import {CardsImg, CardsName} from "./cardReference";
import { useCustomEventListener } from 'react-custom-events';
import { emitCustomEvent } from 'react-custom-events';


function Suspicion(place, playerID) {

    const [victim, setVictim] = useState(0);
    const [monster, setMonster] = useState(0);
    const validInput = victim !== 0 && monster !== 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sus = {
            "playerId": playerID,
            "victimId": parseInt(victim),
            "culpritId": parseInt(monster)
        }
        const response = await fetch('http://127.0.0.1:8000/gameBoard/checkSuspicion', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*'
                  },
                  body: JSON.stringify(sus)
                  
        })
        const res = await response.json();
        emitCustomEvent('res-sus', [res["responsePlayer"],res["suspicionCard"]]);
    }
    return(
        <Popup
        open={true}
        modal
        onClose={handleSubmit}
        closeOnDocumentClick = {false}
        >
        {close => (
            <div className="suspicion-box">
                <h3 className="header-sus">Realiza una sospecha</h3>

                <div className="suspicion-dropdown">
                    <select onChange={(e) => setMonster(e.target.value)}>
                        <option value="" selected disabled hidden>Elige un monstruo</option>
                        <option value={6}>Dr. Jekyll Mr. Hyde</option>
                        <option value={1}>Drácula</option>
                        <option value={4}>Fantasma</option>
                        <option value={2}>Frankenstein</option>
                        <option value={3}>Hombre Lobo</option>
                        <option value={5}>Momia</option>
                    </select>
                    asesinó a
                    <select onChange={(e) => setVictim(e.target.value)}>
                        <option value="" selected disabled hidden>Elige una víctima</option>
                        <option value={9}>Ama de Llaves</option>
                        <option value={7}>Conde</option>
                        <option value={8}>Condesa</option>
                        <option value={11}>Doncella</option>
                        <option value={12}>Jardinero</option>
                        <option value={10}>Mayordomo</option>
                    </select>
                    en {CardsName[place]}
                    {(validInput) ? <input className="send-sus" type="submit" value="➤" onClick={close}/> : <b/>}
                </div>
            </div>
        )}
        </Popup>
    )
}

function NotifySuspicion(){
    
    const [player, setPlayer] = useState(0);
    const [victim, setVictim] = useState(0);
    const [monster, setMonster] = useState(0);
    const [place, setPlace] = useState(0);

    useCustomEventListener('websocket', data => {
        if ((data["code"] & 4)){
            setPlayer(data["currentPlayer"]);
            setVictim(data["victim"]);
            setMonster(data["culprit"]);
            setPlace(data["room"]);
        }
    });

    if (victim === 0 || monster === 0) return

    return(
        <Popup 
        modal
        open={true}
        closeOnDocumentClick={false}
        >
        {close => (
            <div className="not-sus">
                <button className="close-not-sus" onClick={close}>✖</button> <br/>
            <div className="header-sus">La sospecha de {player} fue:
                <div className="sus-text">{CardsName[monster]} asesinó {CardsName[victim]} en {CardsName[place]}</div>
            </div>
            
            </div>
        )}
        </Popup>
    )
}

function ShowSuspicionResult(nickname, card) {
    return(
        <Popup 
        modal
        open={true}
        >
        {close => (
            <div className="show-sus">
                <button className="close-show" onClick={close}>✖</button> <br/>
                <div className="header-sus">{nickname} tiene esta carta</div>
                <img className="card-sus" src={CardsImg[card]} alt={CardsName[card]}/>
            </div>
        )}
        </Popup>
    )
}

function ChooseCard(ws){
    const [deck, setDeck] = useState("")
    const [pickedCard, setPickedCard] = useState(0);
    const validInput = pickedCard !== 0;

    useCustomEventListener('websocket', data => {
        if ((data["code"] & 8)){
            setDeck(data["matchingCards"]);
        }
    });

    const handleCard = () => {
        ws.send(JSON.stringify({'code': 'PICK_CARD', 'card': pickedCard}));
    }

    if (deck.length <= 1) return 

        return(
            <div>
                <Popup 
                modal
                open={true}
                onClose={handleCard}
                closeOnDocumentClick={false}
                >
                    {close => (
                        <div className="choose-card">
                            <div className="header-sus">Elige una carta para mostrar</div>
                            {Object.keys(deck).map((i) => (
                                <img key={i} className="card-pick" src={CardsImg[deck[i]]} alt={CardsName[deck[i]]}
                                    onClick={() => setPickedCard(deck[i])}/>
                            ))}
                            {(validInput) ? <div className="notice-card">Elegiste esta carta: {CardsName[pickedCard]}<br/>
                                <input className="send-card" type="submit" value="Enviar" onClick={close}/></div>: <b/>}
                        </div>
                    )}
                </Popup>
            </div>
        )
}

function ShowStatus(){
    const [hasCard, setHasCard] = useState(false);
    const [nickname, setNickname] = useState("");
    const [sus, setSus] = useState("");

    useCustomEventListener('websocket', data => {
        if (data["code"] & 16){
            setHasCard(data["responded"])
            setNickname(data["responsePlayer"])
            setSus(data["suspicionPlayer"])
        }
    });

    if (nickname === "" || sus === "") return

    return(
        <Popup 
        modal
        open={true}
        closeOnDocumentClick={false}
        >
        {close => (
            <div className="show-status">
                <button className="close-status" onClick={close}>✖</button> <br/>
                {(hasCard) ? <div className="notice-card">{nickname} respondió a la sospecha de {sus}</div> 
                    : <div className="notice-card">{nickname} no tiene cartas para responderle a {sus}</div>}
            </div>
        )}
        </Popup>
    )
}

function NotifySend(){
    const [card, setCard] = useState(0);
    const [nickname, setNickname] = useState("");

    useCustomEventListener('websocket', data => {
        if (data["code"] & 32){
            setCard(data["card"])
            setNickname(data["suspicionPlayer"])
        }
    });

    if (nickname === "" || card === 0) return
    
    return(
        <Popup 
        modal
        open={true}
        closeOnDocumentClick={false}
        >
        {close => (
            <div className="notify-send">
                <button className="close-notify" onClick={close}>✖</button> <br/>
                <div className="header-not-send">Le enviaste esta carta a {nickname}</div>
                <img className="card-notify" src={CardsImg[card]} alt={CardsName[card]}/>
            </div>
        )}
        </Popup>
    )
}

export {Suspicion, NotifySuspicion, ShowSuspicionResult, ChooseCard, ShowStatus, NotifySend}