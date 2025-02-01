import React from 'react';
import Footer from './Footer';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About EcoTech</h1>
      <section>
        <h2>Our Mission</h2>
        <p>EcoTech is dedicated to making e-waste disposal easy, efficient, and environmentally responsible. Our platform connects users with verified e-waste recycling centers, helping reduce electronic waste and promote sustainability.</p>
      </section>
      <section>
        <h2>Why EcoTech?</h2>
        <p>Every year, millions of tons of electronic waste end up in landfills, harming our environment. Many people want to recycle their old devices but struggle to find the right facilities. EcoTech simplifies the process by providing an intuitive way to locate nearby e-waste recycling centers, ensuring responsible disposal of electronics.</p>
      </section>
      <section>
        <h2>Features</h2>
        <ul>
          <li><strong>Find Nearby Recycling Centers</strong>: Easily locate the nearest e-waste recycling facilities with accurate information.</li>
          <li><strong>Verified Locations</strong>: We provide reliable and up-to-date details about approved recycling centers.</li>
          {/* <li><strong>Eco-Friendly Resources</strong>: Learn about proper e-waste disposal, sustainability tips, and the impact of recycling.</li> */}
          <li><strong>User-Friendly Experience</strong>: Our simple and intuitive interface makes recycling hassle-free.</li>
        </ul>
      </section>
      <section>
        <h2>Join the Movement</h2>
        <p>By using EcoTech, you’re contributing to a cleaner planet and a sustainable future. Start making a difference today by finding the right place to recycle your old electronics.</p>
      </section>
      <footer>
        <p>For more information or support, contact us at [your email or website link].</p>
      </footer>
      <Footer />
    </div>
  );
};

export default About;