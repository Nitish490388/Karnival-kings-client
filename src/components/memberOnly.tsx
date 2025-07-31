import { Outlet } from "react-router-dom";
import { Player } from "@/types/session";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/state/userAtom";
import { Lock } from "lucide-react";

const MemberOnly = () => {
  const user: Player | null = useRecoilValue(userAtom);
  console.log(user);
  

  if (user?.isApproved !== true) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <Lock className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Access Denied!</h2>
        <p className="text-muted-foreground max-w-md">
          Looks like you're trying to sneak into the clubhouse without a pass!
          <br />
          Your membership is still pending approval from the Team Captain.
          <br />
          Go nudge them — or bribe them with a sixer 🍻
        </p>
      </div>
    );
  }

  return <Outlet />;
};

export default MemberOnly;
 