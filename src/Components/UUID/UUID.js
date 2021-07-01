import React from 'react';
import { Row, Col } from 'reactstrap';

const UUID = (props) => {
    return (
        <React.Fragment>
            <Col className="mt-5 RoomIdCol">
                <Row className="w-100 m-auto">
                    <Col xs="10" md="11" className="uuid m-auto p-2">
                        {props.id}
                    </Col>
                    <Col className="copyIcon fs-4 p-md-2 p-3 m-auto">
                        <i className="fas fa-copy w-100"></i>
                    </Col>
                </Row>
            </Col>
        </React.Fragment>
    )
}
export default UUID;