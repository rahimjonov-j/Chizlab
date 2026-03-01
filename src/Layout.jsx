import { Outlet } from "react-router-dom";
import Navbar from "./MainPage/Navbar";
import Footer from "./MainPage/Footer";
import Banner from "./Marquee/Banner";

export default function Layout() {
  return (
    <>
      <Banner />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
