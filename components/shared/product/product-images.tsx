"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface PropTypes {
  images: string[];
}

const ProductImages = ({ images }: PropTypes) => {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      <Image
        src={images[current]}
        alt="product image"
        width={1000}
        height={1000}
        className="min-h-[300px]u object-cover object-center"
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            onClick={() => {
              setCurrent(index);
            }}
            key={image}
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600",
              current === index && "border-orange-500"
            )}
          >
            <Image
              src={image}
              alt="another image of product"
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
