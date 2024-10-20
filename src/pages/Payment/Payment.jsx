import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function Payment() {
  const { cartId, getUserCart } = useContext(cartContext);
  const [isOnline, setIsOnline] = useState(false);

  function handleCashPayment(values) {
    const backEndBody = {
      shippingAddress: values,
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { backEndBody },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        toast.success("Success", {
          position: "bottom-right",
          duration: 3000,
        });

        console.log(res.data);
        getUserCart();
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
          duration: 3000,
        });
      });
  }

  function handleOnlinePayment(values) {
    const backEndBody = {
      shippingAddress: values,
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { backEndBody },
        {
          headers: { token: localStorage.getItem("tkn") },
          params: {
            url: "http://localhost:5173",
          },
        }
      )
      .then((res) => {
        window.open(res.data.session.url, "_self");
        getUserCart();
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
          duration: 3000,
        });
      });
  }

  function CheckPayment(values) {
    if (isOnline) {
      handleOnlinePayment(values);
    } else {
      handleCashPayment(values);
    }
  }

  const PaymentFormik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: CheckPayment,
  });

  return (
    <div>
      <form
        onSubmit={PaymentFormik.handleSubmit}
        className="max-w-md mx-auto p-3"
      >
        {/* details Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={PaymentFormik.handleBlur}
            onChange={PaymentFormik.handleChange}
            value={PaymentFormik.values.details}
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-[#db2839] peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#db2839] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Detailes
          </label>

          {PaymentFormik.errors.details && PaymentFormik.touched.details ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {PaymentFormik.errors.details}
            </div>
          ) : null}
        </div>

        {/* details Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={PaymentFormik.handleBlur}
            onChange={PaymentFormik.handleChange}
            value={PaymentFormik.values.city}
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-[#db2839] peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#db2839] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            City
          </label>

          {PaymentFormik.errors.city && PaymentFormik.touched.city ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {PaymentFormik.errors.city}
            </div>
          ) : null}
        </div>

        {/* phone Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={PaymentFormik.handleBlur}
            onChange={PaymentFormik.handleChange}
            value={PaymentFormik.values.phone}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-[#db2839] peer"
            placeholder=" "
          />

          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#db2839] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone Number
          </label>

          {PaymentFormik.errors.phone && PaymentFormik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {PaymentFormik.errors.phone}
            </div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button
          onClick={() => setIsOnline(false)}
          type="submit"
          className="text-white bg-[#db2839] hover:bg-[#d35663] focus:ring-4 focus:outline-none focus:ring-[#d35663] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#db2839]"
        >
          Pay On Cash
        </button>
        <button
          onClick={() => setIsOnline(true)}
          type="submit"
          className="text-white mx-4 bg-[#2867db] hover:bg-[#568cd3] focus:ring-4 focus:outline-none  focus:ring-[#5686d3] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Pay Online
        </button>
      </form>
    </div>
  );
}
