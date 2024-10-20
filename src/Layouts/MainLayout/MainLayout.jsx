import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
// import Nvbar from "../../components/Nvbar/Nvbar";

export default function MainLayout() {
  return (
    <>
      {/* <Nvbar /> */}

      <Navbar />
      
      <Outlet />

      <Footer />
    </>
  );
}
