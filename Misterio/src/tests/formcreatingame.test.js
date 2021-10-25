import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import CreatingFrom from '../components/formcreatingame'

test('test', async () => {

    const component = render(<CreatingFrom />);
    
    const name = component.getByPlaceholderText("Nombre de partida")
    const host = component.getByPlaceholderText("Apodo")
    const submit = component.getByTestId("form")
    const button = component.getByText("Crear")

    fireEvent.input(name, {target: {value: "Sala"}});
    fireEvent.input(host, {target: {value: "Jugadorhost"}});

    fireEvent.submit(submit);
    fireEvent.click(button);

    expect(name).toBeInTheDocument();
    expect(host).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Nombre de partida/i)).toHaveValue('Sala');
    expect(screen.getByPlaceholderText(/Apodo/i)).toHaveValue('Jugadorhost'); 

})