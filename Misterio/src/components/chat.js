import React, { useEffect, useState } from "react";
import { useCustomEventListener } from 'react-custom-events';

const Chat = (ws) => {

    const [messages, setMessages] = useState([])

    useCustomEventListener('websocket', data => {
        if((data)["code"] & 2048) {
            setMessages((data)[""]);
        }
    });

    const [msg, setMsg] = useState("")

    const sendmsg = (e) => {
        e.preventDefault();
        //ws.send(msg)
        e.target.reset();
    }

    return (
        
        <div className="background-chat">
            {Object.keys(messages).map((i) => (
                <div key={i} className="chat-player">
                      
                </div>
            ))}
            <form onSubmit={(e) => sendmsg(e)} className="form-chat">
                <input className="send-msg" placeholder="Escribe aquí..." autoComplete="off" type="text" name="name" onChange={e => setMsg(e.target.value)}/>
                <input className="send-button" type="submit" value="Submit"/>
            </form>
        </div>
        
    );

}

export default Chat;