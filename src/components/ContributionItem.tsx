import { useState } from "react";
import { Badge } from "@/components/ui/badge";

type Contribution = {
  id: string;
  amount: number;
  type: "MATCHDAY" | "EQUIPMENT";
  status: "PENDING" | "PAID" | "DECLINED";
  player: {
    id: string;
    name: string;
  };
  playerId: string;
};

type Props = {
  contribution: Contribution;
  markAsPaid: (contributionId: string, playerId: string) => Promise<void>;
};

const ContributionItem: React.FC<Props> = ({ contribution, markAsPaid }) => {
  const [status, setStatus] = useState<"PENDING" | "PAID" | "DECLINED">(contribution.status);

  const handleMarkAsPaid = async () => {
    setStatus("PAID"); // Optimistic update

    try {
      await markAsPaid(contribution.id, contribution.playerId);
    } catch (err) {
      console.error("Failed to mark as paid", err);
      setStatus("PENDING"); // Revert if failed
    }
  };

  return (
    <li className="py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div>
        <span className="font-medium text-primary">{contribution.player.name}</span>
      </div>
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <span className="font-semibold">₹{contribution.amount}</span>
        <Badge
          variant={
            status === "PAID"
              ? "default"
              : status === "PENDING"
              ? "secondary"
              : "destructive"
          }
        >
          {status}
        </Badge>
        {status !== "PAID" && (
          <button
            onClick={handleMarkAsPaid}
            className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            Mark as Paid
          </button>
        )}
      </div>
    </li>
  );
};

export default ContributionItem;
