import { useState } from 'react';
import './AdminLogin.css';
import { Form, Button, FloatingLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from "./AuthContext";

const AdminLogin = () => {
    const [validated, setValidated] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const { setAuthToken } = useAuth(); // Get setAuthToken from AuthContext

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
        console.log('Errors:', newErrors); // Debugging

        setValidated(true);

        // If no errors, proceed with submission
        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted:', loginData);
            try {
                const response = await axios.post(`http://localhost:8080/login`, {
                    username: loginData.username,
                    password: loginData.password,
                });
                console.log('Login successful:', response.data);
                setAuthToken(response.data.authToken);  // Store token in context
            } catch (error) {
                console.error('Error during login:', error.response ? error.response.data : error.message);
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
            </Form>
        </div>
    );
};

export default AdminLogin;