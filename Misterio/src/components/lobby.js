import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

const Lobby = () => {

    const [listPlayers, setListPlayers] = useState([]); 
    let statusNextPage = useRef(false); 
    const ws = useRef(null);

    const history = useHistory()
    const datahost = history.location.state
    const state = {"game_id": datahost["game_id"], "player_id": datahost["player_id"]} // Data to next page

    // WebSocket recieve and close connection
    useEffect(() => {
      ws.current = new WebSocket("ws://localhost:8000/game/getPlayers/" + String(datahost["player_id"]))
      ws.current.onmessage = (event) => {
        if(JSON.parse(event.data) === "STATUS_GAME_STARTED"){
          statusNextPage.current = true
        }else{
          setListPlayers(JSON.parse(event.data));
        }
      };

      ws.current.onclose = () => {
        if(!statusNextPage.current){
          history.push("/listofgames")
        }else{
          history.push("/gameboard", state);
          ws.current.close();
        }
      };
    }, []);

    // Inform to back through endpoint to push gameboard page
    const clickNextPage = async (e) => {
      e.preventDefault();
      const response = await fetch('http://127.0.0.1:8000/game/startGame', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: datahost["player_id"]
      })

      if(response.status === 200){
        history.push("/gameboard", state);
        ws.current.close();
      }
    }

    // Pushing to list of games page and closing WebSocket
    const clickExitLobby = () => {
      history.push("/listofgames");
      ws.current.close();
    }

    return (
        <div className="Background-Lobby">
          <div className="Title">Sala: {datahost["gameName"]}
            <table id="key-lobby" cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>            
                    {Object.keys(listPlayers).map((block, i) => (
                      <tr key={i} className="Rows-Lobby">
                          <td>{listPlayers[block]} </td> 
                          <td></td>
                      </tr>
                    ))}
                </tbody>
            </table>

            <div id="LobbyChat" >
              <div className="GameButton-lobby">
                {
                  (datahost["game_id"] !== undefined)
                  ? <button className="GameButton-lobby" onClick={e => clickNextPage(e)}>Iniciar partida</button>
                  : <p/>
                }
                <button className="GameButton-lobby" onClick={() => clickExitLobby()}>Salir de la sala</button>
              </div>
            </div>
          </div>
        </div>
  );
}

export default Lobby;