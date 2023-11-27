import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, IconButton } from '@mui/material';
import { PersonOutlined, ShoppingCartOutlined, MenuOutlined, SearchOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { shades } from '../../theme';
import { setIsCartOpen } from '../../state';


const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);


    return (
        <Box
            display="flex"
            alignContent="center"
            width="100%"
            height="60px"
            backgroundColor="rgba(255, 255, 255, 0.95)"
            color="black"
            position="fixed"
            top="0"
            left="0"
            zIndex="1"
            sx={{
                boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
            }}
        >
            <Box
                width="80%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                alignContent="center"
            >
                <Box
                    onClick={() => navigate("/")}
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                    color={shades.secondary[500]}
                >
                    Ecommerce
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    columnGap="20px"
                    zIndex="2">
                    <IconButton sx={{ color: "black" }}>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton sx={{ color: "black" }}>
                        <PersonOutlined />
                    </IconButton>
                    <Badge
                        badgeContent={cart.length} color="secondary" invisible={cart.length === 0} sx={{ "& .MuiBadge-badge": { right: 5, top: 5, padding: "0px", height: "14px", minWidth: "13px" } }}>
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))}
                            sx={{ color: "black" }}>
                            <ShoppingCartOutlined />
                        </IconButton>
                    </Badge>
                    <IconButton sx={{ color: "black" }}>
                        <MenuOutlined />
                    </IconButton>

                </Box>
            </Box>
        </Box>
    )
}

export default Navbar;