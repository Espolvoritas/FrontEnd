import {React, useState} from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import 'react-perfect-scrollbar/dist/css/styles.css';
import CardsImg from "./cardReference";
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events';

const SalemCard = () => {

    const [cards, setCards] = useState([])
    const [salemBool, setSalemBool] = useState(false)
    const [foundSalem, setFoundSalem] = useState(false)

    useCustomEventListener('salemCardFound', status => {
        if(!foundSalem){
            console.log("set salem bool" + foundSalem)
            setSalemBool(status);
            setFoundSalem(true);
        }
    });

    function requestCard() {
        setSalemBool(false);
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

export default SalemCard;
/*
function NotifySalemCard() {
    const [salemBool, setSalemBool] = useState(false)
    useCustomEventListener('websocket', data => {
        if ((data)["code"] & 2){
            setCards((data)["cards"]);
        }
    });
    return (
        {
            salemCardUsed ?
                <div>
                    <Popup 
                    modal 
                    open={acusationMade}
                    closeOnDocumentClick = {false}
                    onClose = {() => closeModal()}>
                        <div className = "salemResult">
                            <div className = "salemResultText">
                                El sobre del misterio contiene la siguiente carta:
                            </div>
                            <div className = "salemResultImage">
                                <img className = "cardsImage" src={CardsImg[1]} alt=""/>
                            </div>
                        </div>
                    </Popup>
                </div>
            : <p></p>
        }
    )
}
*/

/*
        fetch('http://127.0.0.1:8000/lobby/createNew', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify()
        }) 
*/

