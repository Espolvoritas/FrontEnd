import React, { useState } from 'react'
import '../css/formcreatingame.css';

const CreatingFrom = () => {

    const [name, setName] = useState("");
    const [host, setHost] = useState("");

    const EPcreategame = async () => {
        const gameData = {
            "name": name,
            "host": host
        }
        const response = await fetch('http://127.0.0.1:8000/game/createNew', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(gameData)
        })
    }

    return (
        <div className="Form">
            <h1>Crear la partida</h1>
            <form>
                <label>
                    Nombre de la partida
                    <p/>
                    <input type="text" name="name" onChange={e => setName(e.target.value)} />
                </label>
                <p/>
                <label>
                    Apodo
                    <p/>
                    <input type="text" name="host"onChange={e => setHost(e.target.value)} />
                </label>
                <p/>
                <input type="submit" value="Crear" onClick={EPcreategame}/>
            </form>
        </div>
    );

}

export default CreatingFrom;