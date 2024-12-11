// import React from "react";
import Loader from "../../components/Loader/Loader";
import useAllCategories from "../../customHooks/useAllCategories";
import ImgLoader from "../../components/ImgLoader/ImgLoader";

export default function Categories() {
  const { data, isError, isLoading } = useAllCategories();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  return (
    <div className="p-8 w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 ">
        {data.data.data.map((category) => (
          <div className="category rounded-xl " key={category._id}>
            <div className="h-[30vh] relative">
              <ImgLoader style="absolute inset-0 w-full h-full object-contain" />
              <img
                className="w-full object-contain h-[25vh]"
                src={category.image}
                alt={category.name}
                loading="lazy"
                onLoad={(e) => (e.target.previousSibling.style.display = "none")}
                // onError={(e) => console.error("Image failed to load")}
              />
            </div>
            <h5 className="text-center text-black">{category.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}
