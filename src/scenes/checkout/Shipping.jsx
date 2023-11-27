import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography, typography } from '@mui/material';
import AddressForm from './AddressForm.jsx';
import { shades } from '../../theme.js';



const Shipping = ({
    value,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue

}) => {
    return (
        <Box m={"30px auto"}>
            {/* BILLING FORM */}
            <Box>
                <Typography sx={{ mb: "15px" }} fontSize={"18px"}>Billing Information</Typography>

                <AddressForm
                    value={value}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                />
            </Box>

            <Box mb={"20px"}>
                <FormControlLabel
                    label="Same for Shipping Address"
                    control={<Checkbox
                        defaultChecked
                        value={value.shippingAddress.shippingSameAsBilling}
                        onChange={(e) => setFieldValue('shippingAddress.shippingSameAsBilling', !value.shippingAddress.shippingSameAsBilling)} />}
                />
            </Box>
            {/* SHIPPING FORM */}
            <Box>
                <Typography sx={{ mb: "15px" }} fontSize={"18px"}>Shipping Information</Typography>
                <AddressForm
                    value={value}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                />
            </Box>
        </Box>
    )
}



export default Shipping;