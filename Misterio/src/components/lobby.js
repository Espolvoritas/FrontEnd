import React, { useDebugValue, useState } from "react";
import '../css/lobby.css';
import { useHistory } from "react-router-dom";


const Lobby = () => {

    const [data, setData] = useState();

    const history = useHistory()
    const datahost = history.location.state
    
    const CreateGame = async () => {
      const ws = new WebSocket("ws://localhost:8000/game/getPlayers/1")

      ws.onopen = () => {
        console.log('WebSocket Client Connected');
      };
      ws.onmessage = (event) => {
        setData(event.data);
      };

      console.log(ws)
    }

    return (
        <div >
            <div>Sala: {datahost["gameName"]}</div>

            {data.map((block, i) => 
                <div key={i}>Nombre: {block.name} </div>
            )}

            <div>Chat próximo sprint</div>

            <a href="/gameboard">
                <button className="GameButton-lobby" >Iniciar partida</button>
            </a>
        </div>
    );
}

export default Lobby;