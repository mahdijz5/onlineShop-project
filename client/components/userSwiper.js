import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import { Autoplay ,EffectFade} from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const UserSwiper = () => {
	const [swiperImgs, setSwiperImgs] = useState([]);

	useEffect(() => {
		setSwiperImgs([
			"image1.jpg",
			"image2.jpg",
		]);
	}, []);

	return (
		<>
			<div   style={{
                position : 'relative',
                overflow: "hidden",
				height : "100%",
				width : "100%"
			}}>
			<Swiper
                // className={` ${styles.swiper}`}
				modules={[Autoplay,EffectFade]}
				slidesPerView={1} 
				effect="fade"
				centeredSlides={true}
				loop
				autoplay={{
					delay: 2500,
					disableOnInteraction: true,
				}}	
                style={{
                    overflow: "hidden !important",
					height : "100%",
					width :"1005"
                }}		
                >
				{swiperImgs
					? swiperImgs.map((img, index) => (
							<SwiperSlide
								key={index}
                                style={{
									width : "100%",
									height : "100%"
								}}
							>
								<Link href="#">
									<a>
										<Image src={"/images/" + img} layout="fill" priority  alt=""/>
									</a>
								</Link>
							</SwiperSlide>
					  ))
					: null}
			</Swiper>
			</div>
		</>
	);
};

export default UserSwiper;
