import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { useHistory } from "react-router-dom";
import '../css/listofgames.css';

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

    const [nickname, setNickName] = useState(false);
    const [gameid, setGameID] = useState(-1);
    const [isRepeated, setIsRepeated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nickNameData = {
            "nickname": nickname,
            "gameid": gameid
        }
        try {
            const joinChecked = await fetch('http://127.0.0.1:8000/game/checkJoin', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(nickNameData)
            })
            if (joinChecked.status === 200){
                const state = {"player_id": await joinChecked.json()}
                history.push("/lobby", state);
            } else {
                setIsRepeated(true)
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    const settingid = (i) => {
        setGameID(listGame[i]["id"])
    }

    // process and display the received json
    function DisplayJson() {
        return (
            <div>
                <table id="keywords" cellSpacing="0" cellPadding="0">
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
                                <tr key={block.id} className="Rows">
                                    <td onClick={() => {settingid(i);setIsRepeated(false);}}>{block.name} </td>
                                    <td onClick={() => {settingid(i);setIsRepeated(false);}}>{block.host}</td>
                                    <td onClick={() => {settingid(i);setIsRepeated(false);}}>{block.players}/6</td>
                                    {
                                        // check if game has password
                                        (!block.password) ? <td onClick={() => {settingid(i);setIsRepeated(false);}}>🔓</td>
                                        : <td onClick={() => {settingid(i);setIsRepeated(false);}} >🔐</td>
                                    }
                                </tr>
                            } modal>
                                {close => (
                                    <div className="modal">
                                        <button className="close" onClick={close}>&times;</button>
                                        <div className="header"> Ingrese su apodo </div>
                                        <div className="content">
                                            <form>
                                                {
                                                    (isRepeated)
                                                    ? <label> El apodo ya esta en uso, ingrese otro </label>
                                                    : <p/>
                                                }
                                                <label>
                                                    <p/>
                                                     <input type="text" name="nickname"
                                                        onChange={e => setNickName(e.target.value)}/>
                                                </label>
                                                <input type="submit" value="enviar" onClick={handleSubmit}/>
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
        <div className="ListGames">
            <h1>Selecciona la partida</h1>
            {(isEmptyList) ? <p className="Warning">⚠️No hay partidas disponibles. Prueba actualizar o crear una partida⚠️</p> : <p/>}
            {DisplayJson()}
        </div>
    );
}

export default ListGames;