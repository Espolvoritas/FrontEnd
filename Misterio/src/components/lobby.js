import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const Lobby = () => {

    const [listPlayers, setListPlayers] = useState([]); 
    const [listColors, setlistColors] = useState([]); 
    let statusNextPage = useRef(false); 
    const ws = useRef(null);
    const colors = {
      '1': "#d0021b",
      '2': "#00c98d",
      '3': "#4a90e2",
      '4': "#ffffff",
      '5': "#000000",
      '6': "#ffca08",
      '7': "#ff03fb",
      '8': "#ff6208"
    }

    const clrtostr = {
      '1': "Rojo",
      '2': "Verde",
      '3': "Azul",
      '4': "Blanco",
      '5': "Negro",
      '6': "Amarillo",
      '7': "Rosa",
      '8': "Naranja"
    }

    const strtoclr = {
      "Rojo": '1',
      "Verde": '2',
      "Azul": '3',
      "Blanco": '4',
      "Negro": '5',
      "Amarillo": '6',
      "Rosa": '7',
      "Naranja": '8'
    }

    const history = useHistory()
    const datahost = history.location.state
    const state = {"game_id": datahost["game_id"], "player_id": datahost["player_id"], "player_name": datahost["player_name"]} // Data to next page

    // WebSocket recieve and close connection
    useEffect(() => {
      ws.current = new WebSocket("ws://localhost:8000/lobby/" + String(datahost["player_id"]))
      ws.current.onmessage = (event) => {
        if(JSON.parse(event.data) === "STATUS_GAME_STARTED"){
          statusNextPage.current = true
        }else{
          setListPlayers(JSON.parse(event.data)["players"]);
          setlistColors(JSON.parse(event.data)["colors"]);
        }
        console.log(event.data)
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
      const response = await fetch('http://127.0.0.1:8000/lobby/startGame', {
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

    const chooseColor = async (value) => {
      console.log(value)
      const colordata = {
        "player_id": datahost["player_id"], 
        "color": value
      }
      const response = await fetch('http://127.0.0.1:8000/lobby/pickColor', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(colordata)
      })
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
                          <td>{listPlayers[block]['nickName']} </td> 
                          <td><div className="player-color" style={{backgroundColor: colors[listPlayers[block]['Color']]}}></div> </td>
                      </tr>
                    ))}
                </tbody>
            </table>
            <Dropdown className="drop-colors" options={Object.keys(listColors).map((i) => (clrtostr[listColors[i]]))} onChange={(value) => chooseColor(strtoclr[value.value])} placeholder={"Cambia el color"}/>

              <div className="GameButton-lobby">
                {
                  (datahost["game_id"] !== undefined)
                  ? <button onClick={e => clickNextPage(e)}>Iniciar partida</button>
                  : <p/>
                }
                <button onClick={() => clickExitLobby()}>Salir de la sala</button>
              </div>
          </div>
        </div>
  );
}

export default Lobby;