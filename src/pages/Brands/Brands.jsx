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
    <div className="p-8">
      <div className="grid grid-cols-4 gap-5">
        {data.data.data.map((brand) => {
          return (
            <div className="brand rounded-xl bg-[#3b82f6]" key={brand._id}>
              <img className="w-full" src={brand.image} alt={brand.name} />
              <h5 className="text-center text-white">{brand.name}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}
