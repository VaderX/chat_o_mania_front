import Logo from './../../../logo.svg';
import React from 'react';
import { Row, Col, Button } from 'reactstrap';

const ChatOptionParser = (props) => {
    return (
        <React.Fragment>
            <Row className="ChatOptionsHome p-4 mt-5 mb-5">
                <Col md="4" className="m-auto">
                    <Row>
                        <Col md="12" className="fs-1 fw-bold text-primary">
                            {props.heading}
                        </Col>
                        <Col className="text-secondary">
                            {props.desc}
                        </Col>
                    </Row>
                </Col>
                <Col md="4" className="m-auto">
                    <img src={Logo} style={{ width: "250px", height: "100px" }} />
                    {/* <img src={Logo} /> */}
                </Col>
                <Col className="m-auto">
                    <Button href="/menu" className="RoomBtn">Click Here to enter</Button>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default ChatOptionParser;