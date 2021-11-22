import {React, useState} from "react";
import { useCustomEventListener } from 'react-custom-events';
import { emitCustomEvent } from 'react-custom-events';
import {colors} from './dicts'
import Popup from "reactjs-popup";

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
    });

    useCustomEventListener('init_moves', data => {
        setAvailable(data["moves"])
    });

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
            emitCustomEvent('room', res["room"]);
            emitCustomEvent('trap', res["trapped"]);
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
                        backgroundColor: "#643624",
                        opacity: 0.8
                    }}></div>
                ))}
            </div>
            {component}
        </div> 
    );

}


const Trapopup = () => {

    const [trap, setTrap] = useState(false)

    

    useCustomEventListener('trap', data => {
        console.log(data)
        setTrap(data)
    });

    function closeCleanup() {
        if(trap){
            setTrap(false)
        }
    }

    return(
        <Popup 
        modal
        open={trap}
        onClose={() => closeCleanup()}
        >
        {close => (
            <div className="trapped">
                <button className="close-trapped" onClick={close}>✖</button> 
                <div className="trapped-text">
                    Caiste en una trampa,<br/>
                    perderás el próximo turno.
                </div>
            </div>
        )}
        </Popup>
    )

}

export {PlayerOnGrid, Trapopup};
