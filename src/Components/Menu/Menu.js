import './Menu.css';
import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import CreateRoom from '../CreateRoom/CreateRoom';
import JoinRoom from '../JoinRoom/JoinRoom';
const Menu = (props) => {
    const roomId = useSelector(state => state.roomId)
    const [create, setCreate] = useState(false);
    const [join, setJoin] = useState(false);
    const backHandler = () => {
        setCreate(false); setJoin(false);
    }

    // console.log("props are", props.location.query.duet)
    // console.log("room id from home", roomId)
    // console.log("this is user hehehe", currentUser)
    if (roomId)
        window.location = '/room/' + roomId;

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
                            : (!join) ? <CreateRoom duet={props.location.query.duet} back={backHandler} /> : <JoinRoom back={backHandler} />
                    }
                    <Col md="3"></Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Menu;