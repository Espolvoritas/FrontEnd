import React from "react";
import '../css/mainpage.css';

const MainPage = () => {

    return (
        <body className="Background">
            <div className="Box-tittle">
                <h1>Bienvenido a Misterio</h1>
                <a href="/formcreatingame">
                    <button className="GameButton">Crear Partida</button>
                </a>
                <p/>
                <a href="listofgames">
                    <button className="GameButton">Unirse a Partida</button>
                </a>
            </div>
        </body>
    );
}

export default MainPage;