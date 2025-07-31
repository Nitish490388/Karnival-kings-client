import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { AddExpenseEQDialog } from "@/components/addExpenseEQDialog";

const AddExpenseEQ = () => {
  return (
    <div className="w-full">
      <Card className="w-full max-w-2xl mx-auto mt-6 md:mt-10 shadow-md rounded-2xl border border-border">
        <CardContent className="px-4 py-6 sm:px-6 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
            <Heart className="text-red-600 w-6 h-6" />
            <h1 className="text-xl sm:text-2xl font-bold text-secondary-foreground">
              Ek Ball, Sau Dard!
            </h1>
            <Badge variant="outline" className="text-xs sm:text-sm">
              💸 Equipment Expenses
            </Badge>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-5">
            One ball torn in 10 overs, and now it’s time to account for it. Log
            that equipment expense and keep the budget scoreboard updated!
          </p>
          {/* <AddExpenseEQDialog/> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExpenseEQ;
