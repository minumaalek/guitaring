import Image from "next/image";
import Slider from "@/components/modules/slider";
import HomeProducts from "@/components/sections/home-products";
import NewArticlesSection from "@/components/sections/new-articles";
export default function Home() {
  return (
    <div className="">
      <header>header</header>
      <Image
        width={2000}
        height={1200}
        alt="guitar"
        src="/images/guitar.jpg"
      ></Image>
      <Slider />
      <HomeProducts />
      <NewArticlesSection />
      <div></div>
    </div>
  );
}
