import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);

    // Save token in localStorage when it changes
    useEffect(() => {
        if (authToken) {
            localStorage.setItem("authToken", authToken);
        } else {
            localStorage.removeItem("authToken");
        }
    }, [authToken]);

    // Logout function
    const logout = () => {
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};