import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { IconButton, Typography, Box, Button, Tabs, Tab } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { shades } from '../../theme'
import { addToCart } from '../../state';
import { useParams } from 'react-router-dom';
import Item from '../../components/Item';





const ItemDetails = () => {
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const [value, setValue] = useState('description');
    const [count, setCount] = useState(1);
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);

    // Fonction pour changer l'onglet sélectionné
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    // Fonction pour récupérer un seul élément (${itemId})
    async function getItem() {
        const item = await fetch(`http://localhost:1337/api/items/${itemId}?populate=image`);
        const itemJson = await item.json();
        setItem(itemJson.data);
    }

    // Fonction pour récupérer plusieurs éléments
    async function getItems() {
        const items = await fetch('http://localhost:1337/api/items?populate=image');
        const itemsJson = await items.json();
        setItems(itemsJson.data);
    }

    //  appeler les fonctions getItem et getItems lors du rendu initial
    useEffect(() => {
        getItem();
        getItems();
    },);

    return (
        <Box
            width="80%" m={"80px auto"}>
            <Box display={"flex"} flexWrap={"wrap"} columnGap={"40px"} >
                {/* IMAGES */}
                <Box flex="1 1 40%" mb={"40px"}>
                    <img
                        alt={item?.name}
                        width={"100%"}
                        height={"100%"}
                        src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                        style={{ objectFit: "contain" }}
                    />
                </Box>
                <Box flex="1 1 50%" mb={"40px"}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Box>Home/Item</Box>
                        <Box>Prev Next</Box>
                    </Box>
                    <Box m="65px 0 25px 0">
                        <Typography variant="h3">{item?.attributes?.name}</Typography>
                        <Typography>${item?.attributes?.price}</Typography>
                        <Typography sx={{ mt: "20px" }}>
                            {item?.attributes?.longDescription}
                        </Typography>

                    </Box>
                    {/* COUNT AND BUTTON */}
                    <Box display={"flex"} alignItems={"center"} minHeight={"50px"}>
                        <Box display={"flex"} alignItems={"center"} border={`1px solid ${shades.neutral[300]}`} mr="20px" p={"2px 5px"}>
                            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                            <IconButton onClick={() => setCount(count + 1)}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button
                            sx={{ backgroundColor: "#222222", color: "white", borderRadius: 0, minWidth: "150px", padding: "10px 40px" }}
                            onClick={() => dispatch(addToCart({ item: { ...item, count } }))}>
                            ADD TO CART</Button>
                    </Box>

                    <Box>
                        <Box m={"20px 0 5px 0"}
                            display={"flex"}>
                            <FavoriteBorderOutlinedIcon />
                            <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
                        </Box>
                        <Typography>CATEGORIES : {item?.attributes?.category} </Typography>

                    </Box>
                </Box>
            </Box>

            {/* INFORMATION */}

            <Box m={"20px 0"}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="DESCRIPTION" value="description" />
                    <Tab label="REVIEWS" value="reviews" />
                </Tabs>

            </Box>
            <Box display={"flex"} flexWrap={"wrap"} gap={"15px"}>

                {value === "description" && (
                    <div>{item?.attributes?.longDescription}</div>
                )}
                {value === "reviews" && (
                    <div>reviews</div>
                )}
            </Box>
            {/* RELATED ITEMS */}
            <Box mt={"50px"} width={"100%"}>
                <Typography variant={"h3"}>Related Products</Typography>
                <Box mt={"20px"}
                    display={"flex"} flexWrap={"wrap"} justifyContent={"space-between"}
                    columnGap={"1.33%"}>

                    {items.slice(0, 4).map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`} />
                    ))}
                </Box>

            </Box>
        </Box>
    )
}

export default ItemDetails;