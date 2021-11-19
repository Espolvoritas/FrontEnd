import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import GameBoard from '../components/gameboard'
import {createMemoryHistory} from 'history'
import { Router } from "react-router-dom";

test('renders without crashing', async () => {

    const history = createMemoryHistory();
    const state = { "player_name": "Jugador1" }
    history.push("/GameBoard", state);

    render(
        <Router history={history}>
            <GameBoard />
        </Router>
    );

    const linkElement = screen.getByText(/Es el turno de:/i)
    expect(linkElement).toBeInTheDocument();

    
})