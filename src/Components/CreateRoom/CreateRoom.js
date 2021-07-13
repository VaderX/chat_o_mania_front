import './CreateRoom.css';
import React from 'react';
import axios from 'axios';
import { Row, Col, Input, Button } from 'reactstrap';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import UUID from '../UUID/UUID';

class CreateRoom extends React.Component {
    state = {
        uuid: "",
        data: {
            roomName: "",
            admin: "",
            roomId: "",
            roomSize: 5,
        }
    }

    InputHandler(field, value) {
        this.setState({
            data: { ...this.state.data, [field]: value }
        })
    }

    submitHandler(e) {
        e.preventDefault();
        const data = { ...this.state.data };
        data['roomId'] = this.state.uuid;
        axios.post('/addRoom', data)
            .then(res => {
                this.props.updateRoomId(this.state.uuid)
                this.props.updateAdmin(this.state.data.admin)
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.setState({ uuid: uuidv4() })
        if (this.props.duet)
            this.setState({ data: { ...this.state.data, ['roomSize']: 1 } })
    }

    render() {
        const groupOption = [
            { value: 5, label: "Small Gang | 5 lilliput" },
            { value: 10, label: "Medium Gang | 10 boi's" },
            { value: 20, label: "Cool Gang | 20 goi's" },
            { value: 50, label: "Biig Gang | 50 noice boi's" },
            { value: 100, label: "This is not a Gang :( , get some life boi | 100 big boi's" },
        ]
        return (
            <React.Fragment>
                <Col xs="11" md="6" className="CreateRoomDialog m-auto">
                    <form onSubmit={this.submitHandler.bind(this)}>
                        <Col className="text-start mt-2 fs-3">
                            <i className="fas fa-arrow-circle-left Cursor text-secondary" onClick={this.props.back}></i>
                        </Col>
                        <Col className="mt-4">
                            <Input placeholder="Enter your room name" onChange={(e) => this.InputHandler("roomName", e.target.value)} className="p-3 text-secondary" />
                        </Col>
                        <Col className="mt-4 mb-4">
                            <Input placeholder="Enter your name" onChange={(e) => this.InputHandler("admin", e.target.value)} className="p-3 text-secondary" />
                        </Col>
                        {this.props.duet ? null :
                            <Col className=" mb-4 m-auto">
                                <Select options={groupOption} placeholder="Select your room size" onChange={(e) => this.InputHandler("roomSize", e.value)} />
                            </Col>
                        }
                        <UUID id={this.state.uuid} />
                        <Col className="mt-5">
                            <Button className="RoomBtn btn mb-5" >Enter in Room</Button>
                        </Col>
                    </form>
                </Col>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateRoomId: (uuid) => dispatch({ type: "ROOM_ID", value: uuid }),
        updateAdmin: (admin) => dispatch({ type: "ADMIN", value: admin })
    }
}

export default connect('', mapDispatchToProps)(CreateRoom);