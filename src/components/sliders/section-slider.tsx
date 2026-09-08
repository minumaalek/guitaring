"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function SectionSlider({ children }) {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      spaceBetween={0}
      slidesPerView={1.6}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      onMouseEnter={(swiper) => swiper.autoplay.pause()}
      onMouseLeave={(swiper) => swiper.autoplay.resume()}
      className="h-60"
      breakpoints={{
        640: {
          slidesPerView: 2.2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 5,
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
