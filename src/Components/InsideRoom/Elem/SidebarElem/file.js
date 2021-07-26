import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Input, Label, Button } from 'reactstrap';

const ChatFile = (props) => {

    const [previewData, setPreviewData] = useState(false);
    const fileHandler = (e) => {
        if (e.target.files[0] !== undefined) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewData(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <React.Fragment>
            <Col md="4" className="SidebarTools mt-2">
                <Card>
                    <CardBody>
                        <Row className="mt-3 mb-3 m-auto">
                            <Col xs="8" md="8" className="m-auto">
                                <Label className="text-center RoomBtn p-3 rounded" htmlFor="chatFile">
                                    Click here to upload file
                                </Label>
                                <Input onChange={(e) => fileHandler(e)} type="file" id="chatFile" hidden />
                            </Col>
                            <Col className="m-auto fs-3 text-end">
                                <i className="fas fa-times-circle Cursor" onClick={props.close}></i>
                            </Col>
                        </Row>
                        <Col className="ytArea chatArea--simple text-center">
                            {previewData ?
                                props.type === "img" ?
                                    <React.Fragment>
                                        <img width="100%" height="80%" style={{ objectFit: "cover" }} src={previewData} />
                                        <Button onClick={() => props.data(previewData)} className="RoomBtn mt-2">Post</Button>
                                    </React.Fragment>
                                    : <React.Fragment>
                                        <video width="100%" height="80%" controls>
                                            <source src={previewData} type="video/mp4" />
                                        </video>
                                        <Button onClick={() => props.data(previewData)} className="RoomBtn mt-2">Post</Button>
                                    </React.Fragment>
                                :
                                <Col className="fs-1 fw-bold text-secondary">
                                    upload to preview file
                                </Col>
                            }
                        </Col>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    )
}

export default ChatFile;