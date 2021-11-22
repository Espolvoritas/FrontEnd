import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import {BsEyeFill, BsEyeSlashFill} from 'react-icons/bs';
import {RiArrowGoBackFill} from 'react-icons/ri';
import {CREATED, BAD_REQUEST} from './constants'

const CreatingFrom = () => {

    const [name, setName] = useState("");
    const [host, setHost] = useState("");
    const [password, setPassword] = useState("");
    const [isRepeated, setIsRepeated] = useState(false);
    const history = useHistory();
    const [emptyInput, setEmptyInput] = useState(false);
    const [notFormated, setNotFormated] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);

    const handleSubmit = async () => {
        const gameData = {
            "name": name,
            "host": host,
            "password": btoa(password)
        }
        const response = await fetch('http://127.0.0.1:8000/lobby/createNew', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(gameData)
        })

        const res = await response.json()

        setIsRepeated(response.status === BAD_REQUEST)

        if (response.status === CREATED){
            const state = {"lobby_id": res["lobby_id"], "player_id": res["player_id"], "gameName": name, "player_name": host }
            history.push("/lobby", state);
        }

    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
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
        }else if(!((password.length < 21) && (password.length > 4)) && password !== ""){
            setWrongPassword(true)
        }else{
            handleSubmit()
        }
    }

    return (
        <div className="Background-formgame">
             <a href="/">
                <a className="return-button"><RiArrowGoBackFill/></a>
            </a>
            
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
                        : ((wrongPassword)
                        ? <label className="Error">⚠️La contaseña no cumple el formato esperado⚠️</label>
                        : <p/>
                        ))) 
                    }
                    <p/>
                    <label>
                        Nombre de la partida*
                        <p/>
                        <input type="text" name="name" autoComplete="off" placeholder="Nombre de partida" onClick={EraseError} onChange={e => setName(e.target.value)} />
                    </label>
                    <p/>
                    <label>
                        Apodo*
                        <p/>
                        <input type="text" name="host" autoComplete="off" placeholder="Apodo" onClick={EraseError} onChange={e => setHost(e.target.value)} />
                    </label>
                    <p/>
                    <label className="pass-wrapper">
                        Contraseña
                        <p/>
                        <input type={passwordShown ? "text" : "password"} name="host" autoComplete="off" placeholder="Contraseña (opcional)" onChange={e => setPassword(e.target.value)}/>
                       
                    </label>
                    {(passwordShown) 
                    ? 
                        <i onClick={togglePasswordVisiblity}><BsEyeSlashFill/></i> 
                    : 
                        <i onClick={togglePasswordVisiblity}><BsEyeFill/></i>
                    }
                    <p/>
                    <button className="GameButton" type="submit" value="Crear">Crear</button> <br/>
                    * Los campos son obligatorios, deben estar entre los 5 y 20 caracteres
                </form>
            </div>
        </div>
    );

}

export default CreatingFrom;