import './InsideRoom.css';
import React from "react";
import axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import UUID from "../UUID/UUID";
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

import Sidebar from './Elem/Sidebar';
import Chat from './Elem/Chat';

class InsideRoom extends React.Component {

    state = {
        data: {}
    }

    async roomLeaveHandler() {
        if (this.props.admin !== null) {
            await axios.get("/leaveAdmin/" + this.props.roomId)
                .then(res => console.log("deleted"))
            this.props.LeaveAdmin();
        }
        else {
            await axios.put("/leaveRoom/" + this.props.currentUser, { roomId: this.props.roomId })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
        this.props.LeaveRoom();
        window.location = "/";
    }

    componentDidMount() {
        axios.get("/checkRoom/" + this.props.match.params.id)
            .then(res => {
                this.setState({ data: res.data })
            })
            .catch(err => console.log(err))

        const socket = socketIOClient("http://localhost:5000");
        socket.on("checkRoomRes", res => {
            this.setState({ data: res });
        })
        socket.on("leaveRoom", res => {
            this.props.LeaveRoom();
            window.location = "/";
        })
    }

    render() {
        const name = this.props.admin !== null ? this.props.admin : this.props.currentUser;
        const showRoomMates = this.state.data.roomMates !== undefined ? this.state.data.roomMates.map((content, idx) => {
            return (
                <React.Fragment key={idx}>
                    <Col xs="1" md="2" ><i className="fas fa-globe"></i></Col>
                    <Col xs="11" md="10" className="mb-4">{content}</Col>
                </React.Fragment>
            )
        }) : null
        return (
            <React.Fragment>
                <Container fluid>
                    <Row>
                        <Col>
                            <Row className="text-center mt-3 mb-3 w-100">
                                <Col className="fs-2 text-secondary">
                                    {this.state.data.roomName}
                                </Col>
                                <Col md="6">
                                    <UUID id={this.state.data.roomId} />
                                </Col>
                                <Col md="">
                                    <Button className="RoomBtn" onClick={this.roomLeaveHandler.bind(this)}>Leave</Button>
                                </Col>
                            </Row>
                            <Row className="RoomTopInfo">
                                <Sidebar />
                                <Chat user={name} roomId={this.props.roomId} />
                            </Row>
                        </Col>
                        <Col md="2" className="roomMates-InsideRoom bg-primary text-white">
                            <Row className="mt-3">
                                <Col className="text-center fs-4">Room Mates :)</Col>
                            </Row>
                            {/* <hr className="bg-primary"/> */}
                            <Row className="mt-5">
                            <Col xs="1" md="2"><i className="fas fa-globe"></i></Col>
                            <Col xs="11" md="10" className="mb-4">{this.state.data.admin + " (Admin)"}</Col>
                            {showRoomMates}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        roomId: state.roomId,
        currentUser: state.currentUser,
        admin: state.admin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        LeaveRoom: () => dispatch({ type: "DEL_ROOM" }),
        LeaveAdmin: () => dispatch({ type: "DEL_ADMIN" })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InsideRoom);