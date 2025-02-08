import './Home.css';
import { useState } from 'react';
import { Container, Tabs, Tab, Image, Row, Col } from 'react-bootstrap';
import Map from './Map';
import Footer from './Footer';
import RecyclingImage1 from './images/recycle-image1.gif'
import RecyclingImage2 from './images/recycle-image2.jpg'
import shortsConfig from "./config/shortsConfig.json";


const Home = () => {
    const shortsURLs = shortsConfig.shortsURLs;

    return (
        <div className="homepage">
            <div className='header'>
                <Row>
                    <Col xs={0} xl={4} className='header-photos'>
                        <Image src={RecyclingImage1} roundedCircle fluid className='header-img img1' />
                        <Image src={RecyclingImage2} roundedCircle fluid className='header-img img2' />
                    </Col>
                    <Col xs={12} xl={7} className='header-text'>
                        <h1>Ecotech</h1>
                        <h3>Embrace Sustainability</h3>
                    </Col>
                </Row>
            </div>

            <Container>
                <div className="shorts-container">
                    {shortsURLs.map((short, index) => (
                        <iframe 
                        key= {index}
                        className="short"
                        width="220" 
                        height="391" 
                        src={short}
                        title="YouTube video player" 
                        frameBorder="0" 
                        >
                      </iframe>
                    ))}
                </div>
            </Container>

            <div className='content-row'>
                <h2>EcoMap</h2>
                <div className="hp-map-container">
                    <Map className="hp-map" />
                </div>

            </div>
            <Footer />

        </div>
    )
}

export default Home;