import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import "swiper/css";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import ProductCard from "../Product/ProductCard"
import DviderTitle from "../ui/DviderTitle";
import { Box, Stack, Typography } from "@mui/material";


const LatestSwiper = ({products: allProducts}) => {
    const [products,setProducts] = useState([])
    useEffect(() => {
        setProducts(allProducts)
    },[])

    return (
        <>
            <Box>
                <DviderTitle title="تازه ترین ها" my={'20px'}/>
                <Swiper 
                    modules={[Navigation, Pagination, EffectFade]}
                    navigation
                    spaceBetween={2}
                    slidesPerView="auto"
                    loop={false}

                >
                    {products.map((product, index) => (
                        <SwiperSlide
                            key={index}
                            style={{
                                width: "auto",
                            }}
                        >
                            <ProductCard product={product}/>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </Box>
        </>
    )
}



export default LatestSwiper