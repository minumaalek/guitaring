"use client";
import Image from "next/image";
import BlurText from "../animations/header-text";
import Slider from "../sliders/hero-slider";
export default function HeroHeader() {
  return (
    <div className="relative">
      <div className=" absolute z-30 w-full  flex items-start justify-center">
        <h1>
          <BlurText
            text="Guitar your dreams"
            delay={1000}
            animateBy="words"
            direction="top"
            //   onAnimationComplete={handleAnimationComplete}
            className="text-4xl md:text-5xl mb-8 text-white font-extrabold"
          />
        </h1>
      </div>
      <div className="rounded-2xl overflow-hidden">
        <Slider />
      </div>
    </div>
  );
}
