import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NotFound.css';
import Footer from './Footer';

const NotFoundPage = () => {
    return (
        <Container fluid className="nf-container d-flex flex-column justify-content-center align-items-center text-center vh-100">
            <Row>
                <Col>
                    <h1 className="nf-title">404: This Page Went Off to Be Recycled...</h1>
                    <p className="nf-message">
                        Looks like the page you’re searching for has been <span className="nf-highlight">disposed of</span> or never quite made it to the right <span className="nf-highlight">bin</span>.<br /> But just like old gadgets, not all is lost!
                    </p>
                </Col>
            </Row>
            <Row className="nf-actions mb-3">
                <Col className='buttons my-2'>
                    <Button variant="success" as={Link} to="/" className="mx-2">
                        🏡 Take me home
                    </Button>
                    <Button variant="danger" as={Link} to="/" className="mx-2">
                        🆘 Get help
                    </Button>
                    <Button variant="info" as={Link} to="/about" className="mx-2">
                        ♻️ Learn about us
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="nf-note">
                        Remember, every page has potential, even this broken one. Just like your old electronics, it’s all about finding the right place to start again!
                    </p>
                </Col>
            </Row>
                <Footer />
        </Container>
    );
};

export default NotFoundPage;