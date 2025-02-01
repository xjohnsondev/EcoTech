import './Home.css';
import { useState } from 'react';
import { Tabs, Tab, Image, Row, Col } from 'react-bootstrap';
import Map from './Map';
import Footer from './Footer';
import RecyclingImage1 from './images/recycle-image1.gif'
import RecyclingImage2 from './images/recycle-image2.jpg'

const Home = () => {
    const [activeKey, setActiveKey] = useState("about");

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
            <div className='content-row'>
                <div className="hp-map-container">
                    <Map className="hp-map" />
                </div>
                <div className='hp-info'>
                    <Tabs
                        activeKey={activeKey}
                        onSelect={(k) => setActiveKey(k)} // Update active tab
                        id="tabs"
                    >
                        <Tab eventKey="about" title="About" className='hp-tab'>
                            <div className='tab-content'>
                                <h2>What Is E-Waste?</h2>
                                <p>Electronic Waste, Or E-Waste, <br /> Refers To Discarded Electronic Devices And Components.</p>
                                <ul className="recycle-list">
                                    <li>Examples include smartphones, computers, TVs, and batteries</li>
                                    <li>E-waste often contains hazardous materials like lead and mercury</li>
                                    <li>Recycling e-waste reduces environmental pollution</li>
                                    <li>Proper disposal helps recover valuable resources such as metals and plastics</li>
                                    <li>Awareness of e-waste recycling promotes sustainable practices</li>
                                </ul>
                            </div>
                        </Tab>
                        <Tab eventKey="why" title="Why Recycle" className='hp-tab'>
                            <div className='tab-content'>
                                <h2>Why Should You Recycle E-Waste?</h2>
                                <p>Protect The Planet, Conserve Resources, And Build A Sustainable Future.</p>
                                <ul className="recycle-list">
                                    <li>Environmental Protection</li>
                                    <li>Resource Conservation</li>
                                    <li>Energy Savings</li>
                                    <li>Reduction of Greenhouse Gases</li>
                                    <li>Reduction in Landfill Waste</li>
                                    <li>Job Creation</li>
                                    <li>Data Security</li>
                                </ul>
                            </div>
                        </Tab>
                        <Tab eventKey="future" title="Future Of Recycling" className='hp-tab'>
                            <div className='tab-content'>
                                <h2>Shaping A Sustainable Future</h2>
                                <p>How Innovations In Recycling Drive A Greener Tomorrow</p>
                                <ul className="recycle-list">
                                    <li>Growing Innovation In Recycling Technology</li>
                                    <li>Shift To A Circular Economy</li>
                                    <li>Government Initiative And Global Policies</li>
                                    <li>Rise Of Urban Mining</li>
                                    <li>Recycled Electronics In Manufacturing</li>
                                    <li>Consumer Awareness And Responsible Disposal</li>
                                </ul>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default Home;