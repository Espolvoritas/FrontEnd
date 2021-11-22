import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import { useCustomEventListener } from 'react-custom-events';

const Acusation = (isPlaying) => {
    const [victim, setVictim] = useState("");
    const [monster, setMonster] = useState("");
    const [room, setRoom] = useState("");
    const history = useHistory()
    const datahost = history.location.state;

    const validInput = victim !== "" && monster !== ""  && room !== "";

    const handleSubmit = async () => {
        const acusationData = {
            "room": parseInt(room),
            "monster": parseInt(monster),
            "victim": parseInt(victim),
            "player_id": (datahost["player_id"])
        }
        const response = await fetch ('http://127.0.0.1:8000/gameBoard/accuse', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(acusationData)
        })

        if(response.status === 200){
            closeCleanup()
        }
        

    }

    function closeCleanup() {
        if(victim !== "" || monster !== "" || room !== ""){
            setVictim("")
            setMonster("")
            setRoom("")
        }
    }

    if (!isPlaying) {
        return
    } else {
        return (
            <Popup trigger={<button className="acusation-button"> Acusar🔎✉️</button>}
                modal 
                onClose={handleSubmit}
                closeOnDocumentClick = {false}
            >
                {close => (
                    <div className="acusation-box">
                        <button className="close-acusation" onClick={(e) => closeCleanup(e)}>✖</button> <br/>
                            <div className="header-acusation">Realiza una acusación</div>
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
                            en el/la
                            <select onChange={(e) => setRoom(e.target.value)}>
                                <option value="" selected disabled hidden>Elige una habitacion</option>
                                <option value={17}>Alcoba</option>
                                <option value={15}>Biblioteca</option>
                                <option value={16}>Bodega</option>
                                <option value={20}>Cochera</option>
                                <option value={14}>Laboratorio</option>
                                <option value={18}>Panteón</option>
                                <option value={19}>Salón</option>
                                <option value={13}>Vestíbulo</option>
                            </select>
                            {(validInput) ? <input className="send-acusation" type="submit" value="➤" onClick={close}/> : <b/>}
                    </div>
                )}
            </Popup>
        )
    }
}



const NotifyAcusation = (gameName) =>  {

    const [acusationMade, setAcusationMade] = useState(false);
    const [acusationRes, setAcusationRes] = useState(false);
    const [acusationPlayer, setAcusationPlayer] = useState("");
    const [allLost, setAllLost] = useState(false);
    const history = useHistory()
    
    function closeModal() {
        if (acusationRes || allLost){
            const state =  {"allLost" : allLost, "acusationPlayer" : acusationPlayer, "gameName": gameName};
            history.push('/endgame', state);
        }
    }

    function closeCleanup() {
        if(!acusationRes){
            setAcusationRes(false)
            setAcusationMade(false)
            setAcusationPlayer("")
        }
    }

    useCustomEventListener('websocket', data => {
        if((data)["code"] & 512){
            setAcusationMade(true);
            setAcusationRes((data)["data"]["won"]);
            setAcusationPlayer((data)["data"]["player"])
        }
        if((data)["code"] & 1024){
            setAllLost(true);
        }
    });

    return (
        <Popup 
            modal 
            open={acusationMade} 
            closeOnDocumentClick = {false}
            onClose = {() => closeModal()}
        >
        {close => (
            <div className = "acusationResult">
                <button className="close-result" onClick={() => closeCleanup()}>✖</button> <br/>
                <div className = "acusationText">
                    La acusacion del jugador <b>{acusationPlayer}</b> fue 
                    {(acusationRes) ? <b>acertada, felicitaciones</b>  : <b> erronea</b>}
                </div>
            </div>
        )}
        </Popup>
    )
}

export {Acusation, NotifyAcusation};