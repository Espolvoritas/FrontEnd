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

                <input className="sendbutton" type="submit" value="➤" onClick={handleSubmit}/>
            </div>
        )}
    </Popup>
    )
}


export default Suspicion;