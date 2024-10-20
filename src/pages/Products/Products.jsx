// import { useEffect, useState } from "react";
import "./Products.scss";
import axios from "axios";
// import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import CategoriesSlide from "../../components/CategoriesSlider/CategoriesSlider";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
// import { useState } from "react";
// import HomeSlider from "../../components/HomeSlider/HomeSlider";

export default function Products() {
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

  return (
    <>
      <div className="p-8">
        {/* <HomeSlider /> */}
        <CategoriesSlide />
        <div className=" grid md:grid-cols-3 gap-3 lg:grid-cols-5 pt-10">
          {data.data.data.map((product) => {
            return (
              <div key={product._id} className="relative">
                <div
                  className="w-[12%] absolute z-10 h-auto top-3 right-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product._id);
                    // wishList ? setWishList(false) : setWishList(true);
                  }}
                  // style={wishList ? { color: "#db2839" } : { color: "#a8a8a8" }}
                >
                  <i className="fa-solid fa-heart text-[25px] text-[#a8a8a8]" />
                </div>

                <Link to={`product-details/${product._id}`}>
                  <div className="card pb-2">
                    <div className="imageCard w-full">
                      <img
                        src={product.imageCover}
                        className="w-full h-auto"
                        alt={product.title}
                      />
                    </div>

                    <div className="px-2">
                      <h6 className="brandCard col-12 text-[#3b82f6]">
                        {product.brand.name}
                      </h6>
                      <h4 className="productName col-12">
                        {product.title.split(" ").splice(0, 3).join(" ")}
                      </h4>
                      <p className="cardPrice col-12">
                        <span
                          className={
                            product.priceAfterDiscount
                              ? "line-through text-red-500"
                              : null
                          }
                        >
                          {product.price}
                        </span>
                        <span className="ml-3">
                          {product.priceAfterDiscount}
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
      </div>
    </>
    // <>
    //   {allProducts ? (
    //     <div className="p-8">
    //       {/* <HomeSlider /> */}
    //       <CategoriesSlide />
    //       <div className=" grid md:grid-cols-3 gap-3 lg:grid-cols-5 pt-10">
    //         {allProducts.map((product) => {
    //           return (
    //             <Card
    //               key={product._id}
    //               mainImage={product.imageCover}
    //               price={product.price}
    //               priceAfterDiscount={product.priceAfterDiscount}
    //               brand={product.category.name}
    //               name={product.title}
    //               altP={product.title}
    //             />
    //           );
    //         })}
    //       </div>
    //     </div>
    //   ) : (
    //     <Loader />
    //   )}
    // </>
  );
}
