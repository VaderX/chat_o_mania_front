import React from 'react';
import { Row, Col } from 'reactstrap';

const Sidebar = () => {
    return (
        <React.Fragment>
            <Col md="1" className="SidebarBody text-center fs-1">
                <Row>
                    <Col md="12">   
                        <i className="far fa-laugh-beam Cursor"></i>
                    </Col>
                    <Col>
                        <i className="fas fa-paperclip Cursor"></i>
                    </Col>
                </Row>
            </Col>
        </React.Fragment>
    )
}

export default Sidebar;