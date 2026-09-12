"use client";

import { useState } from "react";

const MIN = 500;
const MAX = 4000;

export default function ProductPriceRange() {
  const [minPrice, setMinPrice] = useState(MIN);
  const [maxPrice, setMaxPrice] = useState(MAX);

  const minPercent = ((minPrice - MIN) / (MAX - MIN)) * 100;
  const maxPercent = ((maxPrice - MIN) / (MAX - MIN)) * 100;

  return (
    <div>
      <input type="range" />
    </div>
  );
}
