import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Lobby from '../components/lobby'
import { Router } from "react-router-dom";
import {createMemoryHistory} from 'history'
import WS from "jest-websocket-mock";

test('Render components and inputs expected', () => {

    const history = createMemoryHistory();
    const state = { "gameName": "Prueba", "player_id": 1, "game_id": 1 }
    history.push("/Lobby", state);

    render(
    <Router history={history}>
        <Lobby />
    </Router>
    );

    expect(screen.getByText(/Sala: Prueba/i)).toBeInTheDocument()
    expect(screen.getByText("Nombre")).toBeInTheDocument()
    expect(screen.getByText("Color")).toBeInTheDocument()
    expect(screen.getByText(/Iniciar partida/i)).toBeInTheDocument()
    expect(screen.getByText(/Salir de la sala/i)).toBeInTheDocument()

})

test('Recieve data from Websocket and render it', async () => {

    const history = createMemoryHistory();
    const state = { "gameName": "Prueba", "player_id": 1, "game_id": 1 }
    history.push("/Lobby", state);
    
    const component = render(
      <Router history={history}>
        <Lobby />
      </Router>
    );

    const server = new WS("ws://localhost:8000/lobby/1", {
        jsonProtocol: true
     });
    const client1 = new WebSocket("ws://localhost:8000/lobby/1");
    await server.connected;
    const client2 = new WebSocket("ws://localhost:8000/lobby/1");
    await server.connected;

    const messages = {
        client1: [],
        client2: []
    };
    client1.onmessage = (e) => {
        messages.client1.push(e.data);
    };
    client2.onmessage = (e) => {
        messages.client2.push(e.data);
    };

    const msgtosend = [{nickName: "Jugador1", Color: '1'},{nickName: "Jugador2", Color: '2'}]

    server.send(msgtosend);

    expect(messages).toEqual({
       client1: [`[{"nickName":"Jugador1","Color":"1"},{"nickName":"Jugador2","Color":"2"}]`],
       client2: [`[{"nickName":"Jugador1","Color":"1"},{"nickName":"Jugador2","Color":"2"}]`],
    });
    
})

test('click start game and push data to next page', async () => {

    const history = createMemoryHistory();
    const state = { "gameName": "Prueba", "player_id": 1, "game_id": 1 }
    history.push("/Lobby", state);

    const clickNextPage = jest.fn(() => true);

    render(
        <Router history={history}>
            <Lobby onClick={clickNextPage}/>
        </Router>
    );

    const button = screen.getByText(/Iniciar partida/i)

    fireEvent.click(button)

    expect(clickNextPage()).toBe(true);

})

