import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import "swiper/css";
import { Navigation, Pagination, EffectFade } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import ProductCard from "../Product/ProductCard"
import { Box } from "@mui/material";
import DviderTitle from "../ui/DviderTitle";


const RelatedSwiper = ({ products }) => {
 
    return (
        <>
            <Box>
                <DviderTitle title="محصولات مشابه" my={'20px'} />
                <Swiper
                    modules={[Navigation, Pagination, EffectFade]}
                    navigation
                    spaceBetween={2}
                    slidesPerView="auto"
                    loop={false}

                >
                    {products != undefined ? products.map((product, index) => (
                        <SwiperSlide
                            key={index}
                            style={{
                                width: "auto",
                            }}
                        >
                            <ProductCard height={"370px"} product={product}/>
                        </SwiperSlide>
                    )) : null}

                </Swiper>
            </Box>
        </>
    )
}



export default RelatedSwiper