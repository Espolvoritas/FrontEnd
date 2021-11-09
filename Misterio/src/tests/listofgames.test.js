import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import ListGames from '../components/listofgames'

test('Render components and inputs expected', () => {

    render(<ListGames/>)
    
    expect(screen.getByText(/Selecciona la partida/i)).toBeInTheDocument()
    expect(screen.getByText("Nombre")).toBeInTheDocument()
    expect(screen.getByText("Creador")).toBeInTheDocument()
    expect(screen.getByText("Jugadores")).toBeInTheDocument()
    expect(screen.getByText("Contraseña")).toBeInTheDocument()
    expect(screen.getByText("Actualizar")).toBeInTheDocument()
    

})

