import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
// import Nvbar from "../../components/Nvbar/Nvbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-wrap content-between justify-center">
      {/* <Nvbar /> */}

      <Navbar />
      
      <Outlet />

      <Footer />
    </div>
  );
}
