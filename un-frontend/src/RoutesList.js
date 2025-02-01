import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./LoginSignup";
import Navigation from "./Navigation";
import NotFound from "./NotFound";
import AddCenter from "./AddCenter";
import Home from "./Home";
import About from "./About";
import Footer from "./Footer";


const RoutesList = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route exact path ="/" element={<Home />} />
                <Route exact path ="/about" element={<About />} />
                <Route exact path="/add-center" element={<AddCenter />} />
                <Route exact path="/login-signup" element={<LoginSignup />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    );
}

export default RoutesList;