import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import ListGames from '../components/listofgames'
import {BsEyeFill, BsEyeSlashFill} from 'react-icons/bs';

test('Render components and inputs expected', () => {

    render(<ListGames/>)
    
    expect(screen.getByText(/Selecciona la partida/i)).toBeInTheDocument()
    expect(screen.getByText("Nombre")).toBeInTheDocument()
    expect(screen.getByText("Creador")).toBeInTheDocument()
    expect(screen.getByText("Jugadores")).toBeInTheDocument()
    expect(screen.getByText("Contraseña")).toBeInTheDocument()
    expect(screen.getByText("Actualizar")).toBeInTheDocument()
    
})

test('Render with password', () => {

    const mock = jest.fn();

    const listGame = {"name": "Jugador1", "host": "Jugador1", "players": 1, "password": "password123"}
    const passwordShown = true

    render(listGame["password"]
            ? 
            <div>
            <label className="popupheader"> Ingrese la contraseña de la partida <p/>
                <input className="nicknameinput" type={passwordShown ? "text" : "password"} name="password"  
                    onChange={e => setInputPassword(e.target.value)} required autoComplete = "off"/>
                    {(passwordShown) 
                    ? 
                        <i className="eye" onClick={() => setPasswordShown(true)}><BsEyeSlashFill/></i> 
                    : 
                        <i className="eye" onClick={() => setPasswordShown(true)}><BsEyeFill/></i>
                    }
                </label> 
                <input data-testid="with-password" className="sendbutton" type="submit" value="➤" onClick={mock}/>
            </div>
            : <input data-testid="without-password" className="sendbutton" type="submit" value="➤" onClick={mock}/>
            )

    expect(screen.getByText(/Ingrese la contraseña de la partida/i)).toBeInTheDocument()

    const button = screen.getByTestId("with-password")

    fireEvent.click(button);

    expect(mock).toHaveBeenCalled();

})

test('Render without password', () => {

    const mock = jest.fn();

    const listGame = {"name": "Jugador1", "host": "Jugador1", "players": 1, "password": ""}
    const passwordShown = true

    render(listGame["password"]
            ? 
            <div>
            <label className="popupheader"> Ingrese la contraseña de la partida <p/>
                <input className="nicknameinput" type={passwordShown ? "text" : "password"} name="password"  
                    onChange={e => setInputPassword(e.target.value)} required autoComplete = "off"/>
                    {(passwordShown) 
                    ? 
                        <i className="eye" onClick={() => setPasswordShown(true)}><BsEyeSlashFill/></i> 
                    : 
                        <i className="eye" onClick={() => setPasswordShown(true)}><BsEyeFill/></i>
                    }
                </label> 
                <input data-testid="with-password" className="sendbutton" type="submit" value="➤" onClick={mock}/>
            </div>
            : <input data-testid="without-password" className="sendbutton" type="submit" value="➤" onClick={mock}/>
            )

    const button = screen.getByTestId("without-password")

    fireEvent.click(button);

    expect(mock).toHaveBeenCalled();

})