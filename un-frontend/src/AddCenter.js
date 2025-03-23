import './AddCenter.css';
import { useState, useRef } from 'react';
import { Container, Form, Button, Row, Col, FloatingLabel, FormControl } from 'react-bootstrap';
import Footer from "./Footer";
import UseGetLatLong from './hooks/UseGetLatLng';
import statesConfig from './config/statesConfig.json';
import axios from 'axios';

const AddCenter = () => {
    const [validated, setValidated] = useState(false);
    const [isZipValid, setIsZipValid] = useState(true);
    const [errors, setErrors] = useState({});
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
        setErrors({});

        // Gather location details from form
        const businessName = businessNameRef.current.value.trim();
        const businessContact = businessContactRef.current.value.trim();
        const businessDescription = businessDescriptionRef.current.value.trim();
        const street = streetNameRef.current.value.trim();
        const city = cityRef.current.value === "District of Columbia" ? "Washington D.C." : cityRef.current.value.trim();
        const state = city === "Distict of Columbia" ? "" : stateRef.current.value;
        const zipCode = zipCodeRef.current.value.trim();

        const address = (street + ", " + city + ", " + state + " " + zipCode).toUpperCase();


        /////// Validation code
        if (!businessName) setErrors({ ...errors, businessNameError: "Please enter a Business Name" });
        if (!street) setErrors({ ...errors, streetError: "Please enter a Street Name" });
        if (!city) setErrors({ ...errors, cityError: "Please enter a city" });
        if (!state) setErrors({ ...errors, stateError: "Please select a State" });

        // Validate phone number
        const formattedPhone = validatePhoneNumber(businessContact);
        if (!formattedPhone) {
            setErrors({ ...errors, phoneError: "Please enter a valid 10-digit phone number." });
            return;  // Prevent form submission
        }

        // Validate ZIP code
        if (!validateZipcode(zipCode)) {
            setErrors({ ...errors, zipError: "Please enter a valid ZIP code." });
            return;  // Prevent form submission
        }
        /////////

        try {
            // Geolocate entry for map placement
            const { latitude, longitude } = await UseGetLatLong(address);

            // Send new center to database
            await axios.post(`https://ecotech-server.onrender.com/add-centers`, [
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

            // Clear form fields on successful submission
            businessNameRef.current.value = "";
            businessContactRef.current.value = "";
            businessDescriptionRef.current.value = "";
            streetNameRef.current.value = "";
            cityRef.current.value = "";
            stateRef.current.value = "";
            zipCodeRef.current.value = "";
        } catch (error) {
            console.error("Error submitting center:", error);
            setErrors("An error occurred while submitting the center. Please try again.");
        }
    };



    return (
        <Container fluid className='ac-body'>
            <div className='flex-cont'>
                <Container className='ac-form-container'>
                    <h1>Register a Recycling Center</h1>

                    <Form noValidate validated={validated} onSubmit={handleCenterSubmit} className='ac-form'>
                        <Form.Text className='text-muted mx-1'>
                            * Denotes required
                        </Form.Text>
                        <Row className='mb-3'>
                            <Col md={7}>
                                <Form.Group controlId='formBusinessName'>
                                    <FloatingLabel label="Business Name *">
                                        <FormControl
                                            type='text'
                                            placeholder='Business Name *'
                                            className='ac-input name-input'
                                            ref={businessNameRef}
                                            required
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.businessNameError}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md={5}>
                                <Form.Group controlId='formBusinessContact'>
                                    <FloatingLabel label="Phone Number">
                                        <FormControl
                                            type='text'
                                            isInvalid={!!errors.phoneError}
                                            placeholder='Phone Number'
                                            className='ac-input'
                                            ref={businessContactRef}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.phoneError}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='mb-3'>
                            <Col xs={12}>
                                <Form.Group controlId='formBusinessDescription'>
                                    <FloatingLabel label="Description">
                                        <FormControl
                                            as='textarea'
                                            style={{ height: '75px' }}
                                            placeholder='Description'
                                            className='ac-input'
                                            ref={businessDescriptionRef}
                                        />
                                        <Form.Text className='text-muted mx-1'>
                                            Tell us about the business
                                        </Form.Text>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='mb-3'>
                            <Col xs={12}>
                                <Form.Group controlId='formStreetName'>
                                    <FloatingLabel label="Street *">
                                        <FormControl
                                            type='text'
                                            className='ac-input'
                                            isInvalid={!!errors.streetError}
                                            placeholder='Street *'
                                            ref={streetNameRef}
                                            required />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.streetError}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                <Form.Group controlId='formCity'>
                                    <FloatingLabel label='City *'>
                                        <Form.Control
                                            className='ac-input city-input'
                                            isInvalid={!!errors.cityError}
                                            placeholder='City *'
                                            ref={cityRef}
                                            required
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.cityError}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId='formState'>
                                    <FloatingLabel label='State *'>
                                        <Form.Select
                                            type='text'
                                            className='ac-input state-input'
                                            isInvalid={!!errors.stateError}
                                            ref={stateRef}
                                            defaultValue=""
                                            required
                                        >
                                            <option value="" disabled />
                                            {states.map((state, index) => (
                                                <option key={index} value={state}>
                                                    {state}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.stateError}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId='formZipCode'>
                                    <FloatingLabel label='Zip *'>
                                        <Form.Control
                                            type='text'
                                            className='ac-input'
                                            placeholder='City *'
                                            ref={zipCodeRef}
                                            isInvalid={!!errors.zipError}
                                            required />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.zipError}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
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