import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const SuggestionSwiper = () => {
	const [swiperImgs, setSwiperImgs] = useState([]);

	useEffect(() => {
		setSwiperImgs([
			"swiperImg1.jpg",
			"swiperImg2.jpg",
			"swiperImg3.jpg",
			"swiperImg4.jpg",
		]);
	}, []);

	return (
		<>
			<div>
				<Swiper
					modules={[Navigation, Pagination, EffectFade,Autoplay]} // Autoplay,
					spaceBetween={0}
      				slidesPerView={2}
					navigation
					effect="fade"
					pagination={{
						clickable: true,
					}}
					centeredSlides={true}
					loop
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}			
					>
					{swiperImgs
						? swiperImgs.map((img, index) => (

							<SwiperSlide
								key={index}
								style={{
									objectFit: "cover",
									height: "330px",
								}}
							>
								<Link href="#">
									<a>
										<Image src={"/images/" + img} layout="fill"  alt="" />
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

export default SuggestionSwiper;
