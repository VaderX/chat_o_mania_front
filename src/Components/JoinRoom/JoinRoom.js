import React from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

class JoinRoom extends React.Component {

    state = {
        data: {
            roomId: '',
            name: ''
        }
    }

    handleEvent(field, value) {
        this.setState({
            data: { ...this.state.data, [field]: value }
        })
    }

    render() {
        return (
            <React.Fragment>
                <Col xs="11" md="6" className="CreateRoomDialog m-auto">
                    <Col className="text-start mt-2 fs-3">
                        <i className="fas fa-arrow-circle-left Cursor" onClick={this.props.back}></i>
                    </Col>
                    <Col className="mt-4">
                        <Input placeholder="Enter room ID" onChange={(e) => this.handleEvent("roomId", e.target.value)} className="p-3" />
                    </Col>
                    <Col className="mt-4">
                        <Input placeholder="Enter your name" onChange={(e) => this.handleEvent("name", e.target.value)} className="p-3" />
                    </Col>
                    <Col className="mt-5">
                        <Button className="RoomBtn btn mb-5" onClick={() => this.props.updateRoomId(this.state.data.roomId)}>Enter in Room</Button>
                    </Col>
                </Col>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRoomId: (uuid) => dispatch({ type: "ROOM_ID", value: uuid }),
    }
}

export default connect('', mapDispatchToProps)(JoinRoom);