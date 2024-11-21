import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, Select } from "@mui/material";
// import { Box, IconButton, Typography, Button, Select, MenuItem } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  const { price, name, image } = item.attributes;
  const imageUrl =
    image?.data?.attributes?.formats?.medium?.url ||
    image?.data?.attributes?.formats?.small?.url || 
    image?.data?.attributes?.formats?.thumbnail?.url ||
    "";

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    dispatch(addToCart({ item: { ...item, count, size: selectedSize } }));
  };

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {imageUrl && 
        <img
          alt={item.name}
          width="300px"
          height="400px"
          src={imageUrl}
          onClick={() => {
            navigate(`/item/${item.id}`);
          }}
          style={{ cursor: "pointer" }}
        />
        }
      </Box>
      <Box mt="3px">
        {/* <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography> */}
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;