import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';
import { Row, Col, Input, Card, CardBody, Button } from 'reactstrap';
import Yt from './SidebarElem/yt';
import Giphy from './SidebarElem/giphy';

const Sidebar = (props) => {
    const socket = socketIOClient("http://localhost:5000");

    const toolsHandler = (toolsData) => {
        const time = new Date();
        const data = {
            type: Type,
            data: toolsData,
            name: props.user,
            time: time,
            roomId: props.roomId
        }
        socket.emit("sendMsg", data)
    }
    const [Type, setType] = useState(null)
    const [contentData, setContentData] = useState(null);
    return (
        <React.Fragment>
            <Col md="1" className="SidebarBody bg-primary text-white text-center fs-1">
                <Row>
                    <Col className="mt-3">
                        <i className="fas fa-camera-retro Cursor" onClick={() => setType("img")}></i>
                    </Col>
                    <Col className="mt-3">
                        <i className="fas fa-video Cursor" onClick={() => setType("video")}></i>
                    </Col>
                    <Col className="mt-3">
                        <i className="fas fa-microphone-alt Cursor" onClick={() => setType("audio")}></i>
                    </Col>
                    <Col xs md="12" className="mt-3">
                        <i className="fas fa-file-image Cursor" onClick={() => setType("gif")}></i>
                    </Col>
                    <Col xs md="12" className="mt-3">
                        <i className="fas fa-sticky-note Cursor" onClick={() => setType("sticker")}></i>
                    </Col>
                    <Col className="mt-3">
                        <i className="fab fa-youtube Cursor" onClick={() => setType("yt")}></i>
                    </Col>
                </Row>
            </Col>
            {Type === "yt" ?
                <Yt close={() => setType(null)} data={(videoId) => toolsHandler(videoId)} /> : null}
            {Type === "gif" ?
                <Giphy type="gifs" close={() => setType(null)} data={(gifSrc) => toolsHandler(gifSrc)} /> : null}
            {Type === "sticker" ?
                <Giphy type="stickers" close={() => setType(null)} data={(gifSrc) => toolsHandler(gifSrc)} /> : null}
        </React.Fragment>
    )
}

export default Sidebar;