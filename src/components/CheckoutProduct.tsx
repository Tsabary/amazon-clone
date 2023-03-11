import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../app/slices/basketSlice";

function CheckoutProduct({ product }: { product: any }) {
  const { title, rating, price, description, category, image, hasPrime } =
    product;

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket(product.id));
  };

  return (
    <div className="grid grid-cols-5">
      <Image
        src={image}
        height={200}
        width={200}
        style={{ objectFit: "contain" }}
        alt="Product Image"
      />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill({})
            .map((v, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <p>{price}$</p>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt="Prime logo"
            />
            <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>
          </div>
        )}
      </div>

      {/* Add and Remove buttons */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button mt-auto" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button mt-auto" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
