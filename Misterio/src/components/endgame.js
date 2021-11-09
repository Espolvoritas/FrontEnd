import { React } from "react";
import { useHistory } from "react-router-dom";

const EndGame = () => {
    const history = useHistory()
    const datahost = history.location.state

    function goBack(e){
        e.preventDefault();
        history.push('/');
    }

    if(datahost["allLost"]){
        return(
            <div className="Background">  
                <div className = "endGameBox">
                    <div className = "endgameText">
                            TODOS LOS JUGADORES PERDIERON
                    </div>
                    <div className = "gobackButton">
                        <button onClick = {(e) => goBack(e)}> Volver a jugar!</button> 
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className="Background">  
                <div className = "endGameBox">
                    <div className = "endgameText">
                            GANO EL JUGADOR {datahost["acusationPlayer"]}
                    </div>
                    <div className = "gobackButton">
                        <button onClick = {(e) => goBack(e)}> Volver a jugar!</button> 
                    </div>
                </div>
            </div>
        );
    }

}

export default EndGame;