import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { shades } from '../../theme';
import Shipping from './Shipping.jsx';
import Payment from './Payment.jsx';
import { loadStripe } from "@stripe/stripe-js";

// Configuration de la clé Stripe
const stripePromise = loadStripe("pk_test_51NUVqZG8ecNI2sw9Etd4YFKfYoEyeYhwB9B2tDLghxJNveSf3mskT0towatb2OsS8sRY8WBS1lfnZSdAoi7CF8WC00okiWETp1")


// Initialisation des valeurs du formulaire
const initialValues = {
    billingAddress: {
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
    },
    shippingAddress: {
        shippingSameAsBilling: true,
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
    },
    email: '',
    phoneNumber: '',
};

// Schéma de validation du formulaire de paiement
const checkoutSchema = yup.object().shape({
    billingAddress: yup.object().shape({
        street: yup.string().required('required'),
        city: yup.string().required('required'),
        state: yup.string().required('required'),
        country: yup.string().required('required'),
        zipCode: yup.string().required('required'),
    }),
    shippingAddress: yup.object().shape({
        shippingSameAsBilling: yup.boolean(),
        street: yup.string().when("shippingSameAsBilling", {
            is: false,
            then: yup.string().required('required'),
            otherwise: yup.string(),
        }),
        city: yup.string().when("shippingSameAsBilling", {
            is: false,
            then: yup.string().required('required'),
            otherwise: yup.string(),
        }),
        state: yup.string().when("shippingSameAsBilling", {
            is: false,
            then: yup.string().required('required'),
            otherwise: yup.string(),
        }),
        country: yup.string().when("shippingSameAsBilling", {
            is: false,
            then: yup.string().required('required'),
            otherwise: yup.string(),
        }),
        zipCode: yup.string().when("shippingSameAsBilling", {
            is: false,
            then: yup.string().required('required'),
            otherwise: yup.string(),
        }),
    }),
    email: yup.string().email('invalid email').required('required'),
    phoneNumber: yup.string().required('required'),
});


const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0); // Utilisation du hook useState pour gérer l'étape active du formulaire
    const cart = useSelector((state) => state.cart);
    // Vérification de la première et deuxième étape du formulaire
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;

    // Gestion de la soumission du formulaire Formik
    const handleFormikSubmit = async (value, actions) => {
        setActiveStep(activeStep + 1);
        if (isFirstStep && value.shippingAddress.shippingSameAsBilling) {
            actions.setFieldValue("shippingAddress", {
                ...value.billingAddress,
                shippingSameAsBilling: true,
            });
        }
        if (isSecondStep) {
            makePayment(value);
        }
        actions.setTouched({});
    };

    // Fonction pour effectuer le paiement avec Stripe
    async function makePayment(values) {
        const stripe = await stripePromise;
        const requestBody = {
            userName: values.email,
            products: cart.items ? cart.items.map((item) => ({
                id: item._id,
                name: item.name,
                price: item.price,
                description: item.description,
                quantity: item.quantity,
            })) : [],
        };


        // Appel à l'API pour créer une session de paiement avec Stripe
        const response = await fetch('http://localhost:1337/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        const session = await response.json();
        // Redirection vers le formulaire de paiement de Stripe
        await stripe.redirectToCheckout({ sessionId: session.id });
    }


    return (
        <Box width={'80%'} m={"100px auto"}>
            {/*  étapes du formulaire */}
            <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
                <Step>
                    <StepLabel>Billing</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>
            <Box>
                {/* Utilisation du composant Formik pour gérer le formulaire */}
                <Formik
                    onSubmit={handleFormikSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {isFirstStep && (
                                // Composant Shipping pour la première étape du formulaire
                                <Shipping
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}
                            {isSecondStep && (
                                // Composant Payment pour la deuxième étape du formulaire
                                <Payment
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}
                            {/* Boutons de navigation entre les étapes du formulaire */}
                            <Box display="flex" justifyContent="space-between" gap={"50px"}>
                                {isSecondStep && (
                                    <Button
                                        fullWidth color='primary' variant='contained' sx={{ backgroundColor: shades.primary[200], boxShadow: "none", color: "white", borderRadius: "0", padding: "15px 40px" }}
                                        onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
                                )}
                                <Button
                                    fullWidth type='submit' color='primary' variant='contained' sx={{ backgroundColor: shades.primary[400], boxShadow: "none", color: "white", borderRadius: "0", padding: "15px 40px" }}
                                    onClick={() => setActiveStep(activeStep + 1)}>{isFirstStep ? "Next" : "Place Order"}</Button>



                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>

        </Box>
    )
}

export default Checkout;