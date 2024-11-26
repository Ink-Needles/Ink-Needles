import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
import Search from "./scenes/Search";
import WaitingConfirmation from "./scenes/WaitingConfirmation";
import Account from "./scenes/Account/Account";
import EmailConfirmation from "./scenes/EmailConfirmation";
import AdditionalDetails from "./scenes/AdditionalDetails";

const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";

const App = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        try {
          const account = await fetch(URL+'/api/users/me', {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          })

          setAccount(await account.json());
        } catch (error) {
          console.error('Error fetching account:', error);
          window.location.href = '/';
        }
      }
    };

    getAccount();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar account={account ? true : false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
          <Route path="search" element={<Search />} />
          <Route path="waiting-confirmation" element={<WaitingConfirmation />} />
          <Route path="account" element={<Account account={account} />} />
          <Route path="confirmation" element={<EmailConfirmation />} />
          <Route path="additional-details" element={<AdditionalDetails />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
