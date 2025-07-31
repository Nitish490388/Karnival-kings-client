
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axiosClient from "@/utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Player } from "@/types/session";
import { userAtom } from "@/state/userAtom";

export default function ProfilePage() {
  const navigate = useNavigate();
  // const [user, setUser] = useState<Player>();

  const resetProfile = useResetRecoilState(userAtom);
  const user: Player | null = useRecoilValue(userAtom); 

  
  const handleLogout = async () => {
    console.log("Logging out...");
    await axiosClient.post("/api/v1/player/logout");
    
     resetProfile();
    navigate("/auth");
  };


  return (

    <>
    <div className="bg-background flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="flex flex-col items-center text-center space-y-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.profilePic || ""} />
            <AvatarFallback className="text-xl">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-semibold">{user?.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </CardContent>
      </Card>

      
    </div>

    </>
  );
}
