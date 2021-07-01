import './Home.css';
import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CreateRoom from '../CreateRoom/CreateRoom';
import JoinRoom from '../JoinRoom/JoinRoom';
const Home = () => {
    const [create, setCreate] = useState(false);
    const [join, setJoin] = useState(false);
    const backHandler = () => {
        setCreate(false); setJoin(false);
    }
    return (
        <React.Fragment>
            <Container>
                <Row className="text-center mt-5">
                    <Col md="3"></Col>
                    {
                        (!join && !create) ?
                            <React.Fragment>
                                <Col xs="11" md="3" className="m-auto RoomBtn CreateRoomBtn p-5" onClick={() => setCreate(!create)}>
                                    Create a Room
                                </Col>
                                <Col xs="11" md="3" className="m-auto RoomBtn JoinRoomBtn p-5" onClick={() => setJoin(!join)} >
                                    Join a Room
                                </Col>
                            </React.Fragment>
                            : (!join) ? <CreateRoom back={backHandler} /> : <JoinRoom back={backHandler} />
                    }
                    <Col md="3"></Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Home;