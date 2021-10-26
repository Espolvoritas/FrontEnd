import React from "react";
import '../css/mainpage.css';

const MainPage = () => {

    return (
        <div className="Background">
            <div className="Box-tittle">
                <h1>Bienvenido a Misterio</h1>
                <a href="/formcreatingame">
                    <button className="GameButton">Crear Partida</button>
                </a>
                <p/>
                <a href="/listofgames">
                    <button className="GameButton">Unirse a Partida</button>
                </a>
            </div>
        </div>
    );
}

export default MainPage;