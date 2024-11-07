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
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box mt="20px">
            <Typography variant="h6">Available Sizes:</Typography>
            {sizes.map((size) => (
              <Typography key={size.id}>{size.name}</Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;