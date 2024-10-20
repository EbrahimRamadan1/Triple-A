import { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cartProducts,
    totalCartPrice,
    numOfCartItems,
    updateCount,
    removeFromCart,
    clearCart,
  } = useContext(cartContext);

  // console.log("allProducts", cartProducts);

  function handleUpdateCount(id, count) {
    updateCount(id, count);
  }

  function handleRemoveItem(id) {
    const del = removeFromCart(id);

    if (del) {
      toast.success("Product removed from cart", {
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

  function handleClearCart() {
    const clear = clearCart();

    if (clear) {
      toast.success("Your Cart is empty now !", {
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

  return (
    <>
      {cartProducts ? (
        numOfCartItems === 0 ? (
          <div className="w-full flex items-center justify-center">
            <h6 className=" text-[#525151] font-medium text-[20px] italic text-center">
              There is no Items in your cart
            </h6>
          </div>
        ) : (
          <div className="px-3 py-1 md:px-7 md:py-2 lg:px-10 lg:py-3">
            <h2 className="text-[#525151] font-medium text-[20px] italic text-center">
              Total Price: <span className="text-black">${totalCartPrice}</span>
            </h2>

            <h2 className="text-[#525151] font-medium text-[20px] italic text-center">
              Number Of Items:{" "}
              <span className="text-black">
                {numOfCartItems} Different Items
              </span>
            </h2>

            <button
              className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cartProducts.map((product) => (
                    <tr
                      className="bg-white border-b  hover:bg-gray-50 "
                      key={product._id}
                    >
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={product.product.title}
                        />
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900 ">
                        {product.product.title}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleUpdateCount(
                                product.product._id,
                                product.count - 1
                              )
                            }
                            className={`hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none ${
                              product.count === 1 ? "hidden" : "block"
                            }`}
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>

                          <div className="text-center">
                            <input
                              type="string"
                              readOnly
                              id="first_product"
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 "
                              placeholder={product.count}
                              required
                            />
                          </div>

                          <button
                            onClick={() =>
                              handleUpdateCount(
                                product.product._id,
                                product.count + 1
                              )
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900 ">
                        ${product.price}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          href="#"
                          className="font-medium text-red-600  hover:underline"
                          onClick={() => handleRemoveItem(product.product._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link to="/payment">
              <button className="w-full py-4 text-white bg-[#163362] my-2 rounded-[20px] hover:bg-[#294674] transition-all">
                Make an order
              </button>
            </Link>
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}
