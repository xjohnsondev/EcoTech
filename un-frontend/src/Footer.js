import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer-div">
            <div className="footer-header">
                <p>© {new Date().getFullYear()} EcoTech. All rights reserved.</p>
            </div>
            <div className="footer-link-list">
                <Link><p className="footer-link">Geolocator</p></Link>
                <p style={{ whiteSpace: "pre" }}>  |  </p>

                <Link to="/about"><p className="footer-link">About Us</p></Link>
                <p style={{ whiteSpace: "pre" }}>  |  </p>

                <Link to="/privacy"><p className="footer-link">Privacy Policy</p></Link>
                <p style={{ whiteSpace: "pre" }}>  |  </p>

                <Link to="/terms"><p className="footer-link">Terms of Service</p></Link>
            </div>
            {/* <p>For more information or support, contact us at [email].</p> */}
        </div>
    )
}

export default Footer;