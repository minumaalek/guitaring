"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import CourseCard from "./course-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MoreButton from "../buttons/more-button";

export default function CoursesSection({ courses, title }) {
  return (
    <div className="min-w-0 w-full flex flex-col bg-blue-500/5 p-4 gap-2 rounded-4xl">
      <div className="flex items-center justify-between gap-2">
        <h2 className="whitespace-nowrap">{title}</h2>
        <hr className="w-full border-blue-400 rounded-full" />
        <MoreButton slug="courses" text="More courses" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 place-content-center">
        {Array.isArray(courses) &&
          courses.map((course) => {
            return <CourseCard course={course} />;
          })}
      </div>
      {/* <Swiper
        modules={[Navigation]}
        navigation
        // slidesOffsetBefore={40}
        // slidesOffsetAfter={40}
        // spaceBetween={0}
        slidesPerView="auto"
        className="courses-swiper min-w-0 w-full h-72"
        // breakpoints={{
        //   400: {
        //     slidesPerView: 1.3,
        //   },
        //   640: {
        //     slidesPerView: 2.2,
        //   },

        //   1024: {
        //     slidesPerView: 10,
        //   },
        //   1280: {
        //     slidesPerView: 4,
        //   },
        // }}
      >
        {Array.isArray(courses) &&
          courses.map((course) => {
            return (
              <SwiperSlide
                key={course.id}
                className="!w-[180px] sm:!w-[200px] lg:!w-[270px]"
              >
                <CourseCard course={course} />
              </SwiperSlide>
            );
          })}
      </Swiper> */}
    </div>
  );
}
