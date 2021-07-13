import React from 'react';
import { Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import JoinRoom from '../JoinRoom/JoinRoom';

const Global = () => {
    const roomId = useSelector(state => state.roomId)
    if (roomId)
        window.location = '/room/' + roomId;
    return (
        <React.Fragment>
            <Container>
                <Row className="text-center mt-5">
                    <JoinRoom loc="global chat" />
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Global;