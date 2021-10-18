import React, { useState } from 'react'
import '../css/formcreatingame.css';
import { useHistory } from "react-router-dom";

const CreatingFrom = () => {

    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [host, setHost] = useState("");
    const [isRepeated, setIsRepeated] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
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

        setId(await response.json())

        setIsRepeated(response.status === 400)

        if (response.status === 201){
            const state = {"gameId": id, "gameName": name, "gameHost": host }
            history.push("/lobby", state);
        }

    }

    return (
        <div className="Form">
            <h1 >Crear la partida </h1>
            <form onSubmit={handleSubmit}>
                {
                    // Check if game name is repeated
                    (isRepeated)
                    ? <label> The game name is repeated </label> 
                    : <p/> 
                }
                <p/>
                <label>
                    Nombre de la partida
                    <p/>
                    <input type="text" name="name" autoComplete="off" placeholder="Nombre de partida" onChange={e => setName(e.target.value)} />
                </label>
                <p/>
                <label>
                    Apodo
                    <p/>
                    <input type="text" name="host" autoComplete="off" placeholder="Apodo" onChange={e => setHost(e.target.value)} />
                </label>
                <p/>
                <input type="submit" value="Crear" />
            </form>
        </div>
    );

}

export default CreatingFrom;