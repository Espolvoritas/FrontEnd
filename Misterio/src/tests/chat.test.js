import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render} from '@testing-library/react'
import Chat from '../components/chat'
import WS from "jest-websocket-mock";

test('Render components and inputs expected', async () => {

    const component = render(<Chat />);
    
    const server = new WS("ws://localhost:8000/lobby/1", {
        jsonProtocol: true
     });
    const client1 = new WebSocket("ws://localhost:8000/lobby/1");
    await server.connected;
    const client2 = new WebSocket("ws://localhost:8000/lobby/1");
    await server.connected;

    const messages = {
        client1: [],
        client2: [],
        
    };

    let server_chat = []

    server.onmessage = (e) => {
        server_chat.push(e.data);
    };
    client1.onmessage = (e) => {
        messages.client1.push(e.data);
    };
    client2.onmessage = (e) => {
        messages.client2.push(e.data);
    };

    const msgtoback = [{"code": 8192,"msg": "Hola profe"}]

    client1.send(msgtoback)

    expect(server).toReceiveMessage([`[{"code":8192,"msg":"Hola profe"}]`])

    const msgtoback2 = [{"code": 8192,"msg": "Hola"}]

    client2.send(msgtoback2)

    expect(server).toReceiveMessage([`[{"code":8192,"msg":"Hola profe"},{"code":8192,"msg":"Hola"}]`])

    const msgtofront = [{"code": 8192,"msg": "Hola profe"},{"code": 8192,"msg": "Hola"}]

    server.send(msgtofront);

    expect(messages).toEqual({
       client1: [`[{"code":8192,"msg":"Hola profe"},{"code":8192,"msg":"Hola"}]`],
       client2: [`[{"code":8192,"msg":"Hola profe"},{"code":8192,"msg":"Hola"}]`],
    });

})