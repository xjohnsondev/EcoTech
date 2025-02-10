import React, { useState, useEffect } from 'react';
import { Container, Table, Pagination, Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import './CentersList.css';

const CentersList = () => {
    const [centers, setCenters] = useState([]);
    const [filteredCenters, setFilteredCenters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const centersPerPage = 8;

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get-centers');
                // console.table(response.data);
                setCenters(response.data);
                setFilteredCenters(response.data); // initial render will default to show all centers
            } catch (error) {
                console.error("Error fetching centers:", error);
            }
        };
        fetchCenters();
    }, []);

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
    };

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
                                <td>{center.status}</td>
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