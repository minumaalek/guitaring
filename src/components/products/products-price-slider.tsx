"use client";

import { useState } from "react";

const MIN = 500;
const MAX = 4000;

export default function ProductPriceRange() {
  const [minPrice, setMinPrice] = useState(MIN);
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [price, setPrice] = useState(500);

  const minPercent = ((minPrice - MIN) / (MAX - MIN)) * 100;
  const maxPercent = ((maxPrice - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <input
          className="w-3/4"
          min={MIN}
          max={MAX}
          type="range"
          onChange={(e) => setPrice(e.target.value)}
        />
        <span className="w-1/4 text-center">{price}</span>
      </div>
    </div>
  );
}
