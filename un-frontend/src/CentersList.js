import React, { useState, useEffect } from 'react';
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Table, Pagination, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import './CentersList.css';

const CentersList = () => {
    const { authToken } = useAuth();
    const navigate = useNavigate();
    const [centers, setCenters] = useState([]);
    const [filteredCenters, setFilteredCenters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const centersPerPage = 8;

    // color code status buttons
    const colorMap = {
        "APPROVED": "success",
        "PENDING": "warning",
        "REJECTED": "danger",
    };

    // Redirect to home if no authToken
    useEffect(() => {
        if (!authToken) {
            navigate("/");
        }
    }, [authToken, navigate]);

    useEffect(() => {
        const fetchCenters = async () => {
            if (!authToken) {
                return;
            } // Stop request if no token is available
            try {
                const response = await axios.get("http://localhost:8080/admin/get-centers", {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                // console.table(response.data);
                setCenters(response.data);
                setFilteredCenters(response.data); // Initial render will default to show all centers
            } catch (error) {
                console.error("Error fetching centers:", error);
                if (error.response?.status === 401) {
                    navigate("/"); // Redirect to home if unauthorized
                }
            }
        };
        fetchCenters();
    }, [authToken]);

    // Calculate the indices for the current page based on filteredCenters
    const indexOfLastCenter = currentPage * centersPerPage;
    const indexOfFirstCenter = indexOfLastCenter - centersPerPage;
    const currentCenters = filteredCenters.slice(indexOfFirstCenter, indexOfLastCenter);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total pages
    const totalPages = Math.ceil(filteredCenters.length / centersPerPage);

    // Filter centers shown
    const handleTableFilter = (stat) => {
        if (stat === "ALL") {
            setFilteredCenters(centers); // Show all centers
        } else {
            setFilteredCenters(centers.filter((center) => {
                return center.status === stat;
            }));
        }
        setCurrentPage(1);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            // Send the status update request to the backend with the new status
            const response = await axios.put(
                `http://localhost:8080/admin/edit-center/${id}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            // Reflect new status in frontend
            setCenters(prevCenters =>
                prevCenters.map(center =>
                    center.id === id ? { ...center, status: newStatus } : center
                ))

            // Show table with new update
            handleTableFilter(newStatus);
            
        } catch (error) {
            console.error('Error updating status:', error);
            if (error.response?.status === 401) {
                navigate("/"); // Redirect to home if unauthorized
            }
        }
    }


    return (
        <div className='admin-centers-display'>
            <Container>
                <h1>Recycling Centers</h1>

                <ButtonGroup className='btn-group'>
                    <Button variant="primary" onClick={() => handleTableFilter("ALL")}>All</Button>
                    <Button variant="success" onClick={() => handleTableFilter("APPROVED")}>Approved</Button>
                    <Button variant="warning" onClick={() => handleTableFilter("PENDING")}>Pending</Button>
                    <Button variant="danger" onClick={() => handleTableFilter("REJECTED")}>Rejected</Button>
                </ButtonGroup>

                <Table striped bordered className='centers-table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCenters.map((center, index) => (
                            <tr key={index} className='centers-content-row'>
                                <td>{center.id}</td>
                                <td>{center.name}</td>
                                <td>{center.address}</td>
                                <td>{center.phone}</td>
                                <td>{center.latitude}</td>
                                <td>{center.longitude}</td>
                                <td>{center.description}</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant={colorMap[center.status]}>
                                            {center.status}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {center.status !== "APPROVED" && (
                                                <Dropdown.Item onClick={() => handleStatusChange(center.id, "APPROVED")}>APPROVED</Dropdown.Item>
                                            )}
                                            {center.status !== "PENDING" && (
                                                <Dropdown.Item onClick={() => handleStatusChange(center.id, "PENDING")}>PENDING</Dropdown.Item>
                                            )}
                                            {center.status !== "REJECTED" && (
                                                <Dropdown.Item onClick={() => handleStatusChange(center.id, "REJECTED")}>REJECTED</Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/* Pagination Component */}
                <Pagination size="md" className="pagination-bar">
                    <Pagination.First
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </Container>
        </div>
    )
}

export default CentersList