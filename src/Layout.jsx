import { Outlet } from "react-router-dom";
import Navbar from "./MainPage/Navbar";
import Footer from "./MainPage/Footer";
import Banner from "./Marquee/Banner";

export default function Layout() {
  return (
    <>
    <div className="min-h-screen flex flex-col">

      <Banner />
      <Navbar />
     <main className="flex-1">
       <Outlet />
     </main>
      <Footer />
    </div>
    </>
  );
}
