import React from "react";
import '../css/mainpage.css';

const MainPage = () => {

    const CreateGameButton = () => {
        console.log('Redirecting to Create Game page')
    }

    const JoinGameButton = () => {
        console.log('Redirecting to Join Game page')
    }

    return (
        <div className="Title">
            <h1>Bienvenido a Misterio</h1>
            <button className="GameButton" onClick={CreateGameButton}>Crear Partida</button>
            <p/>
            <button className="GameButton" onClick={JoinGameButton}>Unirse a Partida</button>
        </div>
    );
}

export default MainPage;
