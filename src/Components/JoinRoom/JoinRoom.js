import React from 'react';
import axios from 'axios';
import { Col, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

class JoinRoom extends React.Component {

    state = {
        resMsg: "",
        data: {
            roomId: '',
            name: this.props.currentUser
        }
    }

    handleEvent(field, value) {
        this.setState({
            data: { ...this.state.data, [field]: value }
        }, () => {
            if (field === 'roomId')
                this.roomChecker()
        })
    }

    roomChecker() {
        axios.get("/checkRoom/" + this.state.data.roomId)
            .then(res => {
                this.setState({ resMsg: res.data.roomName })
            })
            .catch(err => console.log(err))
    }

    submitHandler(e) {
        e.preventDefault();

        axios.put('/joinRoom', this.state.data)
            .then(res => {
                if (res.data) {
                    this.props.updateRoomId(this.state.data.roomId)
                    this.props.updateCurrentUser(this.state.data.name)
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <React.Fragment>
                <Col xs="11" md="6" className="CreateRoomDialog m-auto">
                    <form onSubmit={this.submitHandler.bind(this)}>
                        <Col className="text-start mt-2 fs-3">
                            <i className="fas fa-arrow-circle-left Cursor" onClick={this.props.back}></i>
                        </Col>
                        <Col className="mt-4">
                            <Input placeholder="Enter room ID" onChange={(e) => this.handleEvent("roomId", e.target.value)} className="p-3" />
                        </Col>
                        <Col className="mt-4">
                            <Input placeholder="Enter your name" defaultValue={this.props.currentUser} onChange={(e) => this.handleEvent("name", e.target.value)} className="p-3" />
                        </Col>
                        <Col className='mt-5'>
                            {this.state.resMsg}
                        </Col>
                        <Col className="mt-5">
                            <Button className="RoomBtn btn mb-5">Enter in Room</Button>
                        </Col>
                    </form>
                </Col>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRoomId: (uuid) => dispatch({ type: "ROOM_ID", value: uuid }),
        updateCurrentUser: (name) => dispatch({ type: "USER", value: name })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);