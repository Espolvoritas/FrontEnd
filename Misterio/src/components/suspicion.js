import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

function Suspicion() {

    const [victim, setVictim] = useState("");
    const [monster, setMonster] = useState("");
    const [place, setPlace] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(victim, monster, place);

    }

    return (
    <Popup 
        trigger={<button className="suspicion-button"> Sospechar🔎 </button>}
        modal
    >
        {close => (
            <div className="modal">
                <button className="close" onClick={close}>&times;</button> <br/>
 
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
                en el/la
                <select onChange={(e) => setPlace(e.target.value)}>
                    <option value="" selected disabled hidden>Elige un recinto</option>
                    <option value="Alcoba">Alcoba</option>
                    <option value="Biblioteca">Biblioteca</option>
                    <option value="Bodega">Bodega</option>
                    <option value="Cochera">Cochera</option>
                    <option value="Laboratorio">Laboratorio</option>
                    <option value="Panteón">Panteón</option>
                    <option value="Salon">Salón</option>
                    <option value="Vestibulo">Vestíbulo</option>
                </select>

                <input className="sendbutton" type="submit" value="➤" onClick={handleSubmit}/>
            </div>
        )}
    </Popup>
    )
}


export default Suspicion;