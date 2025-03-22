import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from "./AuthContext";
import { Container, Table } from 'react-bootstrap';
import './AdminUsers.css';

const AdminUsers = () => {
    const { authToken } = useAuth();
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdminUsers = async () => {
            if (!authToken) return;  // Stop request if no token is available
            try {
                const response = await axios.get("http://localhost:8080/admin/get-users", {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                });                
                setAdmins(response.data);
            } catch (error) {
                console.error("Error fetching admin users:", error);
            }
        };
        fetchAdminUsers();
    }, [authToken]);

    return (
        <div className='admin-users-display'>
            <Container>
                <h1>Admin Users</h1>

                <Table striped bordered className='admin-table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, index) => (
                            <tr key={index}>
                                <td>{admin.id}</td>
                                <td>{admin.username}</td>
                                <td>{admin.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default AdminUsers