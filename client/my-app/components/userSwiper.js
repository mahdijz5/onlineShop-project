import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles  from "../styles/User.module.css"
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
			<div className="w-100 h-100" style={{
                position : 'relative',
                overflow: "hidden"
			}}>
			<Swiper
                className={`w-100 h-100 ${styles.swiper}`}
				modules={[Autoplay,EffectFade]}
				slidesPerView={1} 
				effect="fade"
				centeredSlides={true}
				loop
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}	
                style={{
                    overflow: "hidden !important",
                    position:"relative",
                    top : 0,
                    right : 0,
                    left : 0,
                    bottom : 0,
                }}		
                >
				{swiperImgs
					? swiperImgs.map((img, index) => (
							<SwiperSlide
								key={index}
                                className="w-100 h-100"
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
