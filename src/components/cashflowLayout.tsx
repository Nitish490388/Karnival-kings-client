import { Outlet } from "react-router-dom"
import { CashflowNav } from "./cashflowNav"
import { useFetchProfile } from "@/hook/useUser";
import { useEffect } from "react";

const CashflowLayout = () => {
  const fetchUser = useFetchProfile();

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="w-full mt-3 md:mt-5 min-h-[500px]">
        <CashflowNav/> 
        <Outlet/>
    </div>
  )
}

export default CashflowLayout