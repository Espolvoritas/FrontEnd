import {React, useState} from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import 'react-perfect-scrollbar/dist/css/styles.css';
import {CardsImg, CardsName} from "./cardReference";
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events';

function SalemCard(player_id){
    const [salemBool, setSalemBool] = useState(false)
    const [foundSalem, setFoundSalem] = useState(false)

    useCustomEventListener('salemCardFound', status => {
        if(!foundSalem){
            setSalemBool(status);
            setFoundSalem(true);
        }
    });

    const requestCard = async () => {
        setSalemBool(false);
        const response = await fetch('http://127.0.0.1:8000/gameBoard/salemsWitch', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
            body: player_id
        })

        const res = await response.json()

        if (response.status === 200){
            emitCustomEvent("envelopeCard", res["envelope_card"])
        }
    }

    return(
        <div>
            {
                salemBool ?
                    <button className="salemCardButton" onClick={requestCard}>
                        Usar la bruja de Salem
                    </button>
                : <p></p>
            }
        </div>
    )
}

function ShowSalemCardResult(card) {
    console.log(card)
    return(
        <Popup modal open={true}>
        {close => (
            <div className="showSalemCard">
                <button className="closeSalemCard" onClick={close}>✖</button> <br/>
                <div className="salemCardHeader"> El sobre misterio contiene la carta: </div>
                <img className="envelopeCard" src={CardsImg[card]} alt={CardsName[card]}/>
            </div>
        )}
        </Popup>
    )
}

function PlayerUsedSalem(playerUsedSalem) {
    return(
        <Popup modal open={true}>
        {close => (
            <div className="ShowPlayerUsed">
                <button className="closePlayerUsed" onClick={close}>✖</button> <br/>
                <div className="PlayerUsedHeader"> 
                El jugador {playerUsedSalem} utilizo la carta de salem UwU
                </div>
            </div>
        )}
        </Popup>
    )
}

export {SalemCard, ShowSalemCardResult, PlayerUsedSalem};