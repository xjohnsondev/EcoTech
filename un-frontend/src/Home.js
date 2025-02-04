import './Home.css';
import { useState } from 'react';
import { Container, Tabs, Tab, Image, Row, Col } from 'react-bootstrap';
import Map from './Map';
import Footer from './Footer';
import RecyclingImage1 from './images/recycle-image1.gif'
import RecyclingImage2 from './images/recycle-image2.jpg'

const Home = () => {
    const [activeKey, setActiveKey] = useState("about");
    const items = Array.from({ length: 10 }, (_, i) => i + 1);
    const shortsURLs = [
        "https://youtube.com/embed/30GLNyJRInk?si=9BKwKT_UjJk9fThX",
        "https://youtube.com/embed/BeBFDgxK9L4?si=Q1OT8aA2FAlZbqv1",
        "https://youtube.com/embed/knb83JLROGg?si=2fXcYilKgbKpr9fY",
        "https://youtube.com/embed/jCBVUK-StYY?si=BTyEaOgRsrH-UhMO",
        "https://youtube.com/embed/w4Sl6ngKY6o?si=CiUmJTG8tOOR76qA",
        "https://youtube.com/embed/Oa4mmM1hXIc?si=_0H0DLDUG_uxp4qU",
        "https://youtube.com/embed/s5ykSDbfECI?si=AmAebqh2L5s4338z",

    ];
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
                <div
                    style={{
                        display: "flex",
                        overflowX: "auto",
                        gap: "50px",
                        padding: "25px 5px",
                        whiteSpace: "nowrap",
                        scrollbarWidth: "thin",
                        scrollBehavior: "smooth",
                    }}
                >
                    {shortsURLs.map((short) => (
                        <iframe 
                        className="short"
                        width="176" 
                        height="315" 
                        src={short}
                        title="YouTube video player" 
                        frameborder="0" 
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