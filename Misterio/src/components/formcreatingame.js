import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const CreatingFrom = () => {

    const [name, setName] = useState("");
    const [host, setHost] = useState("");
    const [isRepeated, setIsRepeated] = useState(false);
    const history = useHistory();
    const [emptyInput, setEmptyInput] = useState(false);
    const [notFormated, setNotFormated] = useState(false);

    const handleSubmit = async () => {
        
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

        const res = await response.json()

        setIsRepeated(response.status === 400)

        if (response.status === 201){
            const state = {"game_id": res["game_id"], "player_id": res["player_id"], "gameName": name, "gameHost": host }
            history.push("/lobby", state);
        }

    }

    const EraseError = () => {
        setIsRepeated(false);
        setEmptyInput(false);
    }

    const nicknameEmpty = (e) => {
        e.preventDefault();
        if(name === "" || host === ""){
            setEmptyInput(true)
        }else if(!((name.length < 21) && (name.length > 4)) || !((host.length < 21) && (host.length > 4))){
            setNotFormated(true)
        }else{
            handleSubmit()
        }
    }


    return (
        <div className="Background-formgame">
            <div id="form">
                <h1 >Crear la partida </h1>
                <form onSubmit={e => nicknameEmpty(e)} data-testid="form">
                    {
                        // Check if game name is repeated
                        (isRepeated)
                        ? <label className="Error">⚠️Ya existe una partida con ese nombre. Por favor elige otro⚠️</label>
                        : ((emptyInput)
                        ? <label className="Error">⚠️Por favor complete todos los campos para continuar⚠️</label> 
                        : ((notFormated)
                        ? <label className="Error">⚠️El apodo o nombre de la partida no tiene el formato correcto⚠️</label> 
                        : <p/>
                        )) 
                    }
                    <p/>
                    <label>
                        Nombre de la partida
                        <p/>
                        <input type="text" name="name" autoComplete="off" placeholder="Nombre de partida" onClick={EraseError} onChange={e => setName(e.target.value)} />
                    </label>
                    <p/>
                    <label>
                        Apodo
                        <p/>
                        <input type="text" name="host" autoComplete="off" placeholder="Apodo" onClick={EraseError} onChange={e => setHost(e.target.value)} />
                    </label>
                    <p/>
                    <button className="GameButton" type="submit" value="Crear">Crear</button>
                </form>
            </div>
        </div>
    );

}

export default CreatingFrom;