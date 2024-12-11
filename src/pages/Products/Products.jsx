// import { useEffect, useState } from "react";
import "./Products.scss";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import CategoriesSlide from "../../components/CategoriesSlider/CategoriesSlider";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { useState } from "react";
import Pagenation from "../../components/Pagenation/Pagenation";
import { lazy } from "react";
import ImgLoader from "../../components/ImgLoader/ImgLoader";

const CardImg = lazy(() => import("../../components/CardImg/CardImg"));

// import HomeSlider from "../../components/HomeSlider/HomeSlider";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const nItems = 10;
  const lastIndex = currentPage * nItems;
  const firstIndex = lastIndex - nItems;

  // const pageProducts =

  // const [wishList, setWishList] = useState(false);

  // const [allProducts, setAllProduct] = useState(null);

  // const getAllProducts = async () => {
  //   const { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );

  //   setAllProduct(data.data);
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  const { addToCart } = useContext(cartContext);

  async function handleAddToCart(id) {
    const res = await addToCart(id);

    if (res) {
      toast.success("Product added to cart", {
        position: "bottom-right",
        duration: 3000,
      });
    } else {
      toast.error("Something is wrong", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  const getAllProducts = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: "allProducts",
    queryFn: getAllProducts,

    // refetchOnMount:true(always) or false => about calling API while rerendaring the page
    // refetchInterval: 1000 * 60 (Each min) => about the time of auto fetching of API (time between each fetching) to get the updates on DB
    // refetchOnWindowFocus:true => means that each time i click or focus on the window of the padge API will be refetched (if true) and it due to if i opened the app on another tap without usieng it and return to it the API will be fetched again(switching between taps)
    // staleTime: 5000 => is using with refetchOnWindowFocus and means that after hw much time the data woll be expired and must refetch while switching taps
    // retry: 5 => The number of retrying to call the API (if there is an error while calling API) => The default is 3 times
    // retryDelay: 1000 * 60 (a min) => The time between each retrying too fetch data (to make sure server will not down)
    // cacheTime: 5000 => control the time of saving data on cache memory (after 5sec cache data will be deleted if iam out of the page)(dafault is 5min)
    // placeholderData: keepPreviousData (or any function) => this properity is using to handle error while calling an API (like pagenation)
    // enabled : false => its stop refetchOnMount if i dont need it (R.4.21) as a reference

    //"you need to review Route caurse section num (4) video num (20)"
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div> {error.message} </div>;
  }

  const itemsPerPage = data.data.data.slice(firstIndex, lastIndex);

  return (
    <>
      <div className="p-8 w-full">
        <CategoriesSlide />
        <div className=" grid grid-cols-2  md:grid-cols-3 gap-3 lg:grid-cols-5 pt-3 md:pt-5 lg:pt-5">
          {itemsPerPage.map((product) => {
            return (
              <div key={product._id} className="relative">
                <div
                  className="w-[12%] absolute z-10 h-auto top-1 right-1 md:right-1.5 md:top-2 lg:top-3 lg:right-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product._id);
                    // wishList ? setWishList(false) : setWishList(true);
                  }}
                  // style={wishList ? { color: "#db2839" } : { color: "#a8a8a8" }}
                >
                  <i className="fa-solid fa-heart text-[15px] md:text-[20px] lg:text-[25px] text-[#a8a8a8]" />
                </div>

                <Link to={`product-details/${product._id}`}>
                  <div className="card pb-2 ">
                    <React.Suspense
                      fallback={
                        <ImgLoader
                          style={"w-full h-[204px] md:h-[307px] lg:h-[382px] "}
                        />
                      }
                    >
                      <CardImg src={product.imageCover} alt={product.title} />
                    </React.Suspense>

                    <div className="px-2  w-full text-[9px] md:text-[13px] lg:text-[17px]">
                      <h6 className="brandCard col-12 text-[#3b82f6] text-[7px] md:text-[12px] lg:text-[15px]">
                        {product.brand.name}
                      </h6>
                      <h4 className="productName">
                        {product.title.split(" ").splice(0, 3).join(" ")}
                      </h4>
                      <p className="cardPrice text-[8px] md:text-[12px] lg:text-[17px] flex-nowrap w-full">
                        <span
                          className={
                            product.priceAfterDiscount
                              ? "line-through text-gray-400"
                              : null
                          }
                        >
                          {product.price} EGP
                        </span>
                        <span className="ml-[3%] w-full">
                          {product.priceAfterDiscount}{" "}
                          {product.priceAfterDiscount ? "EGP" : null}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* <Card
                    key={product._id}
                    mainImage={product.imageCover} 
                    price={product.price}
                    priceAfterDiscount={product.priceAfterDiscount}
                    brand={product.category.name}
                    name={product.title}
                    altP={product.title}
                  /> */}
                </Link>
              </div>
            );
          })}
        </div>

        <Pagenation
          nItems={nItems}
          totalItems={data.data.data.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
