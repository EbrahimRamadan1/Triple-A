import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./../Logo/index";
import "./Nv.scss";
import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";

export default function Nvbar() {
  const [responsive, setResponsive] = useState(false);
  const { token, setToken } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("tkn");
    setToken(null);

    navigate("/logIn");
  };

  function navTogle() {
    if (responsive) {
      setResponsive(false);
    } else {
      setResponsive(true);
    }
  }

  return (
    <nav className=" border-gray-200 bg-gray-900 z-20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Logo />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          onClick={navTogle}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg lg:hidden  focus:outline-none focus:ring-2  text-gray-400 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${
            responsive ? `flex` : `hidden`
          } w-full lg:block lg:w-auto`}
          id="navbar-default"
        >
          {token ? (
            <ul className="w-full font-medium flex flex-col p-4 lg:p-0 mt-4 border rounded-lg  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 md:border-0  bg-gray-800 lg:bg-gray-900 border-gray-700">
              <li>
                <NavLink
                  to={"/"}
                  className="block py-2 px-3  rounded md:bg-transparent  md:p-0 text-white "
                  aria-current="page"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/categories"}
                  className="block py-2 px-3  rounded   md:border-0  md:p-0 text-white md:hover:text-blue-500 hover:text-white "
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/Brands"}
                  className="block py-2 px-3  rounded   md:border-0  md:p-0 text-white md:hover:text-blue-500 hover:text-white "
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/cart"}
                  className="block py-2 px-3  rounded   md:border-0  md:p-0 text-white md:hover:text-blue-500 hover:text-white "
                >
                  Cart
                </NavLink>
              </li>
            </ul>
          ) : null}
        </div>

        <div
          className={`${
            responsive ? `flex` : `hidden`
          } w-full lg:flex  lg:flex-nowrap lg:w-auto lg:gap-10`}
          id="navbar-default"
        >
          {/* <ul className="flex  items-center space-x-8 text-white">
            <li>
              <i className="fa-solid fa-heart cursor-pointer" />
            </li>
            <li>
              <i className="fa-solid fa-cart-shopping cursor-pointer" />
            </li>
          </ul> */}

          <ul className="w-full font-medium flex flex-col p-4 lg:p-0 mt-4 border rounded-lg  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  bg-gray-800 lg:bg-gray-900 border-gray-700">
            {token ? (
              <li>
                <span
                  to={""}
                  className="block py-2 px-3 cursor-pointer rounded   md:border-0  md:p-0 text-white md:hover:text-blue-500 hover:text-white "
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to={"/login"}
                    className="block py-2 px-3  bg-blue-700 rounded md:bg-transparent  md:p-0 text-white"
                    aria-current="page"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/register"}
                    className="block py-2 px-3  rounded   md:border-0  md:p-0 text-white md:hover:text-blue-500 hover:text-white "
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
