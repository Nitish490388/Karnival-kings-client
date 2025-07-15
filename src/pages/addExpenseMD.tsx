import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";
import SessionCard from "@/components/sessionCard";
import { useGetAllSessions } from "@/hook/useGetAllSessions";
import CreateSession from "@/components/CreateSession";

const AddExpenseMD = () => {
  const sessions = useGetAllSessions();

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto mt-6 md:mt-10 shadow-md rounded-2xl border border-border">
        <CardContent className="px-4 py-6 sm:px-6 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
            <Wallet className="text-green-600 w-6 h-6" />
            <h1 className="text-xl sm:text-2xl font-bold text-secondary-foreground">
              Where Did the Money Go?
            </h1>
            <Badge variant="outline" className="text-xs sm:text-sm">
              🧾 Matchday Expenses
            </Badge>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-6">
            Was it the fancy water bottles or post-match biryani? Log your
            expenses and let the scoreboard speak!
          </p>
          {/* <AddExpenseMDDialog/> */}

          <CreateSession />
        </CardContent>
      </Card>

      <div className="w-full max-w-2xl mx-auto mt-6 md:mt-10 shadow-md rounded-2xl border border-border">
        <div className="flex flex-col gap-2">
          {sessions &&
            sessions.map((item) => (
              <div key={item.id}>
                <SessionCard
                  id={item.id}
                  title={item.title}
                  isActive={!item.settles}
                  isSettled={item.settles}
                  playerCount={item.players.length}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AddExpenseMD;
