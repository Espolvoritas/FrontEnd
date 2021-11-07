import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import MainPage from '../components/mainpage'

test('check buttons ref to another page', () => {
    render(<MainPage />);
    const title = screen.getByText(/Bienvenido a Misterio/i);
    const button1 = screen.getByText(/Crear Partida/i);
    const button2 = screen.getByText(/Unirse a Partida/i);

    expect(title).toBeInTheDocument();
    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();

    expect(button1.closest('a')).toHaveAttribute('href', '/formcreatingame')
    expect(button2.closest('a')).toHaveAttribute('href', '/listofgames')
  });