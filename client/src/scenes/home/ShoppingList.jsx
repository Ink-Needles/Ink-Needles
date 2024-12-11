import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery, Select, MenuItem } from "@mui/material";
import Item from "../../components/Item";
import { setItems } from "../../state";
import axios from "axios";
import WelcomePage from "./WelcomePage";
import Contacts from "./Contacts";

const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("home");
  const [filter, setFilter] = useState("default");
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const getItems = async () => {
    const items = await axios.get(
      URL+"/api/items?populate=image,sizes"
    );

    const itemsJson = await items.data;
    dispatch(setItems(itemsJson.data));
  };

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const MachinesItems = items.filter(
    (item) => item.attributes.category === "Machines"
  );
  const CartridgeNeedlesItems = items.filter(
    (item) => item.attributes.category === "Cartridge needles"
  );
  const ConsumablesItems = items.filter(
    (item) => item.attributes.category === "Consumables"
  );
  const EquipmentItems = items.filter(
    (item) => item.attributes.category === "Equipment"
  );
  const PaintsItems = items.filter(
    (item) => item.attributes.category === "Paints"
  );
  const SkinCareItems = items.filter(
    (item) => item.attributes.category === "Skin care"
  );
  const WorkingOintmentsItems = items.filter(
    (item) => item.attributes.category === "Working ointments"
  );
  const PMUItems = items.filter(
    (item) => item.attributes.category === "PMU"
  );

  const sortItems = (items) => {
    const itemsCopy = [...items];
    if (filter === "priceLowToHigh") {
      return itemsCopy.sort((a, b) => a.attributes.price - b.attributes.price);
    } else if (filter === "priceHighToLow") {
      return itemsCopy.sort((a, b) => b.attributes.price - a.attributes.price);
    }
    return itemsCopy;
  };

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Feature <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="Home" value="home" />
        <Tab label="Machines" value="Machines" />
        <Tab label="Cartridge needles" value="Cartridge needles" />
        <Tab label="Consumables" value="Consumables" />
        <Tab label="Equipment" value="Equipment" />
        <Tab label="Paints" value="Paints" />
        <Tab label="Skin care" value="Skin care" />
        <Tab label="Working ointments" value="Working ointments" />
        <Tab label="PMU" value="PMU" />
        <Tab label="Contacts" value="Contacts" />
      </Tabs>
      {value !== "home" && value !== "Contacts" && 
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Select value={filter} onChange={handleFilterChange}>
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
            <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
          </Select>
        </Box>
      }
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "home" &&
          <WelcomePage />
        } {value === "Contacts" &&
          <Contacts />
        }
        {value === "Machines" &&
          sortItems(MachinesItems).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Cartridge needles" &&
          sortItems(CartridgeNeedlesItems).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Consumables" &&
          sortItems(ConsumablesItems).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Equipment" &&
          sortItems(EquipmentItems).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Paints" &&
          sortItems(PaintsItems).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Skin care" &&
          sortItems(SkinCareItems).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Working ointments" &&
          sortItems(WorkingOintmentsItems).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "PMU" &&
          sortItems(PMUItems).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;