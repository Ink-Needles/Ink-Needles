import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';

const AdditionalDetails = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    streetAddress: '',
    city: '',
    zipCode: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return navigate('/');
    }

    try {
      const response = await axios.post(
        `${URL}/api/auth/local/additional-details/${jwt}`,
        { personalData: formData },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status === 200) {
        navigate('/account');
      } else {
        console.error('Error submitting additional details:', response);
      }
    } catch (error) {
      console.error('Error submitting additional details:', error);
    }
  };

  return (
    <Box width="80%" m="80px auto">
      <Typography variant="h4" gutterBottom>
        Additional Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="grid" gap="15px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
          <TextField
            fullWidth
            type="text"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            type="text"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            type="text"
            label="Street Address"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            type="text"
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            type="text"
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            type="text"
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            sx={{ gridColumn: "span 1" }}
          />
        </Box>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "white",
            borderRadius: 0,
            padding: "15px 40px",
            marginTop: "20px",
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AdditionalDetails;