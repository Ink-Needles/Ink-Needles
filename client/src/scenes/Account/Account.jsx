import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';

const Account = () => {
    const [email, setEmail] = useState('');
    const [confirmed, setConfirmed] = useState(false);

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
        <Container style={{ width: "80%", marginLeft: "10%", marginTop: '160px' }}>
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

            {/* ORDERS */}
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Orders
                </Typography>
                <Box display="flex" height="300px" style={{backgroundColor: "lightgrey", borderRadius: "15px", padding: "8px"}} flexDirection="column" alignItems="start">
                    <Typography variant="body1" gutterBottom>
                        You have no orders yet.
                    </Typography>
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