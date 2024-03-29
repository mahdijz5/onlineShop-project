import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Image from "next/image";

import "swiper/css";
import { Navigation, EffectFade } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Box } from "@mui/material";

const ThumbnailSwipre = ({ height, width, thumbnail }) => {
	const [swiperImgs, setSwiperImgs] = useState([]);

	useEffect(() => {
		setSwiperImgs([...thumbnail]);
	}, []);

	return (
		<>
			<Box height={height} width={width} borderRadius={"5px"}>
				<Swiper
					modules={[Navigation, EffectFade]}
					slidesPerView={1}
					navigation
					effect="fade"
					centeredSlides={true}
					loop>
					{swiperImgs != undefined && swiperImgs.length > 0
						? swiperImgs.map((img, index) => (
							<SwiperSlide
								key={index}
								style={{
									objectFit: "cover",
									height: height,
									width: width,
									borderRadius: "10px",

								}}
							>
								<img src={`http://localhost:3001/uploads/thumbnail/${img}`} style={{ borderRadius: "10px", cursor: "unset", width: "100%", height: "100%",objectFit : "cover"  }} alt=""/>
							</SwiperSlide>
						))
						: null}
				</Swiper>
			</Box>
		</>
	);
};

export default ThumbnailSwipre