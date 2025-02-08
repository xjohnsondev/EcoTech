// import { useState } from 'react';
// import './LoginSignup.css';
// import { Form, Button, Row } from 'react-bootstrap';
// import Footer from './Footer';
// import api from "./api";

// const LoginSignup = () => {
//     const [isRegistering, setIsRegistering] = useState(false);
//     const [loginData, setLoginData] = useState({ email: '', password: '' });
//     const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
//     const [errorMessages, setErrorMessages] = useState({});

//     const toggleForm = () => setIsRegistering(!isRegistering);

//     const handleLoginChange = (e) => {
//         const { name, value } = e.target;
//         setLoginData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleRegisterChange = (e) => {
//         const { name, value } = e.target;
//         setRegisterData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleLoginSubmit = async (e) => {
//         e.preventDefault();
//         const { email, password } = loginData;
//         // validation
//         if (email === password) {
//             setErrorMessages((prevErrors) => ({
//                 ...prevErrors,
//                 password: "Your password can't be the same as your email.",
//             }));
//             return
//         } else {
//             setErrorMessages((prevErrors) => ({
//                 ...prevErrors,
//                 password: "",
//             }));
//             try {
//                 // Post registration data
//                 const response = await api.post('/login', { email, password });
//                 console.log(response.data);
//             } catch (error) {
//                 if (error.response) {
//                     setErrorMessages((prevErrors) => ({
//                         ...prevErrors,
//                         password: error.response.data.error || "Login failed",
//                     }));
//                 }
//             }
//         }
//     };

//     const handleRegisterSubmit = async (e) => {
//         e.preventDefault();
//         const { name, email, password, confirmPassword } = registerData;
//         // Ensure both passwords entered match
//         if (password !== confirmPassword) {
//             setErrorMessages((prevErrors) => ({
//                 ...prevErrors,
//                 confirmPassword: "Your passwords must match.",
//             }));
//             return;
//         } else {
//             setErrorMessages((prevErrors) => ({
//                 ...prevErrors,
//                 confirmPassword: "",
//             }));
//         }
    
//         try {
//             // Post registration data
//             const response = await api.post('/register', {
//                 name,
//                 email,
//                 password,
//                 confirmPassword
//             });
    
//             // Successful registration
//             console.log("Registration successful:", response.data);
    
//         } catch (error) {
//             // Handle backend errors
//             if (error.response && error.response.data) {
//                 setErrorMessages((prevErrors) => ({
//                     ...prevErrors,
//                     confirmPassword: error.response.data.error || "Registration failed",
//                 }));
//             } else {
//                 console.error("An error occurred:", error);
//                 setErrorMessages((prevErrors) => ({
//                     ...prevErrors,
//                     confirmPassword: "An unexpected error occurred. Please try again.",
//                 }));
//             }
//         }
//     };

//     return (
//         <div className="ls-section">
//             <div className="ls-container">
//                 <div className="full-height center-content">
//                     <div className="form-switch-container text-center">
//                         <h6 className="switch-tabs">
//                             <p className="form-switch" onClick={() => setIsRegistering(false)}>Login</p>
//                             <p className="form-switch" onClick={() => setIsRegistering(true)}>Register</p>
//                         </h6>
//                         <input
//                             className="checkbox"
//                             type="checkbox"
//                             id="reg-log"
//                             checked={isRegistering}
//                             onChange={toggleForm}
//                         />
//                         <label htmlFor="reg-log"></label>

//                         <div className="card-3d-wrap">
//                             <div className="card-3d-wrapper">
//                                 {!isRegistering ? (
//                                     <div className="card-front">
//                                         <div className="center-wrap">
//                                             <div className="section2">
//                                                 <h4 className="ls-title">Login</h4>
//                                                 <Form onSubmit={handleLoginSubmit} className="form-group mt-5">
//                                                     <Row className='mb-3'>
//                                                         <Form.Group controlId='formLoginEmail'>
//                                                             <Form.Control
//                                                                 type="email"
//                                                                 name="email"
//                                                                 placeholder="Email"
//                                                                 value={loginData.email}
//                                                                 onChange={handleLoginChange}
//                                                                 required
//                                                             />
//                                                         </Form.Group>
//                                                     </Row>

//                                                     <Row>
//                                                         <Form.Group controlId='formLoginPassword'>
//                                                             <Form.Control
//                                                                 type="password"
//                                                                 name="password"
//                                                                 placeholder="Password"
//                                                                 value={loginData.password}
//                                                                 onChange={handleLoginChange}
//                                                                 isInvalid={!!errorMessages.password}
//                                                                 required
//                                                             />
//                                                             <Form.Control.Feedback type='invalid'>
//                                                                 <p style={{
//                                                                     backgroundColor: '#DBE2EF',
//                                                                     textAlign: 'left',
//                                                                     paddingLeft: '5px'
//                                                                 }}>
//                                                                     {errorMessages.password}
//                                                                 </p>
//                                                             </Form.Control.Feedback>
//                                                         </Form.Group>
//                                                     </Row>

//                                                     <Button className="ls-btn" type="submit">
//                                                         Submit
//                                                     </Button>
//                                                 </Form>
//                                                 <p className="text-center">
//                                                     <a href="#0" className="link">
//                                                         Forgot your password?
//                                                     </a>
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div className="card-back">
//                                         <div className="center-wrap">
//                                             <div className="section2 text-center">
//                                                 <h4 className="ls-title pt-4">Register</h4>
//                                                 <Form onSubmit={handleRegisterSubmit} className="form-group">
//                                                     <Row className='mb-3 pt-2'>
//                                                         <Form.Group controlId='formRegisterName'>
//                                                             <Form.Control
//                                                                 type="text"
//                                                                 name="name"
//                                                                 placeholder="Business Name"
//                                                                 value={registerData.name}
//                                                                 onChange={handleRegisterChange}
//                                                                 required
//                                                             />
//                                                         </Form.Group>
//                                                     </Row>
//                                                     <Row className='mb-3'>
//                                                         <Form.Group controlId='formRegisterEmail'>
//                                                             <Form.Control
//                                                                 type="email"
//                                                                 name="email"
//                                                                 placeholder="Email"
//                                                                 value={registerData.email}
//                                                                 onChange={handleRegisterChange}
//                                                                 required
//                                                             />
//                                                         </Form.Group>
//                                                     </Row>
//                                                     <Row className='mb-3'>
//                                                         <Form.Group controlId='formRegisterEmail'>
//                                                             <Form.Control
//                                                                 type="password"
//                                                                 name="password"
//                                                                 placeholder="Password"
//                                                                 value={registerData.password}
//                                                                 onChange={handleRegisterChange}
//                                                                 required
//                                                             />
//                                                         </Form.Group>
//                                                     </Row>
//                                                     <Row className='mb-3'>
//                                                         <Form.Group controlId='formRegisterConfirmPassword'>
//                                                             <Form.Control
//                                                                 type="password"
//                                                                 name="confirmPassword"
//                                                                 placeholder="Confirm Password"
//                                                                 value={registerData.confirmPassword}
//                                                                 onChange={handleRegisterChange}
//                                                                 isInvalid={!!errorMessages.confirmPassword}
//                                                                 required
//                                                             />
//                                                             <Form.Control.Feedback type='invalid'>
//                                                                 <p style={{
//                                                                     backgroundColor: '#DBE2EF',
//                                                                     textAlign: 'left',
//                                                                     paddingLeft: '5px'
//                                                                 }}>
//                                                                     {errorMessages.confirmPassword}
//                                                                 </p>
//                                                             </Form.Control.Feedback>
//                                                         </Form.Group>
//                                                     </Row>

//                                                     <Button className="ls-btn mt-2" type="submit">
//                                                         Submit
//                                                     </Button>
//                                                 </Form>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default LoginSignup;