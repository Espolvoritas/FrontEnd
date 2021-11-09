import {React, useState} from "react";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import CardsImg from "./cardReference";
import { useCustomEventListener } from 'react-custom-events';

const Cards = () => {

    const [cards, setCards] = useState([])
    useCustomEventListener('newMessage', data => {
        if ((data)["code"] & 2){
            setCards((data)["cards"]);
        }
    });

    return(
        <PerfectScrollbar className = "gridContainer">
            {Object.keys(cards).map((i) => (
                <img key={i} className = "cardsImage" src={CardsImg[cards[i]]} alt=""/>
            ))}
        </PerfectScrollbar>
    );
}

export default Cards;