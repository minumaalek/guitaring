"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function SectionSlider({ children }) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={0}
      slidesPerView={1.6}
      className="h-60"
      breakpoints={{
        640: {
          slidesPerView: 2.2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      }}
    >
      {Array.isArray(children) &&
        children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
    </Swiper>
  );
}
