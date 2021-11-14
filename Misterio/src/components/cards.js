import {React, useState} from "react";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import {CardsImg, CardsName} from "./cardReference";
import { useCustomEventListener } from 'react-custom-events';

const Cards = () => {

    const [cards, setCards] = useState([])
    useCustomEventListener('websocket', data => {
        if ((data)["code"] & 2){
            setCards((data)["cards"]);
        }
    });

    return(
        <PerfectScrollbar className = "gridContainer">
            {Object.keys(cards).map((i) => (
                <img key={i} className = "cardsImage" src={CardsImg[cards[i]]} 
                    alt={CardsName[cards[i]]} title={CardsName[cards[i]]}/>
            ))}
        </PerfectScrollbar>
    );
}

export default Cards;