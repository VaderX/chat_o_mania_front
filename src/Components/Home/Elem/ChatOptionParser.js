import Logo from './../../../logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';

const ChatOptionParser = (props) => {
    const hyperLink = props.option === "global" ? "/global" : "/menu";
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
                    {props.option === "duet" ?
                        <Link to={{ pathname: hyperLink, query: { duet: true } }}>
                            <Button className="RoomBtn">Click Here to enter</Button>
                        </Link> :
                        <Link to={{ pathname: hyperLink, query: { duet: false } }}>
                            <Button className="RoomBtn">Click Here to enter</Button>
                        </Link>
                    }
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default ChatOptionParser;