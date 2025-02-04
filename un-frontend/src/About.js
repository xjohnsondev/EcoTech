import React from 'react';
import Footer from './Footer';
import { Image } from 'react-bootstrap';
import Renewable from './images/renewable.png';
import Earth from './images/planet-earth.png';
import Solution from './images/solution.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle, faHandshake, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <section className='about-header'>
                <div className='about-title-div'>
                    <h1>About <br /> EcoTech</h1>
                    <p>Every year, millions of tons of e-waste are discarded improperly, leading to environmental pollution and resource loss. EcoTech is committed to tackling this issue by making recycling easy, efficient, and accessible for everyone.</p>
                </div>
                <div className='about-whatwedo-div'>
                    <h2>Our Mission</h2>
                    <div className='what-we-do'>

                        <div>
                            <Image src={Renewable} className='about-header-img' />
                            <p>
                                Simplify E-Waste Recycling <br />
                                <span>We help you find trusted recycling centers</span>
                            </p>
                        </div>
                        <div>
                            <Image src={Earth} className='about-header-img' />
                            <p>
                                Minimize Environmental Impact <br />
                                <span>We promote responsible recycling</span>
                            </p>
                        </div>
                        <div>
                            <Image src={Solution} className='about-header-img' />
                            <p>
                                Driving Sustainable Innovation<br />
                                <span>We advocate for a circular economy</span>
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            <section className='about-content'>
                    <ul className='features-list'>
                        <li>
                            <FontAwesomeIcon icon={faRecycle} size="4x" color="#3F72AF" />
                            <strong>Find Nearby <br/> Recycling Centers</strong>
                        </li>
                        <li>
                             <FontAwesomeIcon icon={faCircleCheck} size="4x" color="#3F72AF" />
                            <strong>Verified <br/> Locations</strong>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faHandshake} size="4x" color="#3F72AF" />
                            <strong>User-Friendly <br/> Experience</strong>
                        </li>
                    </ul>
            </section>
            <Footer />
        </div>
    );
};

export default About;