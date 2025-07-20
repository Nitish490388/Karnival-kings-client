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
  createdAt: Date;
};

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "@/utils/axiosClient";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ContributionList from "@/components/ContributionList";
import ExpenseList from "@/components/ExpenseList";
import { Button } from "@/components/ui/button";
import { generatePDFReport } from "@/utils/pdfGeneration";

const SessionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<ExpenseSession | null>(null);

  if (session) {
    console.log(session);
  }

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axiosClient.get(
          `/api/v1/matchday/getSessionDataById/${id}`
        );
        setSession(response.data.result.sessionData);
      } catch (error) {
        console.error("Failed to load session", error);
      }
    };
    fetchSession();
  }, [id]);

  if (!session) return <div className="p-4 text-center">Loading...</div>;

  const totalSpent = session.expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="p-4 space-y-4 max-w-3xl mx-auto">
      {/* Header */}
      <Card className="p-4 space-y-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-2xl font-bold">{session.title}</h1>
          <div className="text-lg font-semibold text-red-600">
            Total: ₹{totalSpent}
          </div>
        </div>
        <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
          <span>{session.type}</span>
          <span>· {session.players.length} players</span>
          <span>
            ·
            <Badge variant={session.settles ? "default" : "secondary"}>
              {session.settles ? "Settled" : "Not Settled"}
            </Badge>
          </span>
        </div>
      </Card>

      {/* Expenses */}
      <ExpenseList expenses={session.expenses} />

      {/* Contributions */}
      <ContributionList
        contributions={session.contributions}
        markAsPaid={async (id, playerId) => {
          await axiosClient.patch(`/api/v1/app/mark-paid`, {
            contributionId: id,
            playerId,
          });
        }}
      />

      <Button onClick={() => generatePDFReport(session)}>
        Download Report as PDF
      </Button>
    </div>
  );
};

export default SessionDetails;
