import {React} from "react";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import CardsImg from "./cardReferences";

const Cards = (cards) => {
    return(
        <PerfectScrollbar className = "gridContainer">
            {cards.map((cardKey) => (
                <img className="cardsImg" src={CardsImg[cardKey]} alt=""/>
            ))}
        </PerfectScrollbar>
    );
}

export default Cards;