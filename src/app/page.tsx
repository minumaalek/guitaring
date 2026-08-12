import HomeProducts from "@/components/sections/home-products";
import NewArticlesSection from "@/components/sections/new-articles";
import HeroHeader from "@/components/modules/hero-header";
export default function Home() {
  return (
    <div className="">
      <header>
        <HeroHeader />
      </header>
      <div className="flex flex-col gap-4">
        <HomeProducts />
        <NewArticlesSection />
      </div>
    </div>
  );
}
