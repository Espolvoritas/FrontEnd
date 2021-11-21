import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Cards from '../components/cards'
import userEvent from '@testing-library/user-event'
import {CardsImg} from "../components/cardReference";

test('render without crashing', () => {

    const cards = [1,2,3,4,5]

    const result = render(<Cards>
                            {Object.keys(cards).map((i) => (
                                <img key={i} className="cardsImage" src={CardsImg[cards[i]]} alt=""/>
                            ))}
                          </Cards>
                        );

    let imgs = result.container.querySelectorAll('img')

    for(let i = 0; i < imgs.length; i++)
        expect(imgs[i]).toBeInTheDocument();


})