import React, { useState } from "react";
import { useCustomEventListener } from 'react-custom-events';
import PerfectScrollbar from 'react-perfect-scrollbar'

const Chat = (ws, isLobby) => {

    let [list_player, setList_player] = useState([])
    let [list_msg, setList_msg] = useState([])
    let [list_color, setList_color] = useState([])
    const [msg, setMsg] = useState("")
    const [scroll, setScroll] = useState(null);


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
            setList_player([...list_player, data_message["user"]])
            setList_msg([...list_msg, data_message["str"]])
            setList_color([...list_color, data_message["color"]])
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
                    {Object.keys(list_player).map((i) => (
                        <div key={i} className="gameboard-chat-player">
                            <div key={i+"gameboard-player"} className="gameboard-whom-message" style={{color: colors[list_color[i]]}}>
                                {list_player[i]}:
                            </div>
                            <div key={i+"gameboard-message"} className="gameboard-message">
                                {list_msg[i]}
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
                    {Object.keys(list_player).map((i) => (
                        <div key={i} className="lobby-chat-player">
                            <div key={i+"lobby-player"} className="lobby-whom-message" style={{color: colors[list_color[i]]}}>
                                {list_player[i]}:
                            </div>
                            <div key={i+"lobby-message"} className="lobby-player-message">
                                {list_msg[i]}
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