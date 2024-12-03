import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, Modal, Typography, TextField, Button } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import { useState } from "react";
import { GoogleLogin } from 'react-google-login';

const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";

const Navbar = ({account}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSearch = () => {
    navigate(`/search?text=${searchText}`);
  };

  const handleContinue = async () => {
    try {
      // Attempt to log in the user
      const loginResponse = await fetch(URL+'/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });
  
      const loginData = await loginResponse.json();
  
      if (loginData.jwt) {
        // Login successful
        localStorage.setItem('jwt', loginData.jwt);
        setLoginOpen(false);
        navigate('/account');
        // Redirect or update state
      } else {
        // If login fails, try to register the user
        const registerResponse = await fetch(URL+'/api/auth/local/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: email,
            email: email,
            password: password,
          }),
        });
  
        const registerData = await registerResponse.json();
  
        if (registerData.user) {
          // Registration successful, confirmation email sent
          setLoginOpen(false);
          navigate('/waiting-confirmation');
        } else {
          // Handle registration errors
          alert('An error occurred during registration.');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleGoogleLoginSuccess = () => {
    // Handle login with Google
  };

  const handleGoogleLoginFailure = () => {
    // Handle login with Google failure
  };

  return (
    <Box
      display="flex"
      textAlign="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
        >
          ECOMMER
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          {/* SEARCH BUTTON */}
          <IconButton
            sx={{ color: "black" }}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <SearchOutlined />
          </IconButton>
          {searchOpen && (
            <Box display="flex" alignItems="center">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                style={{
                  padding: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginRight: "10px",
                }}
              />
              <IconButton sx={{ color: "black" }} onClick={handleSearch}>
                <ArrowCircleRightIcon />
              </IconButton>
            </Box>
          )}
          {/* ACCOUNT BUTTON */}
          <IconButton sx={{ color: "black" }} onClick={() => {account ? navigate("/account") : setLoginOpen(true)}}>
            <PersonOutline />
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: "black" }} style={{display: "none"}}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>

      {/* LOGIN MODAL */}
      <Modal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            width: 300,
          }}
        >
          <Typography id="login-modal-title" variant="h6" component="h2">
            Login/Sign up
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleContinue}
            sx={{ mt: 2 }}
          >
            Continue
          </Button>
          <GoogleLogin
            clientId="714022822209-jak80996hasaif605fm0dperv7krhft2.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                sx={{ mt: 1 }}
              >
                Login with Google
              </Button>
            )}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Navbar;
