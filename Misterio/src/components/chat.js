import React, { useEffect, useState, useRef } from "react";
import { useCustomEventListener } from 'react-custom-events';
import PerfectScrollbar from 'react-perfect-scrollbar'

const Chat = (ws) => {

    let [list_player, setList_player] = useState([])
    let [list_msg, setList_msg] = useState([])
    let [list_color, setList_color] = useState([])
    const [msg, setMsg] = useState("")

    const colors = {
        '1': "#d0021b",
        '2': "#00c98d",
        '3': "#4a90e2",
        '4': "#ffffff",
        '5': "#000000",
        '6': "#ffca08",
        '7': "#ff03fb",
        '8': "#ff6208"
    }

    useCustomEventListener('websocket', data => {
        if((data)["code"] & 8192) {
            const data_message = (data)["msg"];
            console.log((data)["msg"]);
            setList_player([...list_player, data_message["user"]])
            setList_msg([...list_msg, data_message["str"]])
            setList_color([...list_color, data_message["color"]])
        }
    });

    const sendmsg = (e) => {
        e.preventDefault();
        ws.send(JSON.stringify({'code': 8192, 'msg': msg}))
        e.target.reset();
    }

    return (
        
        <div className="background-chat" >
            <PerfectScrollbar>
                {Object.keys(list_player).map((i) => (
                    <div key={i} className="chat-player">
                        <div key={i+" "} className="whom-message" style={{color: colors[list_color[i]]}}>
                            {list_player[i]}:
                        </div>
                        <div key={i} className="player-message">
                            {list_msg[i]}
                        </div>
                    </div>
                ))}
            </PerfectScrollbar>
            <form onSubmit={(e) => sendmsg(e)} className="form-chat">
                <input className="send-msg" placeholder="Escribe aquí..." autoComplete="off" type="text" name="name" onChange={e => setMsg(e.target.value)}/>
                <input className="send-button" type="submit" value="Submit"/>
            </form>
        </div>
        
    );

}

export default Chat;