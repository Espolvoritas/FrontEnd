import {React} from "react";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import CardsImg from "./cardReference";

const Cards = (cards) => {
    return(
        <PerfectScrollbar className = "gridContainer">
            {cards.map((card) => (
                <img className = "cardsImage" src={CardsImg[card]} alt=""/>
            ))}
        </PerfectScrollbar>
    );
}

export default Cards;