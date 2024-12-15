import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";

export default function Brands() {
  const getAllBrands = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: "AllBrands",
    queryFn: getAllBrands,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8 w-full">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 lg:gap-5">
        {data.data.data.map((brand) => {
          return (
            <div className="brand rounded-xl bg-[#fff] pb-3" key={brand._id}>
              <img className="w-full" src={brand.image} alt={brand.name} />
              <h5 className="text-center text-black text-sm md:text-lg">{brand.name}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}
