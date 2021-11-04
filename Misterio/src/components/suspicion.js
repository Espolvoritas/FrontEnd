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

    return (
    <Popup 
        trigger={<button className="suspicion-button"> Sospechar🔎 </button>}
        modal
        onClose={handleSubmit}
        closeOnDocumentClick = {false}
        >
        {close => (
            <div className="suspicion-dropdown">
                <button className="close-sus" onClick={close}>&times;</button> <br/>
                <div className="header-sus">Realiza una sospecha</div>

                <select onChange={(e) => setMonster(e.target.value)}>
                    <option value="" selected disabled hidden>Elige un monstruo</option>
                    <option value="Dr. Jekyll Mr. Hyde">Dr. Jekyll Mr. Hyde</option>
                    <option value="Dracula">Drácula</option>
                    <option value="Fantasma">Fantasma</option>
                    <option value="Frankenstein">Frankenstein</option>
                    <option value="Hombre Lobo">Hombre Lobo</option>
                    <option value="Momia">Momia</option>
                </select>
                asesinó al/a la
                <select onChange={(e) => setVictim(e.target.value)}>
                    <option value="" selected disabled hidden>Elige una víctima</option>
                    <option value="Ama de Llaves">Ama de Llaves</option>
                    <option value="Conde">Conde</option>
                    <option value="Condesa">Condesa</option>
                    <option value="Doncella">Doncella</option>
                    <option value="Jardinero">Jardinero</option>
                    <option value="Mayordomo">Mayordomo</option>
                </select>
                en el/la {place}
                <input disabled={validInput} className="send-sus" type="submit" value="➤" onClick={close}/>
            </div>
        )}
        </Popup>
    )
}

                <input className="sendbutton" type="submit" value="➤" onClick={handleSubmit}/>
            </div>
        )}
    </Popup>
    )
}


export default Suspicion;