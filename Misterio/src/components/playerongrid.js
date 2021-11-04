import React from "react";
import { Container, Row, Col } from 'react-grid-system';



const PlayerOnGrid = (ws) => {

    console.log(ws)

    return (
        <Container className="playerOnGrid">
            <Row>
            <Col className="col" sm={4} onClick={() => console.log("1")} style={{backgroundColor:"white"}}>
                One of three columns
            </Col>
            <Col className="col" sm={4} onClick={() => console.log("2")} style={{backgroundColor:"white"}}>
                One of three columns
            </Col>
            <Col className="col" sm={4} onClick={() => console.log("3")} style={{backgroundColor:"white"}}>
                One of three columns
            </Col>
            </Row>
        </Container>
    );


}

export default PlayerOnGrid;