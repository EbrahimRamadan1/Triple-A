// import axios from "axios";
// import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";
import useAllCategories from "../../customHooks/useAllCategories";

export default function Categories() {
  //==> Replacing by using custom hooks to not duplicate the code (used on Categories Page) <==
  // const getAllCategories = () => {
  //   return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  // };

  // const { data, isError, isLoading, error } = useQuery({
  //   queryKey: "allCategories",
  //   queryFn: getAllCategories,
  // });

  const { data, isError, isLoading, error } = useAllCategories();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-5">
        {data.data.data.map((category) => {
          return (
            <div
              className="category rounded-xl bg-[#3b82f6]"
              key={category._id}
            >
              <img
                className="w-full"
                src={category.image}
                alt={category.name}
              />
              <h5 className="text-center text-white">{category.name}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}
