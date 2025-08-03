import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRecoilValueLoadable } from "recoil";
import { allPlayersSelector } from "@/state/playersAtom";
export default function AddContribution() {
  const [amount, setAmount] = useState(0);

  const handleSubmit = () => {
    const contribution = {
      amount,
    };
    console.log("Contribution submitted:", contribution);
    // Add API call here
  };

   const playerLoadable = useRecoilValueLoadable(allPlayersSelector);
  
    if (playerLoadable.state === "loading") {
      return (
        <p className="text-center text-muted-foreground">Loading players...</p>
      );
    }
  
    if (playerLoadable.state === "hasError") {
      return <p className="text-center text-red-500">Failed to load players.</p>;
    }
  
  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardContent className="space-y-6 p-6">
          <h2 className="text-2xl font-bold">Create Contribution</h2>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Submit Contribution
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
