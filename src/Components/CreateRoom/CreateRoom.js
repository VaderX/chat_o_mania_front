import './CreateRoom.css';
import React from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import UUID from '../UUID/UUID';

class CreateRoom extends React.Component {
    state = {
        uuid: "",
    }
    componentDidMount() {
        this.setState({ uuid: uuidv4() })
    }
    render() {

        return (
            <React.Fragment>
                <Col xs="11" md="6" className="CreateRoomDialog m-auto">
                    <Col className="text-start mt-2 fs-3">
                        <i className="fas fa-arrow-circle-left Cursor" onClick={this.props.back}></i>
                    </Col>
                    <Col className="mt-4">
                        <Input placeholder="Enter your room name" className="p-3" />
                    </Col>
                    <Col className="mt-4">
                        <Input placeholder="Enter your name" className="p-3" />
                    </Col>
                    <UUID id={this.state.uuid} />
                    <Col className="mt-5">
                        <Button className="RoomBtn btn mb-5" onClick={() => this.props.updateRoomId(this.state.uuid)}>Enter in Room</Button>
                    </Col>
                </Col>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateRoomId: (uuid) => dispatch({ type: "ROOM_ID", value: uuid }),
    }
}

export default connect('', mapDispatchToProps)(CreateRoom);