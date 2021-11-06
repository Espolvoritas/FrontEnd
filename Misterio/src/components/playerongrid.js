import {React, useRef, useState} from "react";



const PlayerOnGrid = (player, player_id) => {

    let component = []
    const [cost, setCost] = useState(0);
    const players = useState(player)

    console.log(players["players"])

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

    const x = 14;
    const y = 8;

    for (let i = 0; i < 22; i++){
        for(let j = 0; j < 22; j++){
            const position = i.toString() + " " + j.toString();
            if(i !== 7 && i !== 14 && j !== 7 && j !== 14){
                component.push(<div className="box-gameboard" id={position} key={position} onClick={() => move(i, j)}></div>)
            }else if(j === 7 || j === 14 || i === 7 || i === 14){
                component.push(<div className="box-gameboard" id={position} key={position} onClick={() => move(i, j)}></div>)
            }
        }
    }     

    async function move(i, j) {
        console.log(i.toString() + " " + j.toString())
        /*
        const moveData = {
            "player_id": player_id, 
            "x": j,
            "y": i,
            "cost": cost
          }
        const response = await fetch('http://127.0.0.1:8000/lobby/startGame', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*'
                  },
                  body: JSON.stringify(moveData)
        })
  
        if(response.status === 200){
            setCost(response["cost"])
        }
        */
      }

    return (
        
        <div className="playerOnGrid">
            <div className="player" style={{
                gridRow: x+1,
                gridColumn: y+1,
                backgroundColor: "white"
            }} onClick={() => move(x, y)}></div>
            {component}
        </div> 
    );


}

export default PlayerOnGrid;