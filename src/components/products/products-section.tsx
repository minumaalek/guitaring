"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./product-card";
import { ArrowRight } from "lucide-react";

export default function ProductsSection({ products, title }) {
  return (
    <div className="min-w-0 w-full flex flex-col bg-blue-500/5 p-4 gap-2 rounded-4xl">
      <div className="flex items-center justify-between gap-2">
        <h2 className="whitespace-nowrap">{title}</h2>
        <hr className="w-full border-blue-400 rounded-full" />
        <button className="main-gradient flex items-center gap-2">
          <p className="whitespace-nowrap">More products</p>
          <ArrowRight className="size-5" />
        </button>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation
        // slidesOffsetBefore={20}
        // slidesOffsetAfter={20}
        // spaceBetween={0}
        className="min-w-0 w-full h-52 md:h-72 courses-swiper"
        slidesPerView="auto"

        // breakpoints={{
        //   400: {
        //     slidesPerView: 2.1,
        //   },
        //   640: {
        //     slidesPerView: 5,
        //   },
        //   1024: {
        //     slidesPerView: 3,
        //   },
        //   1280: {
        //     slidesPerView: 5,
        //   },
        // }}
      >
        {Array.isArray(products) &&
          products.map((product) => {
            return (
              <SwiperSlide
                key={product.id}
                className="!w-[120px] sm:!w-[200px] lg:!w-[220px]"
              >
                <ProductCard product={product} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
