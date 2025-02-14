import './AddCenter.css';
import { useState, useRef } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Footer from "./Footer";
import UseGetLatLong from './hooks/UseGetLatLng';
import statesConfig from './config/statesConfig.json';
import axios from 'axios';
import { useAsyncError } from 'react-router-dom';

const AddCenter = () => {
    const [isZipValid, setIsZipValid] = useState(true);
    const [error, setError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [zipError, setZipError] = useState(null);
    const states = statesConfig.statesOptions;

    const businessNameRef = useRef();
    const businessContactRef = useRef();
    const businessDescriptionRef = useRef();
    const streetNameRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const zipCodeRef = useRef();

    const validatePhoneNumber = (phoneNumber) => {
        // Validate phone number is 10 digits
        const newPhone = phoneNumber.replace(/\D/g, "");
        console.log(newPhone);
        if (newPhone.length !== 10) {
            setPhoneError("Phone number must be 10 digits.");
            return null;
        }
        setPhoneError(null);
        return `(${newPhone.slice(0, 3)}) ${newPhone.slice(3, 6)}-${newPhone.slice(6)}`;
    }

    const validateZipcode = (zipCode) => {
        if (!/^\d{5}$/.test(zipCode)) {
            setIsZipValid(false);
            setZipError("Zip code must be 5 digits.");
            return false;
        }
        setIsZipValid(true);
        setZipError(null);
        return true;
    };

    const handleCenterSubmit = async (e) => {
        e.preventDefault();
        setError(null);



        // Gather location details from form
        const businessName = businessNameRef.current.value.trim();
        const businessContact = businessContactRef.current.value.trim();
        const businessDescription = businessDescriptionRef.current.value.trim();
        const street = streetNameRef.current.value.trim();
        const city = cityRef.current.value === "District of Columbia" ? "Washington D.C." : cityRef.current.value.trim();
        const state = city === "Distict of Columbia" ? "" : stateRef.current.value;
        const zipCode = zipCodeRef.current.value.trim();

        const address = (street + ", " + city + ", " + state + " " + zipCode).toUpperCase();

        // Validate phone number
        const formattedPhone = validatePhoneNumber(businessContact);
        if (!formattedPhone) {
            setError("Please enter a valid 10-digit phone number.");
            return;  // Prevent form submission
        }
    
        // Validate ZIP code
        if (!validateZipcode(zipCode)) {
            setError("Please enter a valid ZIP code.");
            return;  // Prevent form submission
        }

        try {
            // Geolocate entry for map placement
            const { latitude, longitude } = await UseGetLatLong(address);

            // Send new center to database
            await axios.post(`http://localhost:8080/add-centers`, [
                {
                    name: businessName,
                    address: address,
                    phone: formattedPhone,
                    latitude: latitude,
                    longitude: longitude,
                    description: businessDescription,
                    status: "PENDING",
                }
            ]);
        } catch (error) {
            console.error("Error submitting center:", error);
            setError("An error occurred while submitting the center. Please try again.");
        }
    };



    return (
        <Container fluid className='ac-body'>
            <div className='flex-cont'>
                <Container className='ac-form-container'>
                    <h1>Register a Recycling Center</h1>

                    <Form onSubmit={handleCenterSubmit} className='ac-form'>
                        <Row className='mb-3'>
                            <Col md={7}>
                                <Form.Group controlId='formBusinessName'>
                                    <Form.Label>Business Name *</Form.Label>
                                    <Form.Control type='text' placeholder='' className='ac-input' ref={businessNameRef} required />
                                </Form.Group>
                            </Col>
                            <Col md={5}>
                                <Form.Group controlId='formBusinessContact'>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type='text' isInvalid={!!phoneError}
                                        placeholder='' className='ac-input' ref={businessContactRef} />
                                    <Form.Control.Feedback type='invalid'>
                                        {phoneError}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='mb-3'>
                            <Col xs={12}>
                                <Form.Group controlId='formBusinessDescription'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as='textarea' rows={3} className='ac-input' ref={businessDescriptionRef} />
                                    <Form.Text className='text-muted'>
                                        Tell us about your business
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='mb-3'>
                            <Col xs={12}>
                                <Form.Group controlId='formStreetName'>
                                    <Form.Label>Street *</Form.Label>
                                    <Form.Control type='text' className='ac-input' ref={streetNameRef} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                <Form.Group controlId='formCity'>
                                    <Form.Label>City *</Form.Label>
                                    <Form.Control type='text' className='ac-input' ref={cityRef} required />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId='formState'>
                                    <Form.Label>State *</Form.Label>
                                    <Form.Select className='ac-input' ref={stateRef} defaultValue="" required >
                                        <option value="" disabled />
                                        {states.map((state, index) => (
                                            <option key={index} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId='formZipCode'>
                                    <Form.Label>Zip *</Form.Label>
                                    <Form.Control
                                        type='text'
                                        className='ac-input'
                                        ref={zipCodeRef}
                                        isInvalid={!isZipValid}
                                        required />
                                    <Form.Control.Feedback type='invalid'>
                                        {zipError}
                                    </Form.Control.Feedback>

                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit" className='ac-submit'>
                            Submit
                        </Button>
                    </Form>
                </Container>
                <div className='style-block'></div>
            </div>
            <Footer />
        </Container>
    );
}

export default AddCenter;