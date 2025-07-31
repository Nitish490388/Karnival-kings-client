import { useState } from "react";
import { Refunds } from "@/types/session";
import { Button } from "@/components/ui/button";

interface RefundListProps {
  refunds: Refunds[];
  markAsApproved: (refundId: string, playerId: string) => Promise<void>;
}

export const RefundList = ({ refunds: initialRefunds, markAsApproved }: RefundListProps) => {
  const [refunds, setRefunds] = useState<Refunds[]>(initialRefunds);

  const handleApprove = async (refundId: string, playerId: string) => {
    try {
      await markAsApproved(refundId, playerId);

      // Update local UI state
      setRefunds((prev) =>
        prev.map((refund) =>
          refund.id === refundId
            ? { ...refund, status: "PAID" }
            : refund
        )
      );
    } catch (error) {
      console.error("Failed to approve refund", error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-2">Refunds</h2>
      {refunds.length === 0 ? (
        <p className="text-muted-foreground">No refunds available.</p>
      ) : (
        refunds.map((refund) => (
          <div
            key={refund.id}
            className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{(refund as any).player?.name || "Unknown Player"}</h3>
              <p className="text-muted-foreground text-sm">
                ₹{refund.amount} — {refund.type}
              </p>
              <p className="text-xs text-gray-500">Status: {refund.status}</p>
            </div>

            {refund.status === "PENDING" && (
              <Button
                variant="outline"
                onClick={() => handleApprove(refund.id, refund.playerId)}
              >
                Approve
              </Button>
            )}
          </div>
        ))
      )}
    </div>
  );
};
