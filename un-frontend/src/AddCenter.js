import './AddCenter.css';
import { useState, useRef } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Footer from "./Footer";
import UseGetLatLong from './hooks/UseGetLatLng';
import statesConfig from './config/statesConfig.json';

const AddCenter = () => {
    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null })
    const [isZipValid, setIsZipValid] = useState(true);
    const states = statesConfig.statesOptions;

    const businessNameRef = useRef();
    const businessContactRef = useRef();
    const businessDescriptionRef = useRef();
    const streetNameRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const zipCodeRef = useRef();

    const handleCenterSubmit = async (e) => {
        e.preventDefault();

        // Gather location details from form
        const businessName = businessNameRef.current.value;
        const businessContact = businessContactRef.current.value;
        const businessDescription = businessDescriptionRef.current.value;
        const street = streetNameRef.current.value;
        const city = cityRef.current.value === "District of Columbia" ? "D.C." : cityRef.current.value;
        const state = stateRef.current.value;
        const zipCode = zipCodeRef.current.value;

        // Validate zipcode is 5 digit number
        if (/^\d{5}$/.test(zipCode)) {
            setIsZipValid(true)
        } else {
            setIsZipValid(false)
        }

        const address = (street + ", " + city + ", " + state + " " + zipCode).toUpperCase();

        // Geolocate entry for map placement
        const { latitude, longitude } = await UseGetLatLong(address);
        setCoordinates({ latitude, longitude });

        // Send data to database here
    };

    return (
        <Container fluid className='ac-body'>
            <div className='flex-cont'>

                <Container className='ac-form-container'>
                    <h1>Register Your Business Center</h1>
                    <Form onSubmit={handleCenterSubmit} className='ac-form'>
                        <Row className='mb-3'>
                            <Col md={7}>
                                <Form.Group controlId='formBusinessName'>
                                    <Form.Label>Business Name</Form.Label>
                                    <Form.Control type='text' placeholder='' className='ac-input' ref={businessNameRef} required />
                                </Form.Group>
                            </Col>
                            <Col md={5}>
                                <Form.Group controlId='formBusinessContact'>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type='text' placeholder='' className='ac-input' ref={businessContactRef} />
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
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control type='text' className='ac-input' ref={streetNameRef} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                <Form.Group controlId='formCity'>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type='text' className='ac-input' ref={cityRef} required />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId='formState'>
                                    <Form.Label>State</Form.Label>
                                    <Form.Select className='ac-input' ref={stateRef} required>
                                        <option value="" disabled>
                                            SELECT
                                        </option>
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
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control
                                        type='text'
                                        className='ac-input'
                                        ref={zipCodeRef}
                                        isInvalid={!isZipValid}
                                        required />
                                    <Form.Control.Feedback type='invalid'>
                                        <p style={{
                                            textAlign: 'left',
                                            paddingLeft: '5px'
                                        }}>
                                            Please enter a valid zipcode
                                        </p>
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
            <div>
                <Footer />
            </div>
        </Container>
    );
}

export default AddCenter;