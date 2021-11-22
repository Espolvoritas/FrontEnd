import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Report from '../components/report'

test('renders without crashing', () => {

    render(<Report />);


    const first_title = screen.getByText(/"MIS"/i)
    expect(first_title).toBeInTheDocument();
    const second_title = screen.getByText(/"TE"/i)
    expect(second_title).toBeInTheDocument();
    const third_title = screen.getByText(/"RIO"/i)
    expect(third_title).toBeInTheDocument();

    expect(screen.getAllByText(/Drácula/i)).toHaveLength(2);
    expect(screen.getAllByText(/Fantasma/i)).toHaveLength(2);
    expect(screen.getAllByText(/Frankenstein/i)).toHaveLength(2);
    expect(screen.getAllByText(/Hombre Lobo/i)).toHaveLength(2);
    expect(screen.getAllByText(/Momia/i)).toHaveLength(2);

    expect(screen.getAllByText(/Ama de Llaves/i)).toHaveLength(2);
    expect(screen.getAllByText(/Conde/i)).toHaveLength(3);
    expect(screen.getAllByText(/Condesa/i)).toHaveLength(2);
    expect(screen.getAllByText(/Doncella/i)).toHaveLength(2);
    expect(screen.getAllByText(/Jardinero/i)).toHaveLength(2);
    expect(screen.getAllByText(/Mayordomo/i)).toHaveLength(2);

    expect(screen.getAllByText(/Alcoba/i)).toHaveLength(2);
    expect(screen.getAllByText(/Biblioteca/i)).toHaveLength(2);
    expect(screen.getAllByText(/Bodega/i)).toHaveLength(2);
    expect(screen.getAllByText(/Cochera/i)).toHaveLength(2);
    expect(screen.getAllByText(/Laboratorio/i)).toHaveLength(2);
    expect(screen.getAllByText(/Panteón/i)).toHaveLength(2);
    expect(screen.getAllByText(/Salón/i)).toHaveLength(2);
    expect(screen.getAllByText(/Vestíbulo/i)).toHaveLength(2);

})
