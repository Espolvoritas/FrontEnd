import React, { useState } from "react";
import '../css/listofgames.css';

const ListGames = () => {

    const [listGame, setListGame] = useState([]);
    const [isEmptyList, setIsEmptyList] = useState(false);

    async function handleGames(){
        console.log("test")
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
            // Advertencia de que no hay partidas creadas
        }
    }
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
                            // Check if game has password
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
            {(isEmptyList) ? <p className="Warning">⚠️No hay partidas disponibles. Prueba creando una⚠️</p> : <p/>}
            {DisplayJson()}
        </div>
    );
}

export default ListGames;