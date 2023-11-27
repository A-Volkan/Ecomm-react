import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../state';
import { Box, Tab, Typography, Tabs, useMediaQuery } from '@mui/material';
import Item from '../../components/Item';


const ShopingList = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);
    const [value, setValue] = useState("all");
    const isNonMobile = useMediaQuery("(min-width:600px)");
    console.log("items", items);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Fonction pour récupérer les articles depuis le serveur
    async function getItems() {
        const items = await fetch("http://localhost:1337/api/items?populate=image", {
            method: "GET",
        });
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
    }

    useEffect(() => {
        getItems();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps 

    // Filtrage des articles en fonction de la catégorie
    const topRatedItems = items.filter(
        (item) => item.attributes.category === "topRated"
    );
    const newArrivalsItems = items.filter(
        (item) => item.attributes.category === "newArrivals"
    );
    const bestSellersItems = items.filter(
        (item) => item.attributes.category === "bestSellers"
    );

    return (
        <Box width="80%" margin="80px auto">
            <Typography variant="h3" textAlign="center"> Our Featured <b>Products</b></Typography>
            {/* Onglets pour filtrer les articles par catégorie */}
            <Tabs
                textColor='primary'
                indicatorColor='primary'
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
                sx={{ m: "25px", "& . MuiTabs-flexContainer": { flexWrap: "wrap" } }} //to make the tabs responsive to the screen size {flexWrap: "wrap"} }}
            >
                <Tab label="ALL" value="all" />
                <Tab label="NEW ARRIVALS" value="newArrivals" />
                <Tab label="BEST SELLERS" value="bestSellers" />
                <Tab label="TOP RATED" value="topRated" />
            </Tabs>
            {/* Grille pour afficher les articles en fonction de la catégorie sélectionnée */}
            <Box margin="0 auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 300px)"
                justifyContent="space-around"
                rowGap="20px" columnGap="1.33%" >
                {value === "all" && items.map((item) => <Item item={item} key={`${item.name}-${item.id}`} />)}
                {value === "newArrivals" && newArrivalsItems.map((item) => <Item item={item} key={`${item.name}-${item.id}`} />)}
                {value === "bestSellers" && bestSellersItems.map((item) => <Item item={item} key={`${item.name}-${item.id}`} />)}
                {value === "topRated" && topRatedItems.map((item) => <Item item={item} key={`${item.name}-${item.id}`} />)}

            </Box>
        </Box>
    )
}

export default ShopingList;