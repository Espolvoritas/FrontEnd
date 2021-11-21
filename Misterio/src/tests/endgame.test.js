import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import EndGame from '../components/endgame'
import { Router } from "react-router-dom"
import {createMemoryHistory} from 'history'
import userEvent from '@testing-library/user-event'

test('render without crashing', () => {


    const history = createMemoryHistory();
    const state = { "acusationPlayer": "Jugador1", "allLost": false }
    history.push("/EndGame", state);

    render(
        <Router history={history}>
            <EndGame />
        </Router>
    );

    const cards = screen.getByText(/Las cartas del sobre eran:/i)
    expect(cards).toBeInTheDocument();
    const button_play_again = screen.getByText(/Volver a jugar!/i)
    expect(button_play_again).toBeInTheDocument();
  
    userEvent.click(button_play_again);
    expect(history.length).toBe(3);
    expect(history.location.pathname).toBe('/');

})

test('All players lose', () => {

    const history = createMemoryHistory();
    const state = { "acusationPlayer": "Jugador1", "allLost": false }
    history.push("/EndGame", state);

    render(
        <Router history={history}>
            <EndGame />
        </Router>
    );


    const winlabel = screen.getByText(/Ganó el jugador: Jugador1/i)
    expect(winlabel).toBeInTheDocument();
    
})

test('One player wins', () => {

    const history = createMemoryHistory();
    const state = { "acusationPlayer": "Jugador1", "allLost": true }
    history.push("/EndGame", state);

    render(
        <Router history={history}>
            <EndGame />
        </Router>
    );

    const loselabel = screen.getByText(/Todos los jugadores perdieron/i)
    expect(loselabel).toBeInTheDocument();

})