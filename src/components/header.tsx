import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import Userprofile from "./userprofile";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { profileSelector } from "@/state/profileAtom";
import { Player } from "@/types/session";
import { userAtom } from "@/state/userAtom";
import NotificationBell from "./notification";

interface itemType {
  name: string;
  href: string;
}
const Header: React.FC = () => {
  const profileLoadable = useRecoilValueLoadable(profileSelector);

  const user: Player | null = useRecoilValue(userAtom);

  if (profileLoadable.state !== "hasValue") {
    return <div>loading...</div>;
  }

  // const user: Player = profileLoadable.contents;
  const items: itemType[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Team",
      href: "/team",
    },
    {
      name: "Gallery",
      href: "/gallery",
    },
    {
      name: "Cashflow",
      href: "/cashflow",
    },
  ];

  return (
    <div className="w-full hidden md:block select-none">
      <div className="w-full py-2 flex items-center justify-between px-10 text-primary bg-secondary/30 backdrop-blur-sm border-b border-secondary/20 shadow-md">
        <h2 className="font-bold text-3xl font-roboto">Karnival Kings</h2>
        <div className="flex items-center gap-20 font-bold [&>span]:cursor-pointer [&>span]:transition-colors [&>span]:duration-200 [&>span:hover]:text-primary/50">
          {items.map((item) => (
            <span key={item.name}>
              <Link to={item.href}>{item.name}</Link>
            </span>
          ))}
          <div className="flex gap-4 items-center">
            <NotificationBell/>
            <ModeToggle />
            {user ? <Userprofile /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
