import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { AiFillHome } from 'react-icons/ai';
import {RiArrowGoBackFill} from 'react-icons/ri';
import Chat from "./chat";
import { emitCustomEvent } from 'react-custom-events';
import {colors, clrtostr, strtoclr} from './dicts'
import {OK, WS_CHAT_MSG} from './constants'

const Lobby = () => {

    const [listPlayers, setListPlayers] = useState([]); 
    const [listColors, setlistColors] = useState([]); 
    let statusNextPage = useRef(false); 
    const ws = useRef(null);
    const isLobby = false

    const history = useHistory()
    const datahost = history.location.state
    const state = {"player_id": datahost["player_id"], "player_name": datahost["player_name"], "gameName": datahost["gameName"]} // Data to next page
    // WebSocket recieve and close connection
    useEffect(() => {
      ws.current = new WebSocket("ws://localhost:8000/lobby/" + String(datahost["player_id"]))
      ws.current.onmessage = (event) => {
        if(JSON.parse(event.data) === "STATUS_GAME_STARTED"){
          statusNextPage.current = true
        }else if(JSON.parse(event.data)["code"] & WS_CHAT_MSG){
          emitCustomEvent('websocket', JSON.parse(event.data));
        } else{
          setListPlayers(JSON.parse(event.data)["players"]);
          setlistColors(JSON.parse(event.data)["colors"]);
        }
      };

      ws.current.onclose = () => {
        if(!statusNextPage.current){
          localStorage.removeItem("list_player" + datahost["gameName"] + datahost["player_id"])
          history.push("/listofgames")
        }else{
          history.push("/gameboard", state);
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

      if(response.status === OK){
        statusNextPage.current= true
        ws.current.close();
      }
    }

    const chooseColor = async (value) => {
      const colordata = {
        "player_id": datahost["player_id"],
        "color": value
      }
      await fetch('http://127.0.0.1:8000/lobby/pickColor', {
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

    function canStart(ishost){

      if(ishost){
        return(
          <div className="GameButton-lobby">
            <button className="startgame-button" onClick={e => clickNextPage(e)}>Iniciar partida</button>
            <button className="exitgame-button" onClick={() => clickExitLobby()}>Salir de la sala</button>
          </div>
        );
      }else{
        return(
          <div className="GameButton-lobby">
            <button className="exitgame-button" onClick={() => clickExitLobby()}>Salir de la sala</button>
          </div>
        );
      }

      
    }

    return (
        <div className="Background-Lobby">
        	<a className="ref" href="/">
              <b className="home-button"><AiFillHome/></b>
          </a>

			<a href="/listofgames">
              <b className="return-button"><RiArrowGoBackFill/></b>
          </a>
          
          <div className="Title">Sala: {datahost["gameName"]}
            {Chat(ws.current, isLobby, datahost["gameName"], datahost["player_id"])}
            <table className="key-lobby" cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(listPlayers).map((block, i) => (
                      <tr key={i} className="Rows-Lobby">
                          <td>{listPlayers[block]['nickname']} </td> 
                          <td><div className="player-color" style={{backgroundColor: colors[listPlayers[block]['Color']]}}></div> </td>
                      </tr>
                    ))}
                </tbody>
            </table>
            <Dropdown className="drop-colors" options={Object.keys(listColors).map((i) => (clrtostr[listColors[i]]))} onChange={(value) => chooseColor(strtoclr[value.value])} placeholder={"Cambia el color"}/>

            {canStart(datahost["lobby_id"] !== undefined)}

          </div>
          
        </div>
  );
}

export default Lobby;