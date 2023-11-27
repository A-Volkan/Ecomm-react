import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import TextField from '@mui/material/TextField'
import { getIn } from 'formik'

const AddressForm = ({
    value,
    errors,
    touched,
    handleBlur,
    handleChange,
}) => {
    const isNonMobile = useMediaQuery('(min-width:600px)');

    // // Fonction pour formater le nom d'un champ
    // eslint-disable-next-line no-undef
    const formattedName = (field) => `${type}.${field}`;

    // Fonction pour vérifier si un champ a une erreur en fonction de s'il a été touché et s'il y a une erreur dans l'objet errors de Formik
    const formattedError = (field) =>
        Boolean(
            getIn(touched, formattedName(field)) &&
            getIn(errors, formattedName(field))
        );

    //pour obtenir le texte d'aide d'un champ en fonction de s'il a été touché et s'il y a une erreur dans l'objet errors de Formik
    const formattedHelper = (field) =>
        getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

    return (
        <Box
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
        >
            {/* Champs de saisie pour le prénom */}
            <TextField
                fullWidth
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={value.firstName}
                name={formattedName("firstName")}
                error={formattedError("firstName")}
                helperText={formattedHelper("firstName")}
                sx={{ gridColumn: "span 2" }}
            />
            {/* Champs de saisie pour le nom de famille */}
            <TextField
                fullWidth
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={value.lastName}
                name={formattedName("lastName")}
                error={formattedError("lastName")}
                helperText={formattedHelper("lastName")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                type="text"
                label="Country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={value.country}
                name={formattedName("country")}
                error={formattedError("country")}
                helperText={formattedHelper("country")}
                sx={{ gridColumn: "span 4" }}
            />
            <TextField
                fullWidth
                type="text"
                label="Street Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={value.street1}
                name={formattedName("street1")}
                error={formattedError("street1")}
                helperText={formattedHelper("street1")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                type="text"
                label="Street Address 2 (optional)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={value.street2}
                name={formattedName("street2")}
                error={formattedError("street2")}
                helperText={formattedHelper("street2")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={value.city}
                name={formattedName("city")}
                error={formattedError("city")}
                helperText={formattedHelper("city")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                type="text"
                label="State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={value.state}
                name={formattedName("state")}
                error={formattedError("state")}
                helperText={formattedHelper("state")}
                sx={{ gridColumn: "1fr" }}
            />
            <TextField
                fullWidth
                type="text"
                label="Zip Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={value.zipCode}
                name={formattedName("zipCode")}
                error={formattedError("zipCode")}
                helperText={formattedHelper("zipCode")}
                sx={{ gridColumn: "1fr" }}
            />
        </Box>
    );
};

export default AddressForm