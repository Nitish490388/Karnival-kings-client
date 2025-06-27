import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { allPlayersSelector } from "@/state/playersAtom";
import { useRecoilValueLoadable } from "recoil";

export interface Player {  
  id: string;
  name: string;
  email: string;
  profilePic?: string;
}  

export default function TeamPage() {
  const playerLoadable = useRecoilValueLoadable(allPlayersSelector);

  if (playerLoadable.state === "loading") {
    return (
      <p className="text-center text-muted-foreground">Loading players...</p>
    );
  }

  if (playerLoadable.state === "hasError") {
    return <p className="text-center text-red-500">Failed to load players.</p>;
  }

  const players: Player[] = playerLoadable.contents;
  
  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">
        🏏 Our Team
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {players.map((player) => (
          <Card key={player.id} className="w-full">
            <CardHeader className="pb-0">
              <CardTitle className="text-base sm:text-lg font-semibold">
                Team Member
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4 p-4 sm:p-6">
              <Avatar className="w-12 h-12 sm:w-14 sm:h-14">
                <AvatarImage src={player.profilePic} alt={player.name} />
                <AvatarFallback>
                  {player.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm sm:text-base font-medium">
                  {player.name}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {player.email}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
