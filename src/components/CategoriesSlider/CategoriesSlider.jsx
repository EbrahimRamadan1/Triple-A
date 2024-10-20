import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useQuery } from "react-query";
import useAllCategories from "../../customHooks/useAllCategories";
import Loader2 from "../Loader2/Loader2";

export default function CategoriesSlide() {
  // const [allCategories, setAllCategories] = useState(null);
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 10,
    slidesToScroll: 5,
    arrow: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // const getAllCategories = async () => {
  //   axios
  //     .get("https://ecommerce.routemisr.com/api/v1/categories")
  //     .then((res) => {
  //       setAllCategories(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   getAllCategories();
  // }, []);

  //==> Replacing by using custom hooks to not duplicate the code (used on Categories Page) <==

  // const getAllCategories = () => {
  //   return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  // };

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: "allCategories",
  //   queryFn: getAllCategories,
  // });

  const { data, isError, isLoading, error } = useAllCategories();

  if (isLoading) {
    return <Loader2 />;
  }

  if (isError) {
    return <div> {error.message}</div>;
  }

  return (
    <>
      <Slider {...settings}>
        {data.data.data.map((el) => (
          <div key={el._id}>
            <img className=" h-36 w-full " src={el.image} alt={el.name} />
            <h6 className="text-center">{el.name}</h6>
          </div>
        ))}
      </Slider>

      {/* {allCategories ? (
        <Slider {...settings}>
          {allCategories.map((el) => (
            <div key={el._id}>
              <img className=" h-36 w-full " src={el.image} alt={el.name} />
              <h6 className="text-center">{el.name}</h6>
            </div>
          ))}
        </Slider>
      ) : (
        <Loader />
      )} */}
    </>
  );
}
