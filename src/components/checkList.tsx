import { useEffect, useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import axiosClient from "@/utils/axiosClient";

interface Contribution {
  id: string;
  amount: number;
  status: "PENDING" | "PAID";
  type: string;
  session: {
    title: string;
  };
  playerId: string;
}

export default function Checklist() {
  const [transactions, setTransactions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingContributions = async () => {
      try {
        const res = await axiosClient.get("/api/v1/contributions/pendings");
        const pending: Contribution[] = res.data.result.pendingContributions;
        setTransactions(pending);
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingContributions();
  }, []);

  const markAsPaid = async (id: string, playerId: string) => {
    try {
      await axiosClient.patch(`/api/v1/contributions/mark-paid`, {
        contributionId: id,
        playerId: playerId,
      });

      // Update UI after marking as paid
      setTransactions((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Failed to mark as paid:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">✅ Checklist</h1>

      {loading ? (
        <p className="text-center text-muted-foreground">Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-muted-foreground text-center">No pending items 🎉</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((item) => (
            <Card key={item.id} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base sm:text-lg">
                    {item.session?.title || item.type}
                  </CardTitle>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  ₹ {item.amount}
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="flex items-center justify-between mt-4">
                <div
                  className={cn(
                    "flex items-center gap-2 text-sm",
                    item.status === "PAID"
                      ? "text-green-600"
                      : "text-yellow-500"
                  )}
                >
                  {item.status === "PAID" ? (
                    <>
                      <CheckCircle className="w-4 h-4" /> Paid
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4" /> Pending
                    </>
                  )}
                </div>
                {item.status === "PENDING" && (
                  <Button size="sm" onClick={() => markAsPaid(item.id, item.playerId)}>
                    Mark as Paid
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
