import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useQuery } from '@tanstack/react-query';

import "swiper/css";
import "swiper/css/pagination";
import CategoryCard from "./CategoryCard/CategoryCard";

const CategoriesSlider = () => {

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('https://carx-delta.vercel.app/categories')
            .then(res => res.json())
    })

    return (
        <div className="my-12 px-10">
            <h1 className="text-4xl font-bold text-center mb-5">Choose Category</h1>
            <Swiper
                breakpoints={{
                    640: {
                        width: 640,
                        slidesPerView: 1,
                    },
                    768: {
                        width: 768,
                        slidesPerView: 2,
                    },
                    1080: {
                        width: 1080,
                        slidesPerView: 3,
                    }
                }}
                centeredSlides={false}
                spaceBetween={30}
                grabCursor={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {
                    isLoading === false ?
                        categories.map(category => <SwiperSlide key={category._id}><CategoryCard category={category}></CategoryCard></SwiperSlide>)
                        : <></>
                }
            </Swiper>
        </div>
    );
}

export default CategoriesSlider