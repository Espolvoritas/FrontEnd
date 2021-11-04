import React, { useState } from "react";
import Popup from "reactjs-popup";
import CardsImg from "./cards-img";


function Suspicion(place) {

    const [victim, setVictim] = useState("");
    const [monster, setMonster] = useState("");
    const validInput = victim === "" || monster === "";
    /* const [place, setPlace] = useState(""); */


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(victim, monster, place);



    }
    return(
        <Popup 
        modal
        open={true}
        onClose={handleSubmit}
        closeOnDocumentClick = {false}
        >
        {close => (
            <div className="suspicion-dropdown">
                <button className="close-sus" onClick={close}>&times;</button> <br/>
                <div className="header-sus">Realiza una sospecha</div>

                <select onChange={(e) => setMonster(e.target.value)}>
                    <option value="" selected disabled hidden>Elige un monstruo</option>
                    <option value={6}>Dr. Jekyll Mr. Hyde</option>
                    <option value={1}>Drácula</option>
                    <option value={4}>Fantasma</option>
                    <option value={2}>Frankenstein</option>
                    <option value={3}>Hombre Lobo</option>
                    <option value={5}>Momia</option>
                </select>
                asesinó al/a la
                <select onChange={(e) => setVictim(e.target.value)}>
                    <option value="" selected disabled hidden>Elige una víctima</option>
                    <option value={9}>Ama de Llaves</option>
                    <option value={7}>Conde</option>
                    <option value={8}>Condesa</option>
                    <option value={11}>Doncella</option>
                    <option value={12}>Jardinero</option>
                    <option value={10}>Mayordomo</option>
                </select>
                en el/la {place}
                <input disabled={validInput} className="send-sus" type="submit" value="➤" onClick={close}/>
            </div>
        )}
        </Popup>
    )
}

function ShowSuspicion(nickname, cardname) {
    return(
        <Popup 
        modal
        open={true}
        >
        {close => (
            <div className="show-sus">
                <button className="close-show" onClick={close}>✖</button> <br/>
                <div className="header-sus">{nickname} tiene esta carta</div>
                <img className="card-sus" src={CardsImg[cardname]} alt="sus-answer"/>
            </div>
        )}
        </Popup>
    )
}


function ChooseCard(deck){
    const [pickedCard, setPickedCard] = useState(0);
    const validInput = pickedCard === 0;

    const handleCard = async (e) => {
        e.preventDefault();
        console.log(pickedCard);
    }

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
                        {deck.map((card, i) => (
                            <img key={i} className="card-pick" src={CardsImg[card]} alt="pickable-card" onClick={() => setPickedCard(card)}/>
                        ))}
                       <br/><input disabled={validInput} className="send-card" type="submit" value="Enviar" onClick={close}/>
                    </div>
                )}
            </Popup>
        </div>
    )
}

export {Suspicion, ShowSuspicion, ChooseCard}