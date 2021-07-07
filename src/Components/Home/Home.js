import './Home.css';
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ChatOptionParser from './Elem/ChatOptionParser';

const Home = () => {
    return (
        <React.Fragment>
            <Container fluid>
                <Row fluid className="text-white bg-primary text-center">
                    <h1 className="display-3 mt-3 mb-5">Welcome to Chat-O-Mania</h1>
                    <p className="lead mb-4">Chat with friends, without login! :)</p>
                    <p>Join or Create rooms with people you know or go Global.... Meet new people and make them friends.</p>
                </Row>
            </Container>
            <Container>
                <ChatOptionParser option="global" heading="Go Global" desc="Make new Friends, share video, images, have fun and more..." />
                <ChatOptionParser option="group" heading="Go with Team" desc="Join or Create room with friends, chat in group, share video, images, have fun and more..." />
                <ChatOptionParser option="single" heading="Go Duet" desc="Want some privacy? Join with a friend, share video, images, have fun and more..." />
            </Container>
        </React.Fragment>
    )
}
export default Home;