import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer-div">
            {/* Spacer div with background color */}
            {/* <div style={{ height: '100px' }}></div> */}
            <div className="footer-notes">
                <p>Copyright © 2025, Ecotech</p>
                {/* <Link><p className="footer-link">Geolocation</p></Link> */}
            </div>
        </div>
    )
}

export default Footer;