// import { useState } from "react";
import "./card.scss";

export default function Card(props) {
  // const [wishList, setWishList] = useState(false);

  // eslint-disable-next-line react/prop-types
  const { mainImage, price, brand, name, altP, priceAfterDiscount } = props;
  return (
    <div
      className="card p-2"
    >
      <div className="imageCard w-full">
        <img src={mainImage} className="w-full h-auto" alt={altP} />
      </div>
      {/* <div
        className="addWishList"
        onClick={(e) => {
          e.stopPropagation();
          wishList ? setWishList(false) : setWishList(true);
        }}
        style={wishList ? { color: "#db2839" } : { color: "#a8a8a8" }}
      >
        <i className="fa-solid fa-heart" />
      </div> */}
      <div className="px-2">
        <h6 className="brandCard col-12 text-[#3b82f6]">{brand}</h6>
        <h4 className="productName col-12">
          {name.split(" ").splice(0, 3).join(" ")}
        </h4>
        <p className="cardPrice col-12">
          <span
            className={priceAfterDiscount ? "line-through text-red-500" : null}
          >
            {price}
          </span>
          <span className="ml-3">{priceAfterDiscount}</span>
        </p>
      </div>
    </div>
  );
}
