import "animate.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import NotFound from "./pages/NotFound/NotFound";
import AuthContext from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Categories from "./pages/Categories/Categories";
import { QueryClient, QueryClientProvider } from "react-query";
import Brands from "./pages/Brands/Brands.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import Payment from "./pages/Payment/Payment.jsx";
import { Offline } from "react-detect-offline";
// import Test from "./pages/Test/Test.jsx";


// import Test from "./components/Test/Test.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      { index: true, element: <Products /> },
      { path: "products", element: <Products /> },
      { path: "/register", element: <SignUp /> },
      { path: "brands", element: <Brands /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "product-details/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "/categories", element: <Categories /> },
      // { path: "/test", element: <Test /> },
      { path: "/login", element: <LogIn /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  const reactQueryConfig = new QueryClient();

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <AuthContext>
        <QueryClientProvider client={reactQueryConfig}>
          <CartContextProvider>
            <RouterProvider router={router} />
            <Toaster />
            <Offline>
              <div className="w-full h-screen fixed top-0 bg-[#0000009c] z-50 flex items-start justify-center transition-all ">
                <div className="py-3 px-4 bg-[#db2839] text-white animate__animated animate__fadeInDown rounded-b-lg">
                  Please check your network..
                </div>
              </div>
            </Offline>
          </CartContextProvider>
        </QueryClientProvider>
      </AuthContext>
    </div>
  );
}
