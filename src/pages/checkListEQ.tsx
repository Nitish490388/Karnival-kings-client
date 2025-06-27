import { useState } from "react"
import { CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Dummy data (replace with real data from backend)
const mockTransactions = [
  {
    id: 1,
    label: "Matchday Payment",
    amount: 150,
    status: "pending",
  },
  {
    id: 2,
    label: "Refund for Kit",
    amount: 200,
    status: "pending",
  },
]

export default function ChecklistPage() {
  const [transactions, setTransactions] = useState(mockTransactions)

  const markAsPaid = (id: number) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "paid" } : t))
    )

    setTransactions(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">✅ Checklist</h1>

      {transactions.length === 0 ? (
        <p className="text-muted-foreground text-center">No pending items 🎉</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((item) => (
            <Card key={item.id} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base sm:text-lg">
                    {item.label}
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
                    item.status === "paid"
                      ? "text-green-600"
                      : "text-yellow-500"
                  )}
                >
                  {item.status === "paid" ? (
                    <><CheckCircle className="w-4 h-4" /> Paid</>
                  ) : (
                    <><Clock className="w-4 h-4" /> Pending</>
                  )}
                </div>
                {item.status === "pending" && (
                  <Button size="sm" onClick={() => markAsPaid(item.id)}>
                    Mark as Paid
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
