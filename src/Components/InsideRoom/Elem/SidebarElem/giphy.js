import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, CardBody, Button, Input } from 'reactstrap';

const Giphy = (props) => {
    const api_key = "UKocqW7n72gSKnQLGVGJfBMbW7fwYDEk"
    const trendingEndpoint = "https://api.giphy.com/v1/" + props.type + "/trending?api_key=";
    const searchEndpoint = "https://api.giphy.com/v1/" + props.type + "/search?api_key=";
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const searchHandler = (e) => {
        e.preventDefault();
        axios.get(searchEndpoint + api_key + "&limit=16&q=" + search).then(res => {
            setData(res.data.data)
        })
    }


    useEffect(() => {
        axios.get(trendingEndpoint + api_key + "&limit=16").then(res => {
            setData(res.data.data)
        })
    }, [])

    const showData = data.map((content, idx) => {
        return (
            <Col md="6" className="mb-4 Cursor" onClick={() => props.data(content.images.fixed_width.url)}>
                <img width="100%" height="135px" src={content.images.downsized.url} />
            </Col>
        )
    })

    return (
        <React.Fragment>
            <Col md="4" className="SidebarTools mt-2">
                <Card>
                    <CardBody>
                        <form onSubmit={searchHandler}>
                            <Row className="mt-3 mb-3">
                                <Col xs="5" md="6">
                                    <Input className="p-3" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
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
                            <Row>
                                {showData}
                            </Row>
                            {/* <ListGroup>
                                
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
                            </ListGroup> */}
                        </Col>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    )
}

export default Giphy;