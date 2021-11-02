import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { useHistory } from "react-router-dom";

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
        const autoRefresh = setInterval(handleGames, 10000);
        return () => clearInterval(autoRefresh);
    }, []);

    // establish connection with the backend
    async function handleGames(){
        try {
            const response = await fetch('http://127.0.0.1:8000/game/availableGames', {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nickNameData = {
            "gameId": gameid,
            "playerNickname": nickname
        }
        if ((nickname !== "") && (nickname.length < 21) && (nickname.length > 4)){
            try {
                const joinChecked = await fetch('http://127.0.0.1:8000/game/joinCheck', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(nickNameData)
                })
                console.log(joinChecked)
                const response = await joinChecked.json()
                if (joinChecked.status === 200 && response["nicknameIsValid"]){
                    const state = {"game_id": gameid, "player_id": response["playerId"], "gameName": gameName}
                    history.push("/lobby", state);
                } else {
                    setIsRepeated(!response["nicknameIsValid"])
                    console.log("Error en joinChecked")
                }
            }
            catch(error) {
                console.log(error)
            }
        } else {
            setNotFormated(true)
        }
    }

    const settingid = (i) => {
        setGameName(listGame[i]["name"])
        setGameID(listGame[i]["id"])
        setIsRepeated(false)
        setNotFormated(false)
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
                            <Popup trigger= {
                                <tr key={block.id} className="Rows-List">
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
                                    <div className="modal">
                                        <button className="close" onClick={close}>&times;</button>
                                        <div className="popupheader"> Ingrese un apodo entre 5 y 20 caracteres </div>
                                        <div className="content">
                                            {
                                                (isRepeated)
                                                ? <label className="takensign"> Apodo tomado </label>
                                                : <p/>
                                            }
                                            {
                                                (notFormated) 
                                                ?  <label className="takensign"> Apodo mal formateado </label>
                                                : <p/>
                                            }
                                            <form>
                                                <label>
                                                    <p/>
                                                    <input className="nicknameinput" type="text" name="nickname"  
                                                        onClick={() => {setIsRepeated(false); setNotFormated(false)}}
                                                        onChange={e => setNickName(e.target.value)} required autoComplete = "off"/>
                                                </label>
                                                <input className="sendbutton" type="submit" value="➤" onClick={handleSubmit}/>
                                            </form>
                                        </div>
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