import React from 'react'
import './Privacy.css';


const Privacy = () => {
    return (
        <div className="privacy-container">
            <h1>Privacy Policy</h1>
            <p><strong>Effective Date:</strong> March 15, 2025</p>
            <hr style={{ paddingBottom: '30px' }}></hr>

            <p style={{ padding: '0 150px 30px 150px' }}>
                <b>EcoTech</b> ("we," "our," or "us") is committed to protecting your privacy.
                This Privacy Policy outlines how we collect, use, and safeguard your
                information when you use our platform.
            </p>

            <div className='privacy-content'>
                <div>
                    <h4>Information We Collect</h4>
                    <p><strong>Business Information:</strong> When a recycling center is registered, we collect the center's name, address, and contact details.</p>
                    <p><strong>Location Data:</strong> If you enable location services, we may collect your approximate location to help you find nearby e-waste recycling centers.</p>
                    <p><strong>Usage Data:</strong> We may collect information about how you interact with our platform, such as visited pages and search history.</p>
                </div>
                <div>
                    <h4>How We Use Your Information</h4>
                    <p>Provide and improve our services.</p>
                    <p>Connect users with certified e-waste recycling centers.</p>
                    <p>Send important notifications related to your account.</p>
                    <p>Ensure compliance with legal obligations.</p>
                </div>
                <div>
                    <h4>How We Share Your Information</h4>
                    <p>We do <strong>not</strong> sell your location or usage data. However, we may share data with:</p>
                    <ul className='privacy-list'>
                        <li>Certified e-waste recycling centers to facilitate connections</li>
                        <li>Service providers that help us operate our platform</li>
                        <li>Authorities if required by law</li>
                    </ul>
                </div>
                <div>

                    <h4>Data Security</h4>
                    <p>We take reasonable steps to protect your usage data from unauthorized access, alteration, or disclosure.</p>
                </div>
                <div>

                    <h4>Your Choices</h4>
                    <ul className='privacy-list'>
                        <li>You can disable location services in your device settings.</li>
                    </ul>
                </div>
                <div>
                    <h4>Changes to This Policy</h4>
                    <p>We may update this Privacy Policy. Any changes will be posted on this page.</p>
                </div>
                <div>

                    <h4>Contact Us</h4>
                    <p>If you have any questions, please contact us at <strong>[Contact Email HERE]</strong>.</p>
                </div>
            </div>
        </div>
    );
};

export default Privacy