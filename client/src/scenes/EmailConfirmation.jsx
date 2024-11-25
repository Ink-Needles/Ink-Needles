import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';

const EmailConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const confirmation = urlParams.get('confirmation');

      if (confirmation) {
        try {
          const response = await fetch(`${URL}/api/auth/custom-email-confirmation?confirmation=${confirmation}`);
          const data = await response.json();

          if (data.jwt) {
            localStorage.setItem('jwt', data.jwt);
            navigate('/additional-details');
          } else {
            console.error('Email confirmation failed');
          }
        } catch (error) {
          console.error('Error confirming email:', error);
        }
      }
    };

    confirmEmail();
  }, [navigate]);

  return (
    <div>
      <h1>Email Confirmation</h1>
      <p>Confirming your email...</p>
    </div>
  );
};

export default EmailConfirmation;