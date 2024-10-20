// import { Link, NavLink, useNavigate } from "react-router-dom";
// import Logo from "./../Logo/index";
// import "./Navbar.scss";
// import { useContext } from "react";
// import { authContext } from "../../context/AuthContext";

// export default function Navbar() {
//   const { token, setToken } = useContext(authContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("tkn");
//     setToken(null);

//     navigate("/logIn");
//   };

//   return (
//     <nav className="container mx-auto">
//       <div className="flex px-7 py-3 text-white items-center justify-between  mx-auto container">
//         <div className=" flex items-center gap-20">
//           <Link to="">
//             <Logo />
//           </Link>

//           {token ? (
//             <ul className="flex items-center space-x-4">
//               <li>
//                 <NavLink to="/">Products</NavLink>
//               </li>

//               <li>
//                 <NavLink to="/Categories">Categories</NavLink>
//               </li>

//               <li>
//                 <NavLink to="/Cart">Cart</NavLink>
//               </li>
//             </ul>
//           ) : null}
//         </div>

//         <div className="flex items-center gap-10">
//           <ul className="flex items-center space-x-8">
//             <li>
//               <i className="fa-solid fa-heart cursor-pointer" />
//             </li>

//             <li>
//               <i className="fa-solid fa-cart-shopping cursor-pointer" />
//             </li>
//           </ul>  

//           <ul className="flex items-center gap-3">
//             {token ? (
//               <li>
//                 <span className="cursor-pointer" onClick={handleLogout}>
//                   Logout
//                 </span>
//               </li>
//             ) : (
//               <>
//                 <li>
//                   <NavLink to="/register">Register</NavLink>
//                 </li>

//                 <li>
//                   <NavLink to="/login">Login</NavLink>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// import Nvbar from '../Nvbar/Nvbar'
import Nvbar from './../Nvbar/Nvbar';

export default function Navbar() {
  return (
    <Nvbar />
  )
}
