import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { authContext } from "../../context/AuthContext";
import { cartContext } from "../../context/CartContext";

export default function LogIn() {
  const { setToken } = useContext(authContext);
  const { getUserCart } = useContext(cartContext);
  const [sucMsg, setSucMsg] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  let initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    setIsClicked(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", {
        email: values.email.trim(),
        password: values.password.trim(),
      })
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("tkn", res.data.token);

        getUserCart();

        setSucMsg(res.data.message);
        setIsClicked(false);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setErrMsg(error.response?.data?.message);
        setIsClicked(false);
        setTimeout(() => {
          setErrMsg(null);
        }, 2000);
      });
  };

  const loginFormik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 digits")
        .max(12, "Password must be less than 12 digits"),
    }),
  });

  return (
    <div className="p-5">
      <h2 className="text-center text-[#db2839] text-lg">Register Now</h2>

      {errMsg ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg text-center bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errMsg}
        </div>
      ) : null}

      {sucMsg ? (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg text-center bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          Welcome back
        </div>
      ) : null}

      <form
        onSubmit={loginFormik.handleSubmit}
        className="max-w-md mx-auto p-3"
      >
        {/* Email Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={loginFormik.handleBlur}
            onChange={loginFormik.handleChange}
            value={loginFormik.values.email}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-[#db2839] peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#db2839] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>

          {loginFormik.errors.email && loginFormik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {loginFormik.errors.email}
            </div>
          ) : null}
        </div>

        {/* Password Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={loginFormik.handleBlur}
            onChange={loginFormik.handleChange}
            value={loginFormik.values.password}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-[#db2839] peer"
            placeholder=" "
          />

          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#db2839] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>

          {loginFormik.errors.password && loginFormik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {loginFormik.errors.password}
            </div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-[#db2839] hover:bg-[#d35663] focus:ring-4 focus:outline-none focus:ring-[#d35663] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#db2839]"
        >
          {!isClicked ? (
            "Submit"
          ) : (
            <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
          )}
        </button>
      </form>
    </div>
  );
}
