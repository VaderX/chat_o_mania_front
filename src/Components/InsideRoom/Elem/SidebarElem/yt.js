import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, CardBody, Input, Button, ListGroup, ListGroupItem } from 'reactstrap';
const Yt = (props) => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");


    const nextPage = (e) => {
        SearchHandler(e, next);
    }
    const prevPage = (e) => {
        SearchHandler(e, prev);
    }

    const SearchHandler = async (e, pageId = "") => {
        e.preventDefault();
        const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + search + "&type=video&key=AIzaSyB7f_QWPVzv9LSujA74moghreXl7VM7Sqg&pageToken=" + pageId
        await axios.get(url).then(res => {
            setData(res.data.items)
            setNext(res.data.nextPageToken)
            setPrev(res.data.prevPageToken)

        })
    }

    const searchResult = data.map((content, idx) => {
        const imgData = content.snippet.thumbnails.default
        return (
            <ListGroupItem key={idx}>
                <Row className="Cursor" onClick={() => props.data(content.id.videoId)}>
                    <Col md="4">
                        <img src={imgData.url} width={imgData.width} height={imgData.height} />
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                {content.snippet.title}
                            </Col>
                            <Col md="12">
                                {content.snippet.channelTitle}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroupItem>
        )
    })

    return (
        <React.Fragment>
            <Col md="4" className="SidebarTools mt-2">
                <Card>
                    <CardBody>
                        <form onSubmit={SearchHandler}>
                            <Row className="mt-3 mb-3">
                                <Col xs="5" md="6">
                                    <Input className="p-3" placeholder="Enter name" onChange={(e) => setSearch(e.target.value)} />
                                </Col>
                                <Col xs="5" md="4">
                                    <Button className="RoomBtn">Search</Button>
                                </Col>
                                <Col className="m-auto fs-3">
                                    <i className="fas fa-times-circle Cursor" onClick={props.close}></i>
                                </Col>
                            </Row>
                        </form>
                        <Col className="ytArea chatArea--simple">
                            {/* <div ref={ytFeed}></div> */}
                            <ListGroup>
                                {searchResult}
                                {((prev === "" || prev === undefined) && (next === "" || next === undefined)) ? null :
                                    <ListGroupItem className="text-center Cursor">
                                        {prev === "" || prev === undefined ?
                                            < Col onClick={(e) => nextPage(e)}>Next Page</Col>
                                            : <Row>
                                                <Col onClick={(e) => prevPage(e)} xs="6" md="6">Prev Page</Col>
                                                < Col onClick={(e) => nextPage(e)} xs="6" md="6">Next Page</Col>
                                            </Row>
                                        }
                                    </ListGroupItem>
                                }
                            </ListGroup>
                        </Col>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment >
    )
}

export default Yt;