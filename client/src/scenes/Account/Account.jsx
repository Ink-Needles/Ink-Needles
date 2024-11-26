import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';

const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';

const Account = () => {
    const [email, setEmail] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [personalData, setPersonalData] = useState(null);
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const getAccount = async () => {
            const jwt = localStorage.getItem('jwt');
            if (jwt) {
                try {
                    const account = await fetch(URL + '/api/users/me', {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });

                    const accountJson = await account.json();
                    setEmail(accountJson.email);
                    setConfirmed(accountJson.confirmed);
                    setPersonalData(accountJson.personalData);

                    // Fetch orders
                    const ordersResponse = await fetch(`${URL}/api/get-orders/email/${accountJson.email}`, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });
                    const ordersJson = await ordersResponse.json();
                    setOrders(ordersJson);
                } catch (error) {
                    window.location.href = '/';
                }
            } else {
                window.location.href = '/';
            }
        };

        getAccount();
    }, []);

    return email ? (
        <Container style={{ width: "80%", marginLeft: "10%", marginTop: '120px' }}>
            <Typography variant="h4" gutterBottom>
                Account Information
            </Typography>
            <Box display="flex" alignItems="center" justifyContent={confirmed ? "start": "space-between"} mb={2}>
                <Typography label="Email">{email}</Typography>
                {confirmed ? (
                    <CheckCircleIcon color="primary" style={{ marginLeft: '0.5rem' }} />
                ) : (
                    <Box display="flex" alignItems="center">
                        <Typography variant="body2" color="red">
                            Email not confirmed
                        </Typography>
                        <Button variant="contained" color="primary" style={{ marginLeft: '0.5rem' }}>
                            Confirm Email
                        </Button>
                    </Box>
                )}
            </Box>

            {/* PERSONAL DATA */}
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Personal Data
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between" style={{backgroundColor: "lightgrey", borderRadius: "15px", padding: "16px"}}>
                    {personalData ? (
                        <><Box>
                            <Typography variant="h6" fontWeight="bold">{personalData.firstName} {personalData.lastName}</Typography>
                            <Typography variant="body1">{personalData.streetAddress}, {personalData.city}, {personalData.country}, {personalData.zipCode}</Typography>
                            <Typography variant="body1">{personalData.phoneNumber}</Typography>
                        </Box>
                        <IconButton onClick={() => window.location.href = '/additional-details'}>
                            <EditIcon />
                        </IconButton></>
                    ) : (
                        <Box>
                            <Button variant="contained" color="primary" onClick={() => window.location.href = '/additional-details'} style={{ marginLeft: '0.5rem' }}>
                                Add Personal Data
                            </Button>
                            <Typography variant="body1" color="red" display="inline" marginLeft="12px">Important!</Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* ORDERS */}
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Orders
                </Typography>
                <Box display="flex" height="300px" style={{backgroundColor: "lightgrey", borderRadius: "15px", padding: "8px"}} flexDirection="column" alignItems="start">
                    {(orders !== null && orders.length > 0) ? (
                        orders.map((order) => (
                            <Box key={order.id} mb={2}>
                                <Typography variant="body1" fontWeight="bold">Order ID: {order.id}</Typography>
                                <Typography variant="body1">Products: {JSON.stringify(order.products)}</Typography>
                            </Box>
                        ))
                    ) : (orders !== null ? (
                        <Typography variant="body1" gutterBottom>
                            You have no orders yet.
                        </Typography>
                    ) : (
                        <Typography variant="body1" gutterBottom>
                            Loading...
                        </Typography>
                    ))}
                </Box>
            </Box>

            {/* LOGOUT */}
            <Box mt={4}>
                <Button variant="contained" color="secondary" onClick={() => {
                    localStorage.removeItem('jwt');
                    window.location.href = '/';
                }}>
                    Logout
                </Button>
            </Box>
        </Container>
    ): (
        <Box width="100%" height="500px" textAlign="center" alignContent="center">Loading...</Box>
    );
};

export default Account;