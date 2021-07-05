import './elem.css';
import React, { createRef } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { Row, Col, Input } from 'reactstrap';
import Message from './ChatElem/message';

class Chat extends React.Component {

    state = {
        text: "",
        name: this.props.user,
        time: "",
        roomId: this.props.roomId,
        messages: []
    }

    ChatHeight = React.createRef()

    msgInputHandler = (value) => {
        this.setState({ text: value })
    }

    sendMsgHandler = () => {
        const socket = socketIOClient("http://localhost:5000");
        const time = new Date();
        this.setState({ time: time }, () => {
            socket.emit("sendMsg", this.state)
        })
    }

    async componentDidMount() {
        // initialiting messages....
        axios.get("/checkRoom/" + this.props.roomId)
            .then(res => {
                this.setState({ messages: res.data.chat })
            })
            .catch(err => console.log(err))
        // fetching realtime msg
        const socket = socketIOClient("http://localhost:5000");
        await socket.on("receiveMsg", res => {
            this.setState({ messages: res })
        })
    }

    render() {
        console.log("this is height og element", this.ChatHeight)
        const showMessages = this.state.messages !== undefined ? this.state.messages.map((content, idx) => {
            const type = this.props.user === content.name ? "sender" : "reciever";
            return (
                <Message key={idx} type={type} name={content.name} text={content.text} />
            )
        }) : null
        return (
            <React.Fragment>
                <Col md="">
                    <Row className="mt-4">
                        <Row className="chatArea" style={{height: "100%"}} ref={this.ChatHeight}>
                            {showMessages}
                        </Row>
                        <Col xs="10" md="11">
                            <Input className="p-3" onChange={(e) => this.msgInputHandler(e.target.value)} placeholder="Enter text" />
                        </Col>
                        <Col className="fs-3 m-auto">
                            <i className="fas fa-paper-plane Cursor" onClick={this.sendMsgHandler.bind(this)}></i>
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>
        )
    }
}

export default Chat;