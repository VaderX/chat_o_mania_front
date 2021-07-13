import './elem.css';
import React from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { Row, Col, Input } from 'reactstrap';
import Message from './ChatElem/message';

class Chat extends React.Component {

    state = {
        type: "text",
        data: "",
        name: this.props.user,
        time: "",
        roomId: this.props.roomId,
        messages: []
    }

    chatPosition = React.createRef(null);
    inputFocus = React.createRef(null);

    msgInputHandler = (e) => {
        this.setState({ data: e.target.value })
    }

    submitHandler = (e) => {
        if (e.key === "Enter")
            this.sendMsgHandler();
    }
    sendMsgHandler = async () => {
        const socket = socketIOClient("http://localhost:5000");
        const time = new Date();
        if (this.state.data !== "") {
            await this.setState({ time: time }, () => {
                socket.emit("sendMsg", this.state)
            })
            this.setState({ data: "" })
        }
    }

    changeScrollPosition = () => {
        this.chatPosition.current.scrollIntoView({ behavior: "smooth" });
        this.inputFocus.current.focus();
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
        this.changeScrollPosition();
    }

    componentDidUpdate() {
        this.changeScrollPosition();
    }

    render() {
        const showMessages = this.state.messages !== undefined ? this.state.messages.map((content, idx) => {
            const type = this.props.user === content.name ? "sender" : "reciever";
            return (
                <Message key={idx} type={type} contentType={content.type} name={content.name} data={content.data} time={content.time} />
            )
        }) : null
        return (
            <React.Fragment>
                <Col md="" className="bg-secondary">
                    <Row className="mt-4">
                        <Row className="chatArea chatArea--simple">
                            {showMessages}
                            <div ref={this.chatPosition}></div>
                        </Row>
                        <Col xs="10" md="11" className="mb-3">
                            <Input ref={this.inputFocus} className="p-3 text-secondary" value={this.state.data} onKeyPress={(e) => this.submitHandler(e)} onChange={(e) => this.msgInputHandler(e)} placeholder="Enter text" />
                        </Col>
                        <Col className="fs-3 m-auto mb-3">
                            <i className="fas fa-paper-plane Cursor text-secondary" onClick={this.sendMsgHandler.bind(this)}></i>
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>
        )
    }
}

export default Chat;