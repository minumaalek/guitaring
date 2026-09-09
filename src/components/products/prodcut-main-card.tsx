import Image from "next/image";
export default function ProductMainCard({ product }) {
  const {
    title,
    originalPrice,
    newPrice,
    slug,
    id,
    image,
    route,
    description,
  } = product;

  return (
    <div className="flex md:flex-col md:justify-center md:items-center w-full card gap-2 h-28 md:w-72 md:h-80">
      <div className=" size-24 md:size-64 rounded-2xl relative">
        <Image
          alt="guitar"
          src={image}
          fill
          className="object-cover absolute"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div>
          <span className="old-price">{originalPrice}</span>
          <span className="price">{newPrice}</span>
        </div>
      </div>
    </div>
  );
}
