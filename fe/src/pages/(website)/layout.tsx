import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Banner from "@/components/Banner"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
        <Header />
        <Banner/>
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout