import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import {ShowSalemCardResult} from '../components/salemcard'

test('renders without crashing', () => {

    const salemBool = true

    const mock = jest.fn()

    render(
            salemBool ?
                <button className="salemCardButton" onClick={mock}>
                    Usar la bruja de Salem ✉️
                </button>
            : <p></p>
            
           );

    const salemcard = screen.getByText(/Usar la bruja de Salem/i)

    expect(salemcard).toBeInTheDocument();

})

test('renders without crashing ShowSalemCardResult', () => {

    render(<ShowSalemCardResult/>);

    const envelope = screen.getByText(/El sobre misterio contiene la carta:/i)

    expect(envelope).toBeInTheDocument();
    
})

test('renders without crashing PlayerUsedSalem', () => {

    const player = "Jugador1"

    render(<div className="ShowPlayerUsed">
                <button className="closePlayerUsed">✖</button> <br/>
                <div className="PlayerUsedHeader">
                    El jugador {player} utilizo la bruja de Salem
                </div>
            </div>);
    
    const player_Salem = screen.getByText(/El jugador Jugador1 utilizo la bruja de Salem/i)

    expect(player_Salem).toBeInTheDocument();
})