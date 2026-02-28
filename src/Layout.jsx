import { Outlet } from "react-router-dom"
import Navbar from "./maincomponents/Navbar"
import Footer from "./maincomponents/Footer"
import Banner from "./AlertBanner/Banner"

export default function Layout() {
  return (
    <>
      <Banner />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}