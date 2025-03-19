import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import AdminLogin from "./AdminLogin";
import Navigation from "./Navigation";
import NotFound from "./NotFound";
import AddCenter from "./AddCenter";
import Home from "./Home";
import About from "./About";
import AdminPortal from "./AdminPortal";
import AdminUsers from "./AdminUsers";
import CentersList from "./CentersList";
import Terms from "./Terms";
import Privacy from "./Privacy";

const RoutesList = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/add-center" element={<AddCenter />} />
                    <Route exact path="/admin-login" element={<AdminLogin />} />
                    <Route exact path="/admin-portal" element={<AdminPortal />} />
                    <Route exact path="/admin-users" element={<AdminUsers />} />
                    <Route exact path="/admin-centers" element={<CentersList />} />
                    <Route exact path="/terms" element={<Terms />} />
                    <Route exact path="/privacy" element={<Privacy />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default RoutesList;