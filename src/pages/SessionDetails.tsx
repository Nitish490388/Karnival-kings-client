export type Player = {
  id: string;
  name: string;
  profilePic?: string | null;
};

export type Expense = {
  id: string;
  amount: number;
  description: string;
  date: string;
  playerId: string;
  paidBy: Player;
};

export type Contribution = {
  id: string;
  amount: number;
  type: "MATCHDAY" | "EQUIPMENT";
  player: Player;
  playerId: string;
  status: "PENDING" | "PAID" | "DECLINED";
  date: string; // or Date if parsing into Date object
  session: {
    id: string;
    title: string;
  };
  sessionId: string;
};


export type ExpenseSession = {
  id: string;
  title: string;
  type: "MATCHDAY" | "EQUIPMENT";
  settles: boolean;
  players: Player[];
  expenses: Expense[];
  contributions: Contribution[];
};


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "@/utils/axiosClient";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SessionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<ExpenseSession | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axiosClient.get(`/api/v1/matchday/getSessionDataById/${id}`);
        setSession(response.data.result.sessionData);
      } catch (error) {
        console.error("Failed to load session", error);
      }
    };
    fetchSession();
  }, [id]);

  if (!session) return <div className="p-4 text-center">Loading...</div>;

  const totalSpent = session.expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPerson = session.players.length ? totalSpent / session.players.length : 0;

  return (
    <div className="p-4 space-y-4 max-w-3xl mx-auto">
      {/* Header */}
      <Card className="p-4">
        <h1 className="text-2xl font-bold">{session.title}</h1>
        <div className="text-sm text-muted-foreground mt-1 flex flex-wrap items-center gap-2">
          <span>{session.type}</span>
          <span>· {session.players.length} players</span>
          <span>· 
            <Badge variant={session.settles ? "default" : "secondary"}>
              {session.settles ? "Settled" : "Not Settled"}
            </Badge>
          </span>
        </div>
      </Card>

      {/* Players */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Players</h2>
        {session.players.length > 0 ? (
          <ul className="list-disc pl-4 space-y-1">
            {session.players.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No players joined.</p>
        )}
      </Card>

      {/* Expenses */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Expenses</h2>
        {session.expenses.length > 0 ? (
          <ul className="divide-y">
            {session.expenses.map((e) => (
              <li key={e.id} className="py-2 flex justify-between">
                <span>
                  {e.description} - <strong>{e.paidBy.name}</strong>
                </span>
                <span>₹{e.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No expenses recorded.</p>
        )}
      </Card>

      {/* Contributions */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Contributions</h2>
        {session.contributions.length > 0 ? (
          <ul className="divide-y">
            {session.contributions.map((c: Contribution) => (
              <li key={c.id} className="py-2 flex flex-col sm:flex-row sm:justify-between">
                <div>
                  <span className="font-medium">{c.player.name}</span> contributed for <strong>{c.type}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">₹{c.amount}</span>
                  <Badge
                    variant={
                      c.status === "PAID"
                        ? "default"
                        : c.status === "PENDING"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {c.status}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No contributions recorded.</p>
        )}
      </Card>

      {/* Split Calculation */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Split Calculation</h2>
        <p>Total: ₹{totalSpent}</p>
        <p>Per Person: ₹{perPerson.toFixed(2)}</p>
      </Card>
    </div>
  );
};

export default SessionDetails;