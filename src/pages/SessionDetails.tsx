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

export type ExpenseSession = {
  id: string;
  title: string;
  type: "MATCHDAY" | "EQUIPMENT";
  settles: boolean;
  players: Player[];
  expenses: Expense[];
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
        const response = await axiosClient.get<ExpenseSession>(`/api/v1/session/${id}`);
        setSession(response.data);
      } catch (error) {
        console.error("Failed to load session", error);
      }
    };
    fetchSession();
  }, [id]);

  if (!session) return <div className="p-4">Loading...</div>;

  const totalSpent = session.expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPerson = totalSpent / session.players.length;

  return (
    <div className="p-4 space-y-4">
      <Card className="p-4">
        <h1 className="text-2xl font-bold">{session.title}</h1>
        <div className="text-sm text-muted-foreground">
          {session.type} · {session.players.length} players ·{" "}
          <Badge variant={session.settles ? "default" : "secondary"}>
            {session.settles ? "Settled" : "Not Settled"}
          </Badge>
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Players</h2>
        <ul className="list-disc pl-4 space-y-1">
          {session.players.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Expenses</h2>
        <ul className="divide-y">
          {session.expenses.map((e) => (
            <li key={e.id} className="py-2">
              <div className="flex justify-between">
                <span>
                  {e.description} - <strong>{e.paidBy.name}</strong>
                </span>
                <span>₹{e.amount}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Split Calculation</h2>
        <p>Total: ₹{totalSpent}</p>
        <p>Per Person: ₹{perPerson.toFixed(2)}</p>
      </Card>
    </div>
  );
};

export default SessionDetails;
