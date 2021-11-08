import {React, useState} from "react";
import { useCustomEventListener } from 'react-custom-events';

const PlayerOnGrid = (player_id) => {

    let component = []
    const [available, setAvailable] = useState([])
    const [positions, setPositions] = useState([])

    useCustomEventListener('websocket', data => {
        if((data)["code"] & 64) {
            setAvailable((data)["moves"]);
        }
        if((data)["code"] & 128) {
            setPositions((data)["positions"]);
        }
        if((data)["code"] & 256) {
            console.log(data)
        }
    });

    //console.log("hola " + message)
    
    const colors = {
        '1': "#d0021b",
        '2': "#417505",
        '3': "#4a90e2",
        '4': "#ffffff",
        '5': "#000000",
        '6': "#f2ff03",
        '7': "#ff03fb",
        '8': "#ffaa03"
    }

    for (let i = 0; i < 21; i++){
        for(let j = 0; j < 22; j++){
            const matrix = i.toString() + " " + j.toString();
            if(i !== 7 && i !== 14 && j !== 7 && j !== 14){
                component.push(<div className="box-gameboard" id={matrix} key={matrix} onClick={() => move(i, j)}></div>)
            }else if(j === 7 || j === 14 || i === 7 || i === 14){
                component.push(<div className="box-gameboard" id={matrix} key={matrix} onClick={() => move(i, j)}></div>)
            }else{
                component.push(<div className="box-gameboard" id={matrix} key={matrix} onClick={() => move(i, j)}></div>)
            }
        }
    }     

    async function move(i, j) {
        console.log(i.toString() + " " + j.toString())

        let remaining = 0
        let allowMovement = false

        Object.keys(available).map(
            index => (available[index]["x"] === i && available[index]["y"] === j) ? remaining = available[index]["remaining"] : 0)
        
        Object.keys(available).map(
            index => (available[index]["x"] === i && available[index]["y"] === j) ? allowMovement = true : 0)
        
        if(!allowMovement){
            return
        }

        const moveData = {
            "player_id": player_id, 
            "x": j,
            "y": i,
            "remaining": remaining
        }
        //console.log(moveData)
        const response = await fetch('http://127.0.0.1:8000/gameBoard/moves', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*'
                  },
                  body: JSON.stringify(moveData)
        })
        const res = await response.json()

        if(response.status === 200){
            
            setAvailable(res["moves"])
            
        }

      }

    return (
        
        <div className="playerOnGrid">
            <div className="player-position">
                {Object.keys(positions).map((i) => (
                    <div key={i} className="player" style={{
                        gridRow: positions[i]["x"]+1,
                        gridColumn: positions[i]["y"]+1,
                        backgroundColor: colors[positions[i]["color"]]
                    }}></div>
                ))}
                {Object.keys(available).map((i) => (
                    <div key={i} className="available-cell" style={{
                        gridRow: available[i]["x"]+1,
                        gridColumn: available[i]["y"]+1,
                        backgroundColor: "black"
                    }}></div>
                ))}
            </div>
            {component}
        </div> 
    );


}

export default PlayerOnGrid;
