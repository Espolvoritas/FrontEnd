import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Rules from '../components/rules'
import userEvent from '@testing-library/user-event'

test('render without crashing', () => {

    render(<Rules />);

    const question_mark = screen.getByText("❔")
    expect(question_mark).toBeInTheDocument();

    userEvent.click(question_mark);

    const close_popup = screen.getByText("✖")
    expect(close_popup).toBeInTheDocument();

    const rule = screen.getByText(/¡A JUGAR!/i)
    expect(rule).toBeInTheDocument();


})

test('Open and closing rules popup', () => {

    render(<Rules />);

    const question_mark = screen.getByText("❔")
    expect(question_mark).toBeInTheDocument();

    userEvent.click(question_mark);

    const close_popup = screen.getByText("✖")
    expect(close_popup).toBeInTheDocument();

    userEvent.click(close_popup);

})