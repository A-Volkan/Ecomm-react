import React from 'react'
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from '../../theme';

// Fonction pour importer toutes les images depuis le dossier assets
const importAll = (r) => {
    const result = {};
    r.keys().forEach((item) => {
        const key = item.replace('./', '');
        result[key] = r(item);
    });
    return result;
};
// Import all images from the assets folder
export const heroTextureImports = importAll(
    require.context('../../assets', false, /\.(png|jpe?g|svg)$/)); //use require.context to import all images 

const MainCarousel = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    // Fonction pour rendre les flèches de navigation du carrousel
    const renderArrow = (onClickHandler, position) => (
        <IconButton
            onClick={onClickHandler}
            sx={{
                position: "absolute",
                top: "50%",
                [position]: "0",
                color: "white",
                padding: "5px",
                zIndex: 10,
            }}
        >
            {position === "left" ? (
                <NavigateBeforeIcon sx={{ fontSize: 40 }} />
            ) : (
                <NavigateNextIcon sx={{ fontSize: 40 }} />
            )}
        </IconButton>
    );

    // Fonction pour rendre chaque élément du carrousel
    const renderCarouselItem = (texture, index) => (
        <Box key={`carousel-image-${index}`}>
            <img
                src={texture}
                alt={`carousel-${index}`}
                style={{
                    width: "100%",
                    height: "700px",
                    objectFit: "cover",
                    backgroundAttachment: "fixed",
                }}
            />
            <Box
                color="white"
                padding="20px"
                borderRadius="1px"
                textAlign="left"
                backgroundColor="rgb(0, 0, 0, 0.4)"
                position={"absolute"}
                top={"46%"}
                left={isNonMobile ? "10%" : "0"}
                right={isNonMobile ? undefined : "0"}
                margin={isNonMobile ? undefined : "0 auto"}
                max-width={isNonMobile ? undefined : "240px"}
            >
                <Typography color={shades.secondary[200]}>--NEW ITEMS</Typography>
                <Typography variant="h1">Summer Sale</Typography>
                <Typography
                    fontWeight="bold"
                    color={shades.secondary[300]}
                    style={{ cursor: "pointer" }}
                    sx={{ textDecoration: "underline" }}
                >
                    Discover More
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Carousel
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                renderArrow(onClickHandler, "left")
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
                renderArrow(onClickHandler, "right")
            }
        >
            {Object.values(heroTextureImports).map(renderCarouselItem)}
        </Carousel>
    );
};

export default MainCarousel;