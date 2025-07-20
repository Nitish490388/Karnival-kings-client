import { Card } from "@/components/ui/card";
import ExpenseItem from "./ExpenseItem";

type Expense = {
  id: string;
  description: string;
  amount: number;
  paidBy: {
    name: string;
  };
};

type Props = {
  expenses: Expense[];
};

const ExpenseList: React.FC<Props> = ({ expenses }) => {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-primary">Expenses</h2>
      {expenses.length > 0 ? (
        <ul className="space-y-3">
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No expenses recorded.</p>
      )}
    </Card>
  );
};

export default ExpenseList;
