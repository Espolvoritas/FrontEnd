import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import {Suspicion} from '../components/suspicion'
import userEvent from '@testing-library/user-event'
import {CardsImg, CardsName} from "../components/cardReference";

test('render without crashing (Suspicion)', () => {

    const result = render(<Suspicion />);

    const title_suspicion = result.getByText(/Realiza una sospecha/i)
    expect(title_suspicion).toBeInTheDocument();

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

})


test('render without crashing (NotifySuspicion)', () => {

    const player = "Jugador1"
    const victim = 2
    const monster = 2
    const place = 3

    const result = render(<div className="not-sus">
                            <button className="close-not-sus" onClick={close}>✖</button> <br/>
                            <div className="header-sus">La sospecha de {player} fue:
                                <div className="sus-text">{CardsName[monster]} asesinó {CardsName[victim]} en {CardsName[place]}</div>
                            </div>
                          </div>);

    const player_name = result.getByText("La sospecha de " + player + " fue:")
    expect(player_name).toBeInTheDocument();

    const suspicion = result.getByText(CardsName[monster] + " asesinó " + CardsName[victim] + " en " + CardsName[place])
    expect(suspicion).toBeInTheDocument();

    const close_button = result.getByText("✖");
    expect(close_button).toBeInTheDocument();

})


test('render without crashing (ShowSuspicionResult)', () => {

    const nickname = "Jugador1"
    const card = 2

    const result = render(<div className="show-sus">
                            <button className="close-show" onClick={close}>✖</button> <br/>
                            <div className="header-sus">{nickname} tiene esta carta</div>
                            <img className="card-sus" src={CardsImg[card]} alt={CardsName[card]}/>
                          </div>);

    const cards = screen.getByText(nickname + " tiene esta carta")
    expect(cards).toBeInTheDocument();

})

test('render without crashing (ChooseCard)', () => {

    const deck = {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6,
        6: 7
    }

    const pickedCard = 3

    const validInput = true;

    render(<div className="choose-card">
            <div className="header-sus">Elige una carta para mostrar</div>
            {Object.keys(deck).map((i) => (
                <img key={i} className="card-pick" src={CardsImg[deck[i]]} alt={CardsName[deck[i]]}
                    onClick={() => setPickedCard(deck[i])}/>
            ))}
            {(validInput) ? <div className="notice-card">Elegiste esta carta: {CardsName[pickedCard]}<br/>
                <input className="send-card" type="submit" value="Enviar" onClick={close}/></div>: <b/>}
           </div>);

    const cards = screen.getByText(/Elige una carta para mostrar/i)
    expect(cards).toBeInTheDocument();

    const picked_card = screen.getByText("Elegiste esta carta: " + CardsName[pickedCard])
    expect(picked_card).toBeInTheDocument();

})


test('Another player shows a card (ShowStatus)', () => {

    const nickname = "Jugador1"
    const sus = "Jugador2"

    const hasCard = true

    render(<div className="show-status">
            <button className="close-status" onClick={close}>✖</button> <br/>
            {(hasCard) ? <div className="notice-card">{nickname} respondió a la sospecha de {sus}</div> 
                : <div className="notice-card">{nickname} no tiene cartas para responderle a {sus}</div>}
           </div>);

    const player_response = screen.getByText(nickname + " respondió a la sospecha de " + sus)
    expect(player_response).toBeInTheDocument();

})

test('Another player have not card (ShowStatus)', () => {

    const nickname = "Jugador1"
    const sus = "Jugador2"

    const hasCard = false

    render(<div className="show-status">
            <button className="close-status" onClick={close}>✖</button> <br/>
            {(hasCard) ? <div className="notice-card">{nickname} respondió a la sospecha de {sus}</div> 
                : <div className="notice-card">{nickname} no tiene cartas para responderle a {sus}</div>}
           </div>);

    const player_response = screen.getByText(nickname + " no tiene cartas para responderle a " + sus)
    expect(player_response).toBeInTheDocument();

})


test('render without crashing (NotifySend)', () => {

    const nickname = "Jugador1"
    const card = 2

    render(<div className="notify-send">
            <button className="close-notify" onClick={close}>✖</button> <br/>
            <div className="header-not-send">Le enviaste esta carta a {nickname}</div>
            <img className="card-notify" src={CardsImg[card]} alt={CardsName[card]}/>
           </div>);

    const show_card = screen.getByText("Le enviaste esta carta a " + nickname)
    expect(show_card).toBeInTheDocument();

})

