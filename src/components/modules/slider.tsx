"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Slider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar]}
      spaceBetween={20}
      slidesPerView={1}
      speed={500}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      <SwiperSlide>
        <div className="h-64 bg-red-500 flex items-center justify-center">
          Slide 1
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="h-64 bg-blue-500 flex items-center justify-center">
          Slide 2
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="h-64 bg-green-500 flex items-center justify-center">
          Slide 3
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
