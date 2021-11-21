import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import CreatingFrom from '../components/formcreatingame'
import {createMemoryHistory} from 'history'
import { Router } from "react-router-dom";
import userEvent from '@testing-library/user-event'

test('Render components and inputs expected', async () => {

    const component = render(<CreatingFrom />);
    
    const name = component.getByPlaceholderText("Nombre de partida")
    const host = component.getByPlaceholderText("Apodo")
    const password = component.getByPlaceholderText("Contraseña (opcional)")
    const submit = component.getByTestId("form")
    const button = component.getByText("Crear")

    fireEvent.input(name, {target: {value: "Sala"}});
    fireEvent.input(host, {target: {value: "Jugadorhost"}});
    fireEvent.input(password, {target: {value: "password123"}});

    fireEvent.submit(submit);
    fireEvent.click(button);

    expect(name).toBeInTheDocument();
    expect(host).toBeInTheDocument();
    expect(password).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Nombre de partida/i)).toHaveValue('Sala');
    expect(screen.getByPlaceholderText(/Apodo/i)).toHaveValue('Jugadorhost'); 
    expect(screen.getByPlaceholderText(/Contraseña/i)).toHaveValue('password123'); 

})

test('Recieving data from prev page', () => {

    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <CreatingFrom />
      </Router>
    );
  
    const aboutItem = screen.getByText('Crear');
    expect(aboutItem).toBeInTheDocument();
  
    userEvent.click(aboutItem);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
    

})