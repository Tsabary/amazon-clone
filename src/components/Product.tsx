import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../app/slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ product }: { product: any }) {
  const { title, price, description, category, image } = product;

  const dispatch = useDispatch();

  const [rating, setRating] = useState(1);

  const [hasPrime, setHasPrime] = useState(true);

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setHasPrime(Math.random() < 0.5);
  }, []);

  const addItemToBasket = () => {
    dispatch(addToBasket({ ...product, rating, hasPrime }));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        src={image}
        height={200}
        width={200}
        style={{ objectFit: "contain" }}
        alt={title + "Image"}
      />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill({})
          .map((_, i) => {
            return <StarIcon key={i} className="h-5 text-yellow-500" />;
          })}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">{price}$</div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src="https://links.papareact.com/fdw"
            alt="Prime Logo"
          />
          <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>
        </div>
      )}

      <button className="mt-auto button" onClick={addItemToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
