import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

interface itemType {
    name: string
    href: string
}
const Header: React.FC = () => {
    
    const items: itemType[] = [
        {
            name: "Home",
            href: "/"
        },
        {
            name: "Team",
            href: "/team"
        },
        {
            name: "Gallery",
            href: "/gallery"
        },
        {
            name: "Cashflow",
            href: "/cashflow"
        },
        
    ]

    return (
        <div className="w-full hidden md:block select-none">
        <div className="w-full py-2 flex items-center justify-between px-10 text-primary bg-secondary/30 backdrop-blur-sm border-b border-secondary/20 shadow-md">
            <h2 className="font-bold text-3xl font-roboto">Karnival Kings</h2>
            <div className="flex items-center gap-20 font-bold [&>span]:cursor-pointer [&>span]:transition-colors [&>span]:duration-200 [&>span:hover]:text-primary/50">
                {
                    items.map((item) => (
                        <span key={item.name}>
                            <Link to={item.href}>{item.name}</Link>
                        </span>
                    ))
                }
                <ModeToggle/>
            </div>
        </div>
        </div>
    );
}

export default Header;