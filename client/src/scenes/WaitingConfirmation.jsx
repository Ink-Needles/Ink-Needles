import { Box } from "@mui/material";

const WaitingConfirmation = () => {
  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        <Box width="100%">
          <h1>Email Confirmation</h1>
          <p>
            Thank you for signing up! Please check your email to confirm your
            account.
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default WaitingConfirmation;