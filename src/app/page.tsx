import Image from "next/image";

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
    </div>
  );
}
