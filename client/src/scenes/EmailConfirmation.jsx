import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';

const EmailConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const confirmation = query.get('confirmation');

    if (confirmation) {
      fetch(URL+`/api/auth/custom-email-confirmation?confirmation=${confirmation}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.jwt) {
            // Store the JWT in local storage or context
            localStorage.setItem('jwt', data.jwt);
            // Redirect the user to the desired page
            navigate('/dashboard');
          } else {
            // Handle errors
          }
        })
        .catch((err) => {
          console.error('Email confirmation error:', err);
        });
    }
  }, [location, navigate]);

  return <div>Confirming your email...</div>;
};

export default EmailConfirmation;