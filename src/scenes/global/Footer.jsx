import React from 'react';
import { useTheme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { shades } from '../../theme';





const Footer = () => {
    const { palette: { neutral } } = useTheme(); // get color from theme




    return (
        <Box mt={'70px'} px={'40px'} pt={'40px'} bgcolor={neutral.light}>
            <Box
                width={'80%'}
                margin={'auto'}
                display={'flex'}
                justifyContent={'space-between'}
                flexWrap={'wrap'}
                rowGap={'30px'}
                columnGap={"clamp(20px, 30px, 40px)"}>

                <Box width={'clamp(20%, 30%, 40%)'}>
                    <Typography variant='h4' fontWeight={'bold'} mb={"30px"} color={shades.secondary[500]}>ECOMMERCE</Typography>
                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua,
                        ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat,
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur,
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </Box>
                <Box>
                    <Typography variant='h4' fontWeight={'bold'} mb={"30px"}>
                        About Us
                    </Typography>
                    <Typography mb={"30px"}>Careers</Typography>
                    <Typography mb={"30px"}>Our Stores</Typography>
                    <Typography mb={"30px"}>Terms & Conditions</Typography>
                    <Typography mb={"30px"}>Privacy Policy</Typography>
                </Box>
                <Box>
                    <Typography variant='h4' fontWeight={'bold'} mb={"30px"}>
                        Customer Care
                    </Typography>
                    <Typography mb={"30px"}>Help Center</Typography>
                    <Typography mb={"30px"}>Track Your Order</Typography>
                    <Typography mb={"30px"}>Corporate & Bulk Purchasing</Typography>
                    <Typography mb={"30px"}>Returns & Refunds</Typography>
                </Box>

                <Box width={'clamp(20%, 25%, 30%)'}>

                    <Typography variant='h4' fontWeight={'bold'} mb={"30px"} color={shades.secondary[500]}>
                        Contact Us</Typography>
                    <Typography mb={"15px"}>Ecommerce Inc.</Typography>
                    <Typography mb={"15px"}>Email: Ecomm@example.com</Typography>
                    <Typography mb={"15px"}>1234 Street Name</Typography>
                    <Typography mb={"15px"}>City, Country</Typography>
                    <Typography mb={"15px"}>(123) 456-7890</Typography>

                </Box>

            </Box>
        </Box>
    )
}

export default Footer;