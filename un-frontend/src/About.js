import React from 'react';
import Footer from './Footer';
import { Image } from 'react-bootstrap';
import Renewable from './images/renewable.png';
import Earth from './images/planet-earth.png';
import Solution from './images/solution.png';
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
                                <span>We connect individuals and trusted recycling centers</span>
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

                {/* <div>
                    <h2>Why EcoTech?</h2>
                    <p>Every year, millions of tons of electronic waste end up in landfills, harming our environment. Many people want to recycle their old devices but struggle to find the right facilities. EcoTech simplifies the process by providing an intuitive way to locate nearby e-waste recycling centers, ensuring responsible disposal of electronics.</p>
                </div> */}
                <div>
                    <h2>Features</h2>
                    <ul>
                        <li><strong>Find Nearby Recycling Centers</strong>: Easily locate the nearest e-waste recycling facilities with accurate information.</li>
                        <li><strong>Verified Locations</strong>: We provide reliable and up-to-date details about approved recycling centers.</li>
                        {/* <li><strong>Eco-Friendly Resources</strong>: Learn about proper e-waste disposal, sustainability tips, and the impact of recycling.</li> */}
                        <li><strong>User-Friendly Experience</strong>: Our simple and intuitive interface makes recycling hassle-free.</li>
                    </ul>
                </div>
                <div>
                    <h2>Join the Movement</h2>
                    <p>By using EcoTech, you’re contributing to a cleaner planet and a sustainable future. Start making a difference today by finding the right place to recycle your old electronics.</p>
                </div>
                <footer>
                    <p>For more information or support, contact us at [your email or website link].</p>
                </footer>
            </section>
            <Footer />
        </div>
    );
};

export default About;