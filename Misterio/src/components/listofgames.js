import React, { useEffect, useState } from "react";
import '../css/listofgames.css';

const ListGames = () => {

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
        const response = await fetch('http://127.0.0.1:8000/game/availableGames', {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            }
        })
        if (await response.status === 200) {
            setListGame(await response.json())
            setIsEmptyList(false)
        }
        else {
            setListGame([])
            setIsEmptyList(true)
        }
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
                    <tr key={i} className="Rows" onClick={() => console.log("Selecting game")}>
                        <td>{block.name} </td> 
                        <td>{block.host}</td>
                        <td>{block.players}/6</td>
                        {
                            // check if game has password
                            (!block.password) ? <td>🔓</td> : <td>🔐</td> 
                        }
                    </tr>
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