import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

import "swiper/css";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import ProductCard from "../Product/ProductCard"
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";


const StyledBox = styled(Box)(({theme}) => ({
        backgroundColor : theme.palette.danger.main,
        padding : "20px 15px"
}))

const OfferSwiper = ({products: allProducts}) => {
    const [products,setProducts] = useState([])
    useEffect(() => {
        setProducts(allProducts)
    },[])

    return (
        <>
            <StyledBox>
                <Typography variant="h4" color="white" my={1}>پیشنهاد های امروز</Typography>
                <Swiper
                    modules={[Navigation, Pagination, EffectFade]}
                    navigation
                    spaceBetween={2}
                    slidesPerView="auto"
                    // centeredSlides={true}
                    loop={false}
                    
                >
                    {products.map((product, index) => (
                        <SwiperSlide
                            key={index}
                            style={{
                                width : "auto",
                            }}
                        >
                            <ProductCard height={"370px"} product={product}/>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </StyledBox>
        </>
    )
}

export default OfferSwiper

