import { React, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {CardsImg, CardsName} from "./cardReference";

const EndGame = () => {

    const history = useHistory()
    const datahost = history.location.state

    function goBack(e){
        e.preventDefault();
        history.push('/');
    }

    
    useEffect(() => {
        localStorage.removeItem("list_player" + datahost["gameName"] + datahost["player_id"])
        localStorage.removeItem("list_report" + datahost["gameName"] + datahost["player_id"])
        localStorage.removeItem("list_solution" + datahost["gameName"] + datahost["player_id"])
    });

    let envelope = datahost["envelope"]

    return (
        <div className="Background">
            <div className="endGameBox">
                {(datahost["allLost"]) ? <div>☠️Todos los jugadores perdieron☠️ <br/></div> 
                : <div>🎉Ganó el jugador: {datahost["acusationPlayer"]}🎉 <br/></div>}
                Las cartas del sobre eran:
                <div>
                    {Object.keys(envelope).map((i) => (
                        <img key={i} className="endgame-card" src={CardsImg[envelope[i]]} alt={CardsName[envelope[i]]}/>
                    ))}
                </div>
                <button className="gobackButton" onClick = {(e) => goBack(e)}> Volver a jugar!</button> 
            </div>
        </div>
    );
}

export default EndGame;