import React from "react";
import './Terms.css';

const Terms = () => {
    return (
        <div className="terms-container">
            <h1 style={{ fontWeight: "600" }}><span style={{ fontWeight: "200" }}>EcoTech</span> Terms of Service</h1>
            <hr style={{ paddingBottom: '30px' }}></hr>

            <h4>Use of Services</h4>
            <p>You agree that by using our Services, you have accepted these Terms and understand your obligations herein and under the Privacy Policies.
                You further agree that you are authorized to use our Services for your sole benefit.
                We reserve the right, at our sole discretion, to terminate any usage or activities where we believe that the activities violate these Terms, Privacy Policies, or any laws.
                Notification of termination may be given at our discretion.
            </p>

            <h4>Restrictions</h4>
            <p>
                You agree that your use of our Services will not involve any activities that are harmful, fraudulent, misleading, threatening, harassing, defamatory, or obscene.
                You are strictly prohibited from:
            </p>
            <ul className="restrictions-list">
                <li>Gaining unauthorized access to any accounts, passwords, or security credentials of other users.</li>
                <li>Running automated scripts, bots, spam, or other processes that disrupt the Service’s functionality.</li>
                <li>Engaging in any activity that places an undue burden on our infrastructure.</li>
                <li>Attempting to reverse engineer, decompile, or otherwise tamper with EcoTech’s software or systems.</li>
                <li>Violating any laws, regulations, or engaging in activities that directly compete with EcoTech.</li>
            </ul>

            <h4>Content</h4>
            <p style={{marginBottom: '-5px'}}>
                "Content" includes all text, images, software, data, and materials made available through EcoTech. 
                Content on our platform may be owned by us (“EcoTech Content”), contributed by the community, provided by users (“User Submitted Content”), or sourced from third party platforms. 
                You agree to comply with all copyright and intellectual property notices when accessing any Content.
            </p>
            <p style={{marginBottom: '-5px'}}>
                Unless explicitly stated otherwise, EcoTech retains ownership of all Content provided through the Services (excluding Content sourced through third party platforms). All EcoTech Content is protected by applicable copyright and intellectual property laws.
            </p>
            <p>
                By submitting any User Submitted Content to EcoTech, you grant us a worldwide, non-exclusive, royalty-free, perpetual, and irrevocable license to use, reproduce, modify, distribute, display, and otherwise utilize the content in connection with our Services. This right persists even if you remove your content.
            </p>

 {/* <h4>User Accounts</h4>
            <p>To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account information.</p> */}
           
            {/* <h4>Privacy Policy</h4>
            <p>Your use of EcoTech is also governed by our Privacy Policy, which outlines how we collect and handle your data.</p> */}

            <h4>Limitation of Liability</h4>
            <p>EcoTech is provided "as is" without any warranties. We are not liable for any damages resulting from your use of our services.</p>

            <h4>Termination</h4>
            <p>We reserve the right to suspend or terminate your access to our services if you violate these terms.</p>

            <h4>Changes to Terms</h4>
            <p>We may update these Terms of Service from time to time. Continued use of our services constitutes your acceptance of the revised terms.</p>

            <h4>Contact Information</h4>
            <p>If you have any questions about these Terms, please contact us at <strong>||| Enter email here |||</strong>.</p>
       
            

        </div>
    );
};

export default Terms;
