import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
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
  const [selectedBrands, setSelectedBrands] = useState([]);
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width:1400px)");
  const [brands, setBrands] = useState({
    Machines: ["AVA", "Critical", "DKlab", "Equaliser", "EQUALISER FOX BIG V2", "EQUALISER FOX MINI V3", "EZ", "EZ P3 Pro Turbo", "FONE", "Hawink", "INOX PRIME", "Pen", "ProLine", "Tattoo Machines", "Tattooing Machines", "UNISTAR UNIGRIP", "VEX", "Wireless Pen", "X-Strike"],
    CartridgeNeedles: ["Arena Cartridges", "AVA", "Ball Point", "Cartridge Needles", "CNC Police", "Dragonhawk", "EMALLA", "Kwadron", "KWADRON PMU", "MAST Pro", "ProLine", "WJX ULTRA"],
    Consumables: ["Adhesive Tape", "AVA", "BioTaTum", "Container for medical waste", "COSCO", "Demineralized Water", "Disposable mats", "Disposable shoe covers", "Doodler", "Dual Tip Permanent Skin Pen", "Dynamic Soft", "Elastic Band", "EZ", "Glovcon", "Green Soap", "Grumme Grönsåpa", "Ink Caps", "Kwadron", "Markers", "Mega Magnums Silicone Ink Cup", "Mixing Solution", "Nitrile gloves", "Paint Palette", "Pen Cap", "Pen Machine Bags", "Pen Machine Sleeve Box", "Premium Ink", "Printer Ink", "ProLine", "Protective Film Sheets", "PUNK", "Sharpie", "Silicone Ink Cups", "SKULLDNA", "SPIRIT", "Stencil", "Tattoo Hyginen Supplies", "Tattoo Ink", "Tattoo practice skin", "Tattoo Razor", "Tattoo Skin Pen", "Tattoo Stencil", "Tattoo Supplies", "Tattoo Transfer Paper", "Tattooing Soap", "Thermal Transfer Paper", "Transparent Transfer Film", "UNIGLOVES", "UNISTAR", "Wooden Spatulas", "XTREME", "Zebili", ],
    Equipment: ["Armrest", "AVA", "Bottle", "Equipment Case", "Headlamp", "Ink Mixer", "Ink Storage Case", "Kwadron", "MAST", "Professional Photography Light", "ProLine", "SKULLDNA", "Smart Wireless Printer", "Spray Bottle", "Stand for Pen Machines", "Tattoo Bag", "Tattoo Ink Stand", "Thermal Printer"],
    Paints: ["BioTaTum", "Dynamic Color", "Eclipse Tattoo Ink", "Ink Mixer", "Inks", "Kwadron", "Limitless", "Mixing Solution", "PANTHERA", "Soul Ink International", "Tattoo Ink", "Tattooing Inks", "XTREME"],
    SkinCare: ["Absorbent Skin Bandage", "AVA", "Cream", "Derm Defender", "Derm protect film", "EMALLA", "EZ", "Five-Star", "Helosan", "INKTROX", "LOLLIFOAM", "Pain Relief Spray", "Post Laser Cream", "Protection Film", "Protective Film Sheets", "Rapid Repair Cream", "RED STOP", "Repairing Film", "Skin Care Film Roll", "SKULLDNA", "Tattoo Aftercare", "Tattoo Care", "Tattoo Hygiene Supplies", "Tattoo Spray Anesthetic", "Tattooing Soap", "UNISTAR"],
    WorkingOintments: ["BioTaTum", "EZ", "PANTHERA", "PROTON", "Stencil", "Stencil Master", "Tattoo Aftercare", "Tattoo Stencil", "Tattoo Stencil Eraser", "Tattoo Supplies", "UNISTAR"],
    PMU: ["Cartridge Needles", "Dragonhawk", "KWADRON PMU", "MAST Pro", "PMU", "Tattoo Machines", "Tattooing Machines", "Wireless Pen"]
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedBrands([]);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleBrandChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedBrands(
      typeof value === 'string' ? value.split(',') : value,
    );
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

  const filterItemsByBrand = (items) => {
    if (selectedBrands.length === 0) return items;
    return items.filter((item) => selectedBrands.includes(item.attributes.brand));
  };

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

  const getCurrentBrands = () => {
    switch (value) {
      case "Machines":
        return brands.Machines;
      case "Cartridge needles":
        return brands.CartridgeNeedles;
      case "Consumables":
        return brands.Consumables;
      case "Equipment":
        return brands.Equipment;
      case "Paints":
        return brands.Paints;
      case "Skin care":
        return brands.SkinCare;
      case "Working ointments":
        return brands.WorkingOintments;
      case "PMU":
        return brands.PMU;
      default:
        return [];
    }
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
        <Box display="flex" justifyContent="flex-end" gap="10px" mb={2}>
          <Select value={filter} onChange={handleFilterChange}>
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
            <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
          </Select>
          <Select
            multiple
            value={selectedBrands}
            onChange={handleBrandChange}
            displayEmpty
            renderValue={(selected) => selected.length === 0 ? 'Other filters' : selected.join(', ')}
          >
            {getCurrentBrands().map((brand) => (
              <MenuItem key={brand} value={brand}>
                <Checkbox checked={selectedBrands.indexOf(brand) > -1} />
                <ListItemText primary={brand} />
              </MenuItem>
            ))}
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
          sortItems(filterItemsByBrand(MachinesItems)).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Cartridge needles" &&
          sortItems(filterItemsByBrand(CartridgeNeedlesItems)).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Consumables" &&
          sortItems(filterItemsByBrand(ConsumablesItems)).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Equipment" &&
          sortItems(filterItemsByBrand(EquipmentItems)).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Paints" &&
          sortItems(filterItemsByBrand(PaintsItems)).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Skin care" &&
          sortItems(filterItemsByBrand(SkinCareItems)).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Working ointments" &&
          sortItems(filterItemsByBrand(WorkingOintmentsItems)).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "PMU" &&
          sortItems(filterItemsByBrand(PMUItems)).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;