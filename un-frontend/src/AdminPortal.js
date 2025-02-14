import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import './AdminPortal.css';

const AdminPortal = () => {
    const navItems = [
        { path: "/admin-users", label: "Admin Users" },
        { path: "/admin-centers", label: "Recycling Centers" },
        { path: "/admin-analytics", label: "Analytics & Reports" },
        { path: "/admin-settings", label: "Settings" },
        { path: "/logout", label: "Logout", className: "logout-link" }
    ];

    return (
        <div className="admin-login-display">
        <Container>
            <h1>Admin Portal</h1>
            <nav className="admin-nav">
                {navItems.map((item) => (
                    <NavLink 
                        key={item.path} 
                        to={item.path} 
                        className={({ isActive }) => ` admin-navlink nav-link ${isActive ? "active-link" : ""} ${item.className || ""}`}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </Container>
        </div>
    );
};

export default AdminPortal;