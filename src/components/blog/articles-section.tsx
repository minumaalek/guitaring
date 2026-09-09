"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { ArrowRight } from "lucide-react";

import ArticleCard from "./article-card";
import Link from "next/link";
import MoreButton from "../buttons/more-button";

export default function ArticlesSection({ articles, title }) {
  return (
    <div className="min-w-0 w-full flex flex-col bg-blue-500/5 gap-2 rounded-4xl">
      <div className="flex items-center justify-between gap-2">
        <h2 className="whitespace-nowrap">{title}</h2>

        <hr className="w-full border-blue-400 rounded-full" />
        <MoreButton slug="blog" text="More articles" />
      </div>
      <Swiper
        modules={[Navigation]}
        navigation
        className="min-w-0 w-full h-52 md:h-72 courses-swiper"
        slidesPerView="auto"
      >
        {Array.isArray(articles) &&
          articles.map((article) => {
            return (
              <SwiperSlide
                key={article.id}
                className="!w-[220px] sm:!w-[200px] lg:!w-[280px]"
              >
                <ArticleCard article={article} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
