import { Outlet } from "react-router-dom"
import DateRangePicker from "./DateRangePicker"

const ViewdataLayout = () => {
    return (
        <div className="w-full mt-6">
            <div className="px-6"><DateRangePicker/></div>
            <Outlet/>
        </div>
    )
}

export default ViewdataLayout;

