import { React } from "react";
import { useHistory } from "react-router-dom";
import {CardsImg, CardsName} from "./cardReference";

const EndGame = () => {
    const history = useHistory()
    const datahost = history.location.state

    function goBack(e){
        e.preventDefault();
        history.push('/');
    }

    const deck = {}
    
    return (
        <div className="Background">
            <div className="endGameBox">
                {(datahost["allLost"]) ? <div>☠️Todos los jugadores perdieron☠️ <br/></div> 
                : <div>🎉Ganó el jugador: {datahost["acusationPlayer"]}🎉 <br/></div>}
                Las cartas del sobre eran:
                <div>
                    {Object.keys(deck).map((i) => (
                        <img key={i} className="endgame-card" src={CardsImg[deck[i]]} alt={CardsName[deck[i]]}/>
                    ))}
                </div>
            </div>
            <button className="gobackButton" onClick = {(e) => goBack(e)}> Volver a jugar!</button> 
        </div>
    );
}

export default EndGame;