import React, {useEffect} from "react";

const MainPage = () => {

    useEffect(() => {
        localStorage.clear();   
        const list_report = []
        for(let i = 0; i < 20; i++){
            list_report[i] = 0
        }
        localStorage.setItem('list_report', JSON.stringify(list_report)); 
        const list_solucion = []
        for(let i = 0; i < 3; i++){
            list_solucion[i] = i.toString()
        }
        localStorage.setItem('list_solution', JSON.stringify(list_solucion));
    });

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