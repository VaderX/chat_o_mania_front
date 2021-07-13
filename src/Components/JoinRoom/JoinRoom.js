import './JoinRoom.css';
import React from 'react';
import axios from 'axios';
import { Row, Col, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

class JoinRoom extends React.Component {

    state = {
        resMsg: "",
        userMsg: "",
        data: {
            roomId: this.props.loc,
            name: this.props.currentUser
        }
    }

    handleEvent(field, value) {
        this.setState({
            data: { ...this.state.data, [field]: value }
        }, () => {
            if (field === 'roomId')
                this.roomChecker()
            else if (field === 'name')
                this.userChecker()
        })
    }

    roomChecker() {
        axios.get("/checkRoom/" + this.state.data.roomId)
            .then(res => {
                this.setState({ resMsg: res.data.roomName })
            })
            .catch(err => console.log(err))
    }

    userChecker() {
        axios.get("/checkUser/" + this.state.data.roomId + "/" + this.state.data.name)
            .then(res => {
                this.setState({ userMsg: res.data })
            })
            .catch(err => console.log(err))
    }

    submitHandler(e) {
        e.preventDefault();

        axios.put('/joinRoom', this.state.data)
            .then(res => {
                if (!res.data.size) {
                    this.setState({ resMsg: "Cannot join room, max limit reached " })
                }
                if (res.data.status) {
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
                        {this.props.loc === "global chat" ? null :
                            <Col className="text-start mt-2 fs-3">
                                <i className="fas fa-arrow-circle-left Cursor text-secondary" onClick={this.props.back}></i>
                            </Col>
                        }
                        <Col className="mt-4">
                            <Input
                                placeholder="Enter room ID"
                                onChange={(e) => this.handleEvent("roomId", e.target.value)}
                                className="p-3 text-secondary"
                                disabled={this.props.loc === "global chat"}
                                value={this.state.data.roomId}
                            />
                        </Col>
                        <Col className="mt-4">
                            <Row>
                                <Col>
                                    <Input
                                        placeholder="Enter your name"
                                        disabled={this.state.resMsg !== "No room found" ? false : true}
                                        defaultValue={this.props.currentUser}
                                        onChange={(e) => this.handleEvent("name", e.target.value)}
                                        className="p-3 text-secondary"
                                    />
                                </Col>
                                {this.state.userMsg === "" ? null :
                                    <Col xs="2" md="2" className="m-auto fs-1">
                                        {this.state.userMsg ?
                                            <i className="fas fa-check-circle tick"></i> :
                                            <i className="fas fa-times-circle cross"></i>
                                        }
                                    </Col>}
                            </Row>
                        </Col>
                        <Col className='mt-5 text-secondary'>
                            {this.state.resMsg}
                        </Col>
                        <Col className="mt-5">
                            <Button
                                className="RoomBtn btn mb-5"
                                disabled={this.state.userMsg ? false : true}
                            >
                                Enter in Room
                            </Button>
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