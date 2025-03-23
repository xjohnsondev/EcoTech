import { useState } from 'react';
import './AdminLogin.css';
import { Form, Button, FloatingLabel, FormControl, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [validated, setValidated] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const { setAuthToken } = useAuth(); // Get setAuthToken from AuthContext
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        // Clear previous errors
        let newErrors = {};

        if (!loginData.username.trim()) newErrors.username = 'Username is required.';
        if (!loginData.password.trim()) newErrors.password = 'Password is required.';

        setErrors(newErrors);
        setValidated(true);

        // If no errors, proceed with submission
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post(`https://ecotech-server.onrender.com/login`, {
                    username: loginData.username,
                    password: loginData.password,
                });
                setAuthToken(response.data.authToken);  // Store token in context
                navigate("/admin-portal");
            } catch (error) {
                // console.error('Error during login:', error.response ? error.response.data : error.message);
                setErrors({...errors, invalid: error.response.data});
            }
        }
    };

    return (
        <div className="admin-login-container">
            <Form noValidate validated={validated} onSubmit={handleSubmit} className='admin-login-form'>
                
                {/* Username Field */}
                <Form.Group controlId="floatingUsername" className="mb-3">
                    <FloatingLabel label="Admin Username">
                        <FormControl
                            required
                            type='text'
                            placeholder='Admin Username'
                            value={loginData.username}
                            isInvalid={!!errors.username}  
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>

                {/* Password Field */}
                <Form.Group controlId="floatingPassword" className="mb-3">
                    <FloatingLabel label="Admin Password">
                        <FormControl
                            required
                            type='password'
                            placeholder='Admin Password'
                            value={loginData.password}
                            isInvalid={!!errors.password}  
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>

                <Button type="submit" className='admin-login-btn'>Submit</Button>
                {errors.invalid && <Alert variant='danger' className='login-alert'>{errors.invalid}</Alert>}
            </Form>
        </div>
    );
};

export default AdminLogin;