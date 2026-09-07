import HeroHeader from "@/components/modules/hero-header";
import HomeSections from "@/components/sections/home-sections";
export default function Home() {
  return (
    <div className="">
      <header>
        <HeroHeader />
      </header>
      <div className="flex flex-col gap-4">
        <HomeSections />
      </div>
    </div>
  );
}
