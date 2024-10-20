import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const cartContext = createContext();

// eslint-disable-next-line react/prop-types
export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartProducts, setCartProducts] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState(null);

  let headers = { token: localStorage.getItem("tkn") };

  async function addToCart(productId) {
    return (
      axios
        .post(
          "https://ecommerce.routemisr.com/api/v1/cart",
          {
            productId: productId,
          },
          {
            headers,
          }
        )
        //We must use res in below () and we removed it because of below comments
        .then(() => {
          // We commented this code becouse of an issue in the API (R.5.7.all)
          // setCartProducts(res.data.data.products);
          // setNumOfCartItems(res.data.numOfCartItems);
          // setTotalCartPrice(res.data.totalCartPrice);

          // We will replace with calling the FN of getting the API

          getUserCart();

          return true;
        })
        .catch((error) => {
          // console.log(error);
          toast.error(error.message, {
            position: "bottom-right",
            duration: 3000,
          });

          return false;
        })
    );
  }

  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((res) => {
        setCartProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartId(res.data.cartId);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
          duration: 3000,
        });
      });
  }

  function updateCount(productId, newCount) {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        {
          headers,
        }
      )
      .then((res) => {
        setCartProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
          duration: 3000,
        });
      });
  }

  async function removeFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => {
        setCartProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        return true;
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
          duration: 3000,
        });

        return false;
      });
  }

  async function clearCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then(() => {
        getUserCart();
        return true;
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
          duration: 3000,
        });

        return false;
      });
  }

  useEffect(() => {
    getUserCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <cartContext.Provider
      value={{
        addToCart,
        cartProducts,
        numOfCartItems,
        totalCartPrice,
        getUserCart,
        updateCount,
        removeFromCart,
        clearCart,
        cartId,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
