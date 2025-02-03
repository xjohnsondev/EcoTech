import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer-div">
            {/* Spacer div with background color */}
            {/* <div style={{ height: '100px' }}></div> */}
            <div className="footer-notes">
            <p>© 2025 EcoTech</p>
            <p> All rights reserved</p>                
            {/* <p>For more information or support, contact us at [email].</p> */}
            {/* <Link><p className="footer-link">Geolocation</p></Link> */}
            </div>
        </div>
    )
}

export default Footer;