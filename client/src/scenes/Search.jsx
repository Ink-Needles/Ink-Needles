import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Item from '../components/Item';
import { Box } from '@mui/material';

const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";

const Search = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchText = queryParams.get('text');
    const [items, setItems] = useState([]);
    // const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await axios.get(`${URL}/api/items?populate=image,sizes`);
                const itemsJson = await response.data;
                setItems(itemsJson.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        getItems();
    }, []);

    const filteredItems = items.filter(item => 
        item?.attributes?.name.toLowerCase().includes(searchText?.toLowerCase())
    );

    return (
        <Box width="80%" margin="80px auto">
            <h1>Search Results for "{searchText}"</h1>
            <Box
                mt="20px"
                display="flex"
                flexWrap="wrap"
                columnGap="1.33%"
                justifyContent="space-between"
            >
                {filteredItems.map((item, i) => (
                    <Item key={`${item.name}-${i}`} item={item} />
                ))}
            </Box>
        </Box>
    );
};

export default Search;