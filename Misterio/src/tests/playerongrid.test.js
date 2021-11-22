import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import {PlayerOnGrid} from '../components/playerongrid'
import {colors} from '../components/dicts'

test('renders without crashing', () => {

    const positions = {
        0: {"x": 0,  "y": 0, "color": 2}
    }

    const available = [
        {"x": 14,  "y": 7} 
    ]

    const result = render(<PlayerOnGrid>
                            {Object.keys(positions).map((i) => (
                                    <div key={i} className="player" style={{
                                        gridRow: positions[i]["x"]+1,
                                        gridColumn: positions[i]["y"]+1,
                                        backgroundColor: colors[positions[i]["color"]]
                                    }}></div>
                                ))}
                            {Object.keys(available).map((i) => (
                                <div key={i} className="available-cell" style={{
                                    gridRow: available[i]["x"]+1,
                                    gridColumn: available[i]["y"]+1,
                                    backgroundColor: "#643624",
                                    opacity: 0.8
                                }}></div>
                            ))}
                            </PlayerOnGrid>);



    for (let i = 0; i < 21; i++){
        for(let j = 0; j < 22; j++){
            const player = result.container.querySelector("[id='" + i + " " + j + "']");
            expect(player).toBeInTheDocument();
        }
    }

    const player = result.container.querySelector("div.playerOnGrid");
    expect(player).toBeInTheDocument();


})