import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { useHistory } from "react-router-dom";
import {BsEyeFill, BsEyeSlashFill} from 'react-icons/bs';


const ListGames = () => {

    const history = useHistory();
    const [listGame, setListGame] = useState([]);
    const [isEmptyList, setIsEmptyList] = useState(false);

    // load the list of games when the page loads
    useEffect(() => {
        const firstCall = setTimeout(handleGames, 0);
        return () => clearTimeout(firstCall);
    }, []);

    // refresh the page every ten seconds automagically
    useEffect(() => {
        const autoRefresh = setInterval(handleGames, 5000);
        return () => clearInterval(autoRefresh);
    }, []);

    // establish connection with the backend
    async function handleGames(){
        try {
            const response = await fetch('http://127.0.0.1:8000/lobby/availableGames', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                    }
            });
            if (response.status === 200) {
                setListGame(await response.json())
                setIsEmptyList(false)
            }
            else {
                setListGame([])
                setIsEmptyList(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [nickname, setNickName] = useState("");
    const [gameid, setGameID] = useState(-1);
    const [isRepeated, setIsRepeated] = useState(false);
    const [notFormated, setNotFormated] = useState(false);
    const [gameName, setGameName] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [validPassword, setValidPassword] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nickNameData = {
            "lobby_id": gameid,
            "player_nickname": nickname,
            "password": inputPassword
        }
        if (notFormated) return;
        
        const joinChecked = await fetch('http://127.0.0.1:8000/lobby/joinCheck', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(nickNameData)
        })

        const response = await joinChecked.json()
        if (joinChecked.status === 200 && response["nickname_is_valid"]){
            setValidPassword(response["password_is_valid"])
            const state = {"player_id": response["player_id"], "gameName": gameName, "player_name": nickname}
            history.push("/lobby", state);
        }
        // repeated nickname within the game
        if (joinChecked.status === 400){
            setIsRepeated(true)
        }
        // password check
        if (joinChecked.status === 401){
            setValidPassword(false)
            setIsRepeated(false)
        }
    }

    // set variables to be used in lobby
    const settingid = (i) => {
        setGameName(listGame[i]["name"])
        setGameID(listGame[i]["id"])
    }

    // validation of the nickname format
    const handleNickname = () => {
        if ((nickname !== "") && (nickname.length < 21) && (nickname.length > 4)){
            setNotFormated(false);
        }
        else{
            setNotFormated(true);
        }
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    }

    function cleanStates(){
        setPasswordShown(false);
        setNotFormated(false);
        setIsRepeated(false);
    }

    // process and display the received json
    function DisplayJson() {
        return (
            <div>
                <table id="key-list" cellSpacing="0" cellPadding="0">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Creador</th>
                            <th>Jugadores</th>
                            <th>Contraseña</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listGame.map((block, i) => (
                            <Popup 
                            key={block.id}
                            onClose={() => cleanStates()}
                            trigger= {
                                <tr className="Rows-List">
                                    <td onClick={() => {settingid(i)}}>{block.name} </td>
                                    <td onClick={() => {settingid(i)}}>{block.host}</td>
                                    <td onClick={() => {settingid(i)}}>{block.players}/6</td>
                                    {
                                        // check if game has password
                                        (!block.password) ? <td onClick={() => {settingid(i)}}>🔓</td>
                                        : <td onClick={() => {settingid(i)}} >🔐</td>
                                    }
                                </tr>
                            } modal>
                                {close => (
                                    <div className="content">
                                        <button className="close" onClick={close}>✖</button>
                                        <div className="popupheader"> Ingrese un apodo entre 5 y 20 caracteres </div>
                                            <form>
                                            {
                                                (notFormated)
                                                ? <label className="takensign">Apodo en formato incorrecto</label>
                                                : (isRepeated) 
                                                ?  <label className="takensign">Apodo ya en uso</label>
                                                : (!validPassword)
                                                ? <label className="takensign">Contraseña incorrecta</label>
                                                : <b/>
                                            }
                                                <label>
                                                    <p/>
                                                    <input className="nicknameinput" type="text" name="nickname" onChange={e => setNickName(e.target.value)}
                                                        onBlur={handleNickname} required autoComplete = "off"/>
                                                </label>
                                                {(listGame[i]["password"])
                                                ? 
                                                <div>
                                                <label className="popupheader"> Ingrese la contraseña de la partida <p/>
                                                    <input className="nicknameinput" type={passwordShown ? "text" : "password"} name="password"  
                                                        onChange={e => setInputPassword(e.target.value)} required autoComplete = "off"/>
                                                        {(passwordShown) 
                                                        ? 
                                                            <i className="eye" onClick={togglePasswordVisiblity}><BsEyeSlashFill/></i> 
                                                        : 
                                                            <i className="eye" onClick={togglePasswordVisiblity}><BsEyeFill/></i>
                                                        }
                                                    </label> 
                                                    <input className="sendbutton" type="submit" value="➤" onClick={handleSubmit}/>
                                                </div>
                                                : <input className="sendbutton" type="submit" value="➤" onClick={handleSubmit}/>
                                                }          
                                            </form>
                                    </div>
                                )}
                            </Popup>
                        ))}
                    </tbody>
                </table>
                <button className="RefreshButton" onClick={handleGames}>Actualizar</button>
            </div>
        )
    }

    return (
        <div className="Background-List">
            <div id="key-screen">
                <h1>Selecciona la partida</h1>
                {(isEmptyList) ? <div className="Warning">⚠️No hay partidas disponibles. Prueba actualizar o crear una partida⚠️</div> : <p/>}
                {DisplayJson()}
            </div>
        </div>
    );
}

export default ListGames;