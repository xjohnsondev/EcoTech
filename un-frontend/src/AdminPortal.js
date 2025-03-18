import React, {useEffect} from "react";
import { Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import './AdminPortal.css';

const AdminPortal = () => {
    const { logout, authToken } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        { path: "/admin-users", label: "Admin Users" },
        { path: "/admin-centers", label: "Recycling Centers" },
        { path: "/admin-analytics", label: "Analytics & Reports" },
        { path: "/admin-settings", label: "Settings" },
    ];

    useEffect(() => {
        if (!authToken) {
            navigate("/")
        }
    }, [authToken])

    const handleLogout = () => {
        logout();
    }

    return (
        <div className="admin-login-display">
            <Container>
                <h1>Admin Portal</h1>
                <nav className="admin-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className="admin-navlink nav-link"
                        >
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                    <NavLink
                        key={'logout'}
                        className={"admin-navlink nav-link"}
                        onClick={handleLogout}
                    >
                        Logout
                    </NavLink>
                </nav>
            </Container>
        </div>
    );
};

export default AdminPortal;