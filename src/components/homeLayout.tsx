import { Outlet } from "react-router-dom"
import Header from "@/components/header";
import MobileHeader from "@/components/mobile-header";
import Footer from "./footer";

const HomeLayout = () => {

  return (
    <>
    <div className="w-full overflow-x-hidden">
        <nav className="w-full fixed top-0 left-0 z-50 ">
          <Header />
          <MobileHeader/>
        </nav>
        <div className="h-[50px]"></div>
        <div className="px-4">
        <Outlet />
        </div>
        {/* <footer>made with heart</footer> */}
        <Footer/>
      </div>
    </>
  )
}

export default HomeLayout