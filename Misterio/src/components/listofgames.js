import React from "react";
import '../css/listofgames.css';



const ListGames = () => {
    
    function DisplayJson() {
        return (
        <div className="Wrapper">
            <table id="keywords" cellSpacing="0" cellPadding="0">
                <thead>
                <tr>
                    <th>Partida</th>
                    <th>Creador</th>
                    <th>Jugadores</th>
                    <th>Contraseña</th>
                </tr>
                </thead>
                <tbody>
                    {data.content.body.map(block => (
                    <tr className="Rows" onClick={() => console.log("Selecting game")}>
                        <td>{block.name} </td>
                        <td>{block.host}</td>
                        <td>{block.players}/6</td>
                        {
                        // Check if game has password
                            (block.password === "") ? <td>🔓</td> : <td>🔐 </td> 
                        }
                    </tr>
                    ))}
                    
                </tbody>
            </table>
            </div>
        )
    }

    return (
        <div>
            <h1>Selecciona la partida</h1>
            {DisplayJson()}
        </div>
        
    );
}

export default ListGames;