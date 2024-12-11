import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { addToCart } = useContext(cartContext);

  async function handleAddToCart(id) {
    const res = await addToCart(id);

    if (res) {
      toast.success("Product added to cart", {
        position: "bottom-right",
        duration: 3000,
      });

      navigate("/cart");
    } else {
      toast.error("Something is wrong", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  const getProductDetails = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const projectDetailsObj = data.data.data;

  return (
    <div className="container mx-auto p-5 flex flex-wrap items-center justify-between lg:flex-nowrap">
      <div className="w-full lg:w-1/4">
        <img
          className="w-full object-contain h-[40vh] md:h-[60vh]"
          src={projectDetailsObj.imageCover}
          alt={projectDetailsObj.title}
        />
      </div>
      <div className="w-full lg:w-[70%]  ">
        <h1 className="text-black py-2">{projectDetailsObj.title}</h1>
        <p className="py-2">{projectDetailsObj.description}</p>
        <h5 className="py-2">{projectDetailsObj.category.name}</h5>
        <h5 className="py-2 pb-5">Price: {projectDetailsObj.price} $</h5>
        <button
          className="w-full bg-[#374464] p-5 rounded-xl text-white"
          onClick={() => handleAddToCart(projectDetailsObj._id)}
        >
          + Add product to cart
        </button>
      </div>
    </div>
  );
}
