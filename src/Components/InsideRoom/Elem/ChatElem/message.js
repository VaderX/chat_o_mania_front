import React from 'react';
import { Col } from 'reactstrap';

const Message = (props) => {
    const align = props.type === "sender" ? "fa-pull-right" : "fa-pull-left";
    const msgAlign = props.type === "sender" ? "text-start" : "text-end";
    const classStyle = props.type === "sender" ? "sender" : "reciever";
    const time = new Date(props.time).toLocaleTimeString();
    const len = props.data.length > 75 ? "w-50" : "";
    return (
        <React.Fragment>
            <Col md="12" className="mb-2" key={props.id} style={{ height: "fit-content" }}>

                {props.contentType === "text" ?
                    <Col className={len + " " + align}>
                        <div className={"chatTextBody p-3 " + classStyle}>{props.data}</div>
                        <div className={"msgDetails " + msgAlign}>{props.name + " " + time}</div>
                    </Col>
                    : props.contentType === "yt" ?
                        <Col>
                            <iframe className={"chatTextBody p-3 " + classStyle} id="ytplayer" type="text/html" style={{ width: "100%", height: "60vh" }}
                                src={"https://www.youtube.com/embed/" + props.data}
                                frameBorder="0">
                            </iframe>
                            <div className={"msgDetails " + msgAlign}>{props.name + " " + time}</div>
                        </Col>
                        : props.contentType === "gif" || props.contentType === "sticker" || props.contentType === "img" ?
                            <Col className={" " + align}>
                                {props.contentType === "img" ?
                                    <img width="400px" height="400px" style={{ objectFit: "cover" }} className={"chatTextBody p-3 " + classStyle} src={props.data} />
                                    : <img className={"chatTextBody p-3 " + classStyle} src={props.data} />
                                }
                                <div className={"msgDetails " + msgAlign}>{props.name + " " + time}</div>
                            </Col>
                            : props.contentType === "video" ?
                                <Col className={" " + align}>
                                    <video width="400px" height="400px" className={"chatTextBody p-3 " + classStyle} controls>
                                        <source src={props.data} />
                                    </video>
                                    <div className={"msgDetails " + msgAlign}>{props.name + " " + time}</div>
                                </Col>
                                : null
                }
            </Col>
        </React.Fragment>
    )
}

export default Message;