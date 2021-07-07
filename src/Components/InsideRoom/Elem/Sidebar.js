import React from 'react';
import { Row, Col } from 'reactstrap';

const Sidebar = () => {
    return (
        <React.Fragment>
            <Col md="1" className="SidebarBody bg-primary text-white text-center fs-1">
                <Row>
                    <Col className="mt-3">
                        <i className="fas fa-camera-retro Cursor"></i>
                    </Col>
                    <Col>
                        <i className="fas fa-video"></i>
                    </Col>
                    <Col>
                        <i className="fas fa-microphone-alt"></i>
                    </Col>
                    <Col>
                        <i className="fab fa-youtube"></i>
                    </Col>
                    <Col>
                        <i className="fas fa-desktop"></i>
                    </Col>
                </Row>
            </Col>
        </React.Fragment>
    )
}

export default Sidebar;