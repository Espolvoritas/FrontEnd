import React, { useEffect, useState } from "react";
import {RiArrowGoBackFill} from 'react-icons/ri';
import {colors, clrtostr} from './dicts'
import {CardsImg, CardsName} from "./cardReference";
import {BiTimer} from 'react-icons/bi'
import {BsDropletFill} from 'react-icons/bs'

const Stats = () => {
    const [stats, setStats] = useState([]);
    const [isEmptyList, setIsEmptyList] = useState(false);

    useEffect(() => {
        const firstCall = setTimeout(handleGames, 0);
        return () => clearTimeout(firstCall);
    }, []);

    async function handleGames(){
        try {
            const response = await fetch('http://127.0.0.1:8000/lobby/stats', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                    }
            });
            if (response.status === 200) {
                setStats(await response.json())
                setIsEmptyList(false)
            }
            else {
                setStats([])
                setIsEmptyList(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    if (stats["won_games"]) {
    return (
        <div className="stats-background">
        	<a className="ref" href="/">
              <b className="return-button"><RiArrowGoBackFill/></b>
          </a>

            <h1>Estadísticas</h1>
        
            <table id="stats-list">
                <tbody>
                <tr>
                    <td className="c1">Partidas Jugadas</td>
                    <td className="c2">{stats["won_games"] + stats["lost_games"]}</td>
                </tr>
                <tr>
                    <td className="c1">Partidas Ganadas</td>
                    <td className="c2">{stats["won_games"]}</td>
                </tr>
                <tr>
                    <td className="c1">Acusasiones Correctas</td>
                    <td className="c2">{stats["right_accusations"]}</td>
                </tr>
                <tr>
                    <td className="c1">Acusasiones Incorrectas</td>
                    <td className="c2">{stats["wrong_accusations"]}</td>
                </tr>
                <tr>
                    <td className="c1">Sospechas Hechas</td>
                    <td className="c2">{stats["suspicions_made"]}</td>
                </tr>
                <tr>
                    <td className="c1">Caídas en trampas</td>
                    <td className="c2">{stats["trap_falls"]}</td>
                </tr>
                </tbody>
            </table> <br/>
        
            {(stats["most_chosen_color"]) ?          
                <div className="color-stats">
                    <a>El color {clrtostr[stats["most_chosen_color"]["color_id"]]} </a>
                    <a style={{color: colors[stats["most_chosen_color"]["color_id"]]}}>
                        <BsDropletFill/>
                    </a>
                    <a> se eligió el {stats["most_chosen_color"]["percentage"]}% de las partidas</a>
                </div> : <a></a>
            }

            {(stats["top_envelope_monster"] && stats["top_envelope_victim"]  && stats["top_envelope_room"]
            ?
            <div className="envelope-stats">
                <a>Las cartas más frecuentes en el sobre fueron</a>
            
            <table>
            <tbody>
                <tr>
                    <td><img className="cards-stats" src={CardsImg[stats["top_envelope_monster"]["card_id"]]} alt={CardsImg[stats["top_envelope_monster"]["card_id"]]}/></td>
                    <td><img className="cards-stats" src={CardsImg[stats["top_envelope_victim"]["card_id"]]} alt={CardsImg[stats["top_envelope_victim"]["card_id"]]}/></td>
                    <td><img className="cards-stats" src={CardsImg[stats["top_envelope_room"]["card_id"]]} alt={CardsImg[stats["top_envelope_room"]["card_id"]]}/></td>
                </tr>
                <tr>
                    <td>{stats["top_envelope_monster"]["percentage"]}%</td>
                    <td>{stats["top_envelope_victim"]["percentage"]}%</td>
                    <td>{stats["top_envelope_room"]["percentage"]}%</td>
                </tr>
            </tbody>
            </table>
                
            </div>
            :
            <a></a>
            )}


            {(stats["average_game_time"]) 
            ?
            <div className="time-stats">
                <a className="timer"><BiTimer/></a>
                <div className="timer-text">
                    <a>Se jugó un promedio de {stats["average_game_time"]["hours"]} horas, {stats["average_game_time"]["minutes"]} minutos y {stats["average_game_time"]["seconds"]} segundos</a>
                </div>
            </div>   
            :
            <a></a>
            }
        </div>
    );
    }else {
        return (
            <div className="stats-background">
                <h1>Estadísticas</h1>
                <div className="Warning">⚠️No hay estadísticas disponibles. Prueba jugando algunas partidas⚠️</div>
            </div>
        );
    }
}


export default Stats;