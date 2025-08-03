import { useEffect, useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import axiosClient from "@/utils/axiosClient";
import { Contribution, Refund } from "@/types/session";

export default function Checklist() {
  
  const [transactions, setTransactions] = useState<Contribution[]>([]);

  const [refunds, setRefunds] = useState<Refund[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contribRes, refundRes] = await Promise.all([
          axiosClient.get("/api/v1/contributions/pendings"),
          axiosClient.get("/api/v1/refunds/pendings"),
        ]);

        console.log(refundRes);
        
        setTransactions(contribRes.data.result.pendingContributions || []);
        setRefunds(refundRes.data.result.pendingRefunds || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const markRefundAsPaid = async (id: string, playerId: string) => {
    try {
      await axiosClient.patch("/api/v1/refunds/mark-paid", {
        refundId: id,
        playerId,
      });

      setRefunds((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Failed to mark refund as paid:", error);
    }
  };

  const markAsPaid = async (id: string, playerId: string) => {
    try {
      await axiosClient.patch(`/api/v1/contributions/mark-paid`, {
        contributionId: id,
        playerId: playerId,
      });

      // Update UI after marking as paid
      setTransactions((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to mark as paid:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        ✅ Checklist
      </h1>

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
                  <Button
                    size="sm"
                    onClick={() => markAsPaid(item.id, item.playerId)}
                  >
                    Mark as Paid
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

          {refunds.length > 0 && (
            <>
              <h2 className="text-lg font-semibold text-center mt-8">
                Pending Refunds
              </h2>

              <div className="space-y-4">
                {refunds.map((refund) => (
                  <Card key={refund.id} className="shadow-sm">
                    <CardHeader className="flex justify-between items-center">
                      <CardTitle className="text-base">
                        {refund.session.title || refund.type}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        ₹ {refund.amount}
                      </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="flex justify-between items-center mt-4">
                      <div
                        className={cn(
                          "flex items-center gap-2 text-sm",
                          refund.status === "PAID"
                            ? "text-green-600"
                            : "text-yellow-500"
                        )}
                      >
                        {refund.status === "PAID" ? (
                          <>
                            <CheckCircle className="w-4 h-4" /> Paid
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4" /> Pending
                          </>
                        )}
                      </div>
                      {refund.status === "PENDING" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            markRefundAsPaid(refund.id, refund.playerId)
                          }
                        >
                          Approve Refund
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
