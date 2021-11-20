import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import {createMemoryHistory} from 'history'
import { Router } from "react-router-dom";

test('render without crashing (Acusation)', () => {

    const history = createMemoryHistory();
    const state = { "acusationPlayer": "Jugador1", "allLost": false }
    history.push("/gameboard", state);

    const validInput = true

    const result = render(
        <Router history={history}>
            <button className="acusation-button"> Acusar🔎✉️</button>
            <div className="acusation-box">
                <button className="close-acusation" onClick={(e) => closeCleanup(e)}>✖</button> <br/>
                    <div className="header-acusation">Realiza una acusación</div>
                    <select data-testid="monster-dropdown" onChange={(e) => setMonster(e.target.value)}>
                        <option value="" selected disabled hidden>Elige un monstruo</option>
                        <option value={6}>Dr. Jekyll Mr. Hyde</option>
                        <option value={1}>Drácula</option>
                        <option value={4}>Fantasma</option>
                        <option value={2}>Frankenstein</option>
                        <option value={3}>Hombre Lobo</option>
                        <option value={5}>Momia</option>
                    </select>
                    asesinó al/a la
                    <select data-testid="victim-dropdown" onChange={(e) => setVictim(e.target.value)}>
                    <option value="" selected disabled hidden>Elige una víctima</option>
                        <option value={9}>Ama de Llaves</option>
                        <option value={7}>Conde</option>
                        <option value={8}>Condesa</option>
                        <option value={11}>Doncella</option>
                        <option value={12}>Jardinero</option>
                        <option value={10}>Mayordomo</option>
                    </select>
                    en el/la
                    <select data-testid="room-dropdown" onChange={(e) => setRoom(e.target.value)}>
                        <option value="" selected disabled hidden>Elige una habitacion</option>
                        <option value={17}>Alcoba</option>
                        <option value={15}>Biblioteca</option>
                        <option value={16}>Bodega</option>
                        <option value={20}>Cochera</option>
                        <option value={14}>Laboratorio</option>
                        <option value={18}>Panteón</option>
                        <option value={19}>Salón</option>
                        <option value={13}>Vestíbulo</option>
                    </select>
                    {(validInput) ? <input className="send-acusation" type="submit" value="➤" onClick={close}/> : <b/>}
            </div>
        </Router>
    );

    const title_acusation = result.getByText("Acusar🔎✉️")
    expect(title_acusation).toBeInTheDocument();

    const monster_dropdown = screen.getByTestId('monster-dropdown') 

    let options_m = monster_dropdown.querySelectorAll('option')
    
    expect(options_m[0]).toHaveTextContent(/Elige un monstruo/i);
    expect(options_m[1]).toHaveTextContent(/Dr. Jekyll Mr. Hyde/i);
    expect(options_m[2]).toHaveTextContent("Drácula");
    expect(options_m[3]).toHaveTextContent("Fantasma");
    expect(options_m[4]).toHaveTextContent("Frankenstein");
    expect(options_m[5]).toHaveTextContent(/Hombre Lobo/i);
    expect(options_m[6]).toHaveTextContent("Momia");

    const killer_text = result.getByText(/asesinó a/i)
    expect(killer_text).toBeInTheDocument();
    
    const victim_dropdown = screen.getByTestId('victim-dropdown') 

    let options_v = victim_dropdown.querySelectorAll('option')
    
    expect(options_v[0]).toHaveTextContent(/Elige una víctima/i);
    expect(options_v[1]).toHaveTextContent(/Ama de Llaves/i);
    expect(options_v[2]).toHaveTextContent("Conde");
    expect(options_v[3]).toHaveTextContent("Condesa");
    expect(options_v[4]).toHaveTextContent("Doncella");
    expect(options_v[5]).toHaveTextContent("Jardinero");
    expect(options_v[6]).toHaveTextContent("Mayordomo");

    const room_dropdown = screen.getByTestId('room-dropdown') 

    let options_r = room_dropdown.querySelectorAll('option')

    expect(options_r[0]).toHaveTextContent(/Elige una habitacion/i);
    expect(options_r[1]).toHaveTextContent("Alcoba");
    expect(options_r[2]).toHaveTextContent("Biblioteca");
    expect(options_r[3]).toHaveTextContent("Bodega");
    expect(options_r[4]).toHaveTextContent("Cochera");
    expect(options_r[5]).toHaveTextContent("Laboratorio");
    expect(options_r[6]).toHaveTextContent("Panteón");
    expect(options_r[7]).toHaveTextContent("Salón");
    expect(options_r[8]).toHaveTextContent("Vestíbulo");

})

test('Acusacion true', () => {

    
    const history = createMemoryHistory();
    const state = { "acusationPlayer": "Jugador1", "allLost": false }
    history.push("/gameboard", state);

    const acusationPlayer = "Jugador1"

    const acusationRes = true

    const result = render(
        <Router history={history}>
            <div className = "acusationResult">
                <button className="close-result" onClick={() => closeCleanup()}>✖</button> <br/>
                <div className = "acusationText">
                    La acusacion del jugador <b>{acusationPlayer}</b> fue 
                    {(acusationRes) ? <b>acertada, felicitaciones</b>  : <b> erronea</b>}
                </div>
            </div>
        </Router>);

    const loselabel = screen.getByText(/La acusacion del jugador /i)
    expect(loselabel).toBeInTheDocument();
    
})

test('Acusacion false', () => {

    
    const history = createMemoryHistory();
    const state = { "acusationPlayer": "Jugador1", "allLost": false }
    history.push("/gameboard", state);

    const acusationPlayer = "Jugador1"

    const acusationRes = false

    const result = render(
        <Router history={history}>
            <div className = "acusationResult">
                <button className="close-result" onClick={() => closeCleanup()}>✖</button> <br/>
                <div className = "acusationText">
                    La acusacion del jugador <b>{acusationPlayer}</b> fue 
                    {(acusationRes) ? <b>acertada, felicitaciones</b>  : <b> erronea</b>}
                </div>
            </div>
        </Router>);

    
})