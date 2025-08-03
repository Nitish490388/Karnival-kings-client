import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddExpenseMDDialog } from "./AddExpenseMDDialog";

type SessionCardProps = {
  id: string
  title: string;
  isActive: boolean;
  isSettled: boolean;
  playerCount: number;
};

const SessionCard: React.FC<SessionCardProps> = ({
  id,
  title,
  isActive,
  isSettled,
  playerCount,

}) => {

    const navigate = useNavigate();
    
  return (
    <Card className="rounded-2xl shadow-md p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Badge variant={isActive ? "default" : "destructive"}>
          {isActive ? "Active" : "Expired"}
        </Badge>
      </div>

      <div className="text-sm text-muted-foreground">
        {playerCount} {playerCount === 1 ? "player" : "players"} ·{" "}
        <span className={isSettled ? "text-green-600" : "text-yellow-600"}>
          {isSettled ? "Settled" : "Not Settled"}
        </span>
      </div>

      <div className="flex gap-2 mt-2">
        <Button
          onClick={() => navigate(`/session/${id}`)}
          variant="outline"
          className="flex items-center gap-1"
        >
          <Eye className="w-4 h-4" /> View Data
        </Button>
        
        <AddExpenseMDDialog disabled={!isActive} sessionId={id} />
      </div>
    </Card>
  );
};

export default SessionCard;
