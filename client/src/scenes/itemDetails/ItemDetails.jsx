import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, IconButton, Typography, Button, Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";
import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getItem = async () => {
    const item = await axios.get(
      URL + "/api/items/" + itemId + "?populate=image,sizes"
    );
    const itemJson = await item.data;
    console.log(itemJson.data);
    setItem(itemJson.data);
    setSizes(itemJson.data.attributes.sizes);
  };

  const getItems = async () => {
    const items = await axios.get(URL + "/api/items?populate=image,sizes");
    const itemsJson = await items.data;
    setItems(itemsJson.data);
  };

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/*IMAGES */}
        {item?.attributes?.image?.data?.attributes?.formats?.medium?.url && (
          <Box flex="1 1 40%" mb="40px">
            <img
              alt={item?.name}
              width="100%"
              height="100%"
              src={item?.attributes?.image?.data?.attributes?.formats?.medium?.url}
              style={{ objectFit: "contain" }}
            />
          </Box>
        )}
        <Box flex="1 1 50%" mb="40px">
          <Typography variant="h3">{item?.attributes?.name}</Typography>
          <Typography>${item?.attributes?.price}</Typography>
          <Typography sx={{ mt: "20px" }}>
            {item?.attributes?.shortDescription}
          </Typography>
          <Box>
            <Typography variant="h6">Available Sizes:</Typography>
            <Box display="flex" gap="10px">
              {sizes.map((size) => (
                <Button
                  key={size.id}
                  variant={selectedSize === size.name ? 'contained' : 'outlined'}
                  onClick={() => setSelectedSize(size.name)}
                >
                  {size.name}
                </Button>
              ))}
            </Box>
          </Box>
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, size: selectedSize, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          {/* <Tab label="REVIEWS" value="reviews" /> */}
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item?.attributes?.longDescription}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          RELATED PRODUCTS
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;