import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { profileSelector } from "@/state/profileAtom";
import { Player } from "@/types/session";

const UserProfile = () => {
  const profileLoadable = useRecoilValueLoadable(profileSelector);

  if (profileLoadable.state !== "hasValue") {
    return <div>
      loading...
    </div>; 
  }

  const user: Player = profileLoadable.contents;

  if (!user) return null;

  return (
    <Link to="/profile">
      <Avatar className="w-9 h-9">
        <AvatarImage src={user.profilePic || ""} alt={user.name} />
        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserProfile;
