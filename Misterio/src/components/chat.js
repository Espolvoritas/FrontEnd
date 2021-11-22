import React, { useState } from "react";
import { useCustomEventListener } from 'react-custom-events';
import PerfectScrollbar from 'react-perfect-scrollbar'
import {colors} from './dicts'

const Chat = (ws, isLobby, gameName) => {

    const [msg, setMsg] = useState("")
    const [scroll, setScroll] = useState(null);
    let [list_player, setList_chat] = useState(JSON.parse(localStorage.getItem('list_player' + gameName)));

    if(list_player === null){
        list_player = []
        for(let i = 0; i < 3; i++){
            list_player[i] = []
        }
        localStorage.setItem('list_player' + gameName, JSON.stringify(list_player));
    }

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

            let player = JSON.parse(localStorage.getItem('list_player' + gameName))

            player[0] = [...player[0], data_message["user"]]
            player[1] = [...player[1], data_message["str"]]
            player[2] = [...player[2], data_message["color"]]

            localStorage.setItem('list_player' + gameName, JSON.stringify(player));
            setList_chat(player)

            if (scroll) {
                scroll.scrollTop = scroll.scrollHeight;
            }
        }
    });

    const sendmsg = (e) => {
        e.preventDefault();
        if(msg !== "")
        ws.send(JSON.stringify({'code': 8192, 'msg': msg}))
        setMsg("");
        e.target.reset();
    }

    if(isLobby){

        return (
            
            <div className="gameboard-background-chat" >
                <PerfectScrollbar containerRef={ref => { setScroll(ref);}} className="scrollbar">
                    {Object.keys(list_player[0]).map((i) => (
                        <div key={i} className="gameboard-chat-player">
                            <div key={i+"gameboard-player"} className="gameboard-whom-message" style={{color: colors[list_player[2][i]]}}>
                                {list_player[0][i]}:
                            </div>
                            <div key={i+"gameboard-message"} className="gameboard-message">
                                {list_player[1][i]}
                            </div>
                        </div>
                    ))}
                </PerfectScrollbar>
                <form onSubmit={(e) => sendmsg(e)} className="gameboard-form-chat">
                    <input className="gameboard-send-msg" placeholder="Escribe aquí..." autoComplete="off" type="text" name="name" onChange={e => setMsg(e.target.value)}/>
                    <input className="gameboard-send-button" type="submit" value="➤"/>
                </form>
            </div>
            
        );

    }else{

        return (
            
            <div className="lobby-background-chat" >
                <PerfectScrollbar containerRef={ref => { setScroll(ref);}} className="scrollbar">
                    {Object.keys(list_player[0]).map((i) => (
                        <div key={i} className="lobby-chat-player">
                            <div key={i+"lobby-player"} className="lobby-whom-message" style={{color: colors[list_player[2][i]]}}>
                                {list_player[0][i]}:
                            </div>
                            <div key={i+"lobby-message"} className="lobby-player-message">
                                {list_player[1][i]}
                            </div>
                        </div>
                    ))}
                </PerfectScrollbar>
                <form onSubmit={(e) => sendmsg(e)} className="lobby-form-chat">
                    <input className="lobby-send-msg" placeholder="Escribe aquí..." autoComplete="off" type="text" name="name" onChange={e => setMsg(e.target.value)}/>
                    <input className="lobby-send-button" type="submit" value="➤"/>
                </form>
            </div>
            
        );

    }

}

export default Chat;