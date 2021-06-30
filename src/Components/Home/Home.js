import './Home.css';
import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
const Home = () => {
    const [create, setCreate] = useState(false);
    const [room, setRoom] = useState(false);
    return (
        <React.Fragment>
            <Container>
                <Row className="text-center mt-5">
                    {
                        !room ?
                            <Col xs="12" md="6" className="Room CreateRoom p-5">
                                Create a Room
                            </Col>
                            :
                            <Col className="Room JoinRoom p-5">
                                Join a Room
                            </Col>
                    }
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Home;