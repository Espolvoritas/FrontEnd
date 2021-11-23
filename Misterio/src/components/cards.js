import {React, useState} from "react";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import {CardsImg, CardsName} from "./cardReference";
import {WS_CARD_LIST} from './constants'
import { useCustomEventListener , emitCustomEvent} from 'react-custom-events';


const Cards = () => {

    const [cards, setCards] = useState([])

    useCustomEventListener('websocket', data => {
        if ((data)["code"] & WS_CARD_LIST){
            setCards((data)["cards"]);
        }
    });

    const [salemRender, setSalemRender] = useState(false)
    function checkSalem(card){
        if(!salemRender){
            if(card === 21){
                emitCustomEvent("salemCardFound", true);
                setSalemRender(true);
            }
        }
    }

    return(
        <PerfectScrollbar className = "gridContainer">
            {Object.keys(cards).map((i) => (
                <div>
                    <img key={i} className = "cardsImage" src={CardsImg[cards[i]]} 
                    alt={CardsName[cards[i]]} title={CardsName[cards[i]]}/>
                    {checkSalem(cards[i])}
                </div>
            ))}
        </PerfectScrollbar>
    );
}

export default Cards;