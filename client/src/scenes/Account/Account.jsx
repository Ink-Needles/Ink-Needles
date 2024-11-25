import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Navigate } from 'react-router-dom';

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
                    console.error('Error fetching account:', error);
                    localStorage.removeItem('jwt');
                    setEmail('');
                    setConfirmed(false);
                    Navigate('/');
                }
            } else {
                Navigate('/');
            }
        };

        getAccount();
    }, []);

    return (
        <Container maxWidth="sm" style={{ marginTop: '160px' }}>
            <Typography variant="h4" gutterBottom>
                Account Information
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography label="Email">{email}</Typography>
                {confirmed ? (
                    <CheckCircleIcon color="primary" style={{ marginLeft: '0.5rem' }} />
                ) : (
                    <Box display="flex" alignItems="center">
                        <Typography variant="body2" color="red">
                            Email not confirmed
                        </Typography>
                        <Button variant="contained" color="primary" style={{ color: "red", marginLeft: '0.5rem' }}>
                            Confirm Email
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default Account;