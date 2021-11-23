import React, {useEffect} from "react";

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
                <p/>
                <a href="/stats">
                    <button className="GameButton">Ver estadísticas</button>
                </a>
            </div>
        </div>
    );
}

export default MainPage;