import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
// import Success from "../../components/Success/Success";
// import Failed from "../../components/Failed/Failed";

export default function SignUp() {
  const [sucMsg, setSucMsg] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const onSubmit = async (values) => {
    // console.log(values);
    //   try {
    //     const {data} = await axios.post(
    //       "https://ecommerce.routemisr.com/api/v1/auth/signup",
    //       values
    //     );
    //     console.log("res", data);
    //   } catch (error) {
    //     console.log("error", error.response.data.massege);
    //   }
    // };

    setIsClicked(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        setSucMsg(res.data.message);
        setIsClicked(false);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((res) => {
        setErrMsg(res.response.data.message);
        setIsClicked(false);

        setTimeout(() => {
          setErrMsg(null);
        }, 2000);
      });
  };
  // const validation = (allData) => {
  //   let errors = {};
  //   const nameRegux = /^[A-Z][a-z]*\s[A-Z][a-z]*/;
  //   // eslint-disable-next-line no-useless-escape
  //   const phoneRegux = /^\+?[1-9]\d{1,14}([\s\-]?\d{1,13}){1,4}$/;

  //   // Validate full name
  //   if (!nameRegux.test(allData.name)) {
  //     errors.name =
  //       "Name must start with a capital letter and include a family name.";
  //   }

  //   // Validate email
  //   if (!allData.email.includes("@") || !allData.email.includes(".")) {
  //     errors.email = "Email must be valid.";
  //   }

  //   // Validate phone number
  //   if (!phoneRegux.test(allData.phone)) {
  //     errors.phone = "The phone number you entered is invalid.";
  //   }

  //   // Validate password length
  //   if (allData.password.length < 6 || allData.password.length > 12) {
  //     errors.password = "Password must be between 6 and 12 characters.";
  //   }

  //   // Validate password match
  //   if (allData.rePassword !== allData.password) {
  //     errors.rePassword = "Passwords do not match.";
  //   }

  //   return errors;
  // };

  const registerFormik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    // validate: validation,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Name is required")
        .matches(
          /^[A-Z][a-z]*\s[A-Z][a-z]*/,
          "Full name is required and must start with capital letter"
        )
        .min(3, "Minmum must be 3 characters")
        .max(25, "Maximum must less than 25 Characters"),
      email: yup.string().email("Invalid email").required("Email is required"),

      phone: yup
        .string()
        .required("Phone number is required")
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^\+?[1-9]\d{1,14}([\s\-]?\d{1,13}){1,4}$/,
          "phone number must have country code and must be valid"
        ),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 digits")
        .max(12, "Password must be less than 12 digits"),
      rePassword: yup
        .string()
        .required("Password is required")
        .oneOf([yup.ref("password"), "password is not match"]),
    }),
  });

  return (
    <div className="p-5 w-full">
    
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
          Success
        </div>
      ) : null}

      <form
        onSubmit={registerFormik.handleSubmit}
        className="max-w-md mx-auto p-3"
      >
        {/* Full Name Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
            value={registerFormik.values.name}
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-[#db2839] peer"
            placeholder=" "
          />

          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#db2839] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Full Name
          </label>

          {registerFormik.errors.name && registerFormik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerFormik.errors.name}
            </div>
          ) : null}
        </div>

        {/* Email Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
            value={registerFormik.values.email}
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

          {registerFormik.errors.email && registerFormik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerFormik.errors.email}
            </div>
          ) : null}
        </div>

        {/* Password Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
            value={registerFormik.values.password}
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

          {registerFormik.errors.password && registerFormik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerFormik.errors.password}
            </div>
          ) : null}
        </div>

        {/* Confirm Password Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
            value={registerFormik.values.rePassword}
            type="password"
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-[#db2839] peer"
            placeholder=" "
          />

          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#db2839] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>

          {registerFormik.errors.rePassword &&
          registerFormik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerFormik.errors.rePassword}
            </div>
          ) : null}
        </div>

        {/* Phone Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
            value={registerFormik.values.phone}
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

          {registerFormik.errors.phone && registerFormik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerFormik.errors.phone}
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
  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
  />
          )}
        </button>
      </form>

    </div>
  );
}
