import { Outlet } from "react-router-dom"
import { CashflowNav } from "./cashflowNav"

const CashflowLayout = () => {
  return (
    <div className="w-full mt-3 md:mt-5 min-h-[500px]">
        <CashflowNav/> 
        <Outlet/>
    </div>
  )
}

export default CashflowLayout