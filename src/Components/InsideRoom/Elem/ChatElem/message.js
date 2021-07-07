import React from 'react';
import { Col } from 'reactstrap';

const Message = (props) => {
    const align = props.type === "sender" ? "fa-pull-right" : "fa-pull-left";
    const msgAlign = props.type === "sender" ? "text-start" : "text-end";
    const classStyle = props.type === "sender" ? "sender" : "reciever";
    const time = new Date(props.time).toLocaleTimeString();
    const len = props.text.length > 75 ? "w-50" : "";
    return (
        <React.Fragment>
            <Col md="12" className="mb-2" key={props.id} style={{ height: "fit-content" }}>
                <Col className={len + " " + align}>
                    <div className={"chatTextBody p-3 " + classStyle}>{props.text}</div>
                    <div className={"msgDetails " + msgAlign}>{props.name + " " + time}</div>
                </Col>
                {/* <Col>{props.name}</Col> */}
            </Col>
        </React.Fragment>
    )
}

export default Message;