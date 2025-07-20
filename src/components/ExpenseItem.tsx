type Expense = {
  id: string;
  description: string;
  amount: number;
  paidBy: {
    name: string;
  };
};

type Props = {
  expense: Expense;
};

const ExpenseItem: React.FC<Props> = ({ expense }) => {
  return (
    <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-muted rounded-xl px-4 py-3 shadow-sm">
      <div className="mb-2 sm:mb-0">
        <p className="text-sm text-foreground">
          <span className="font-medium text-base">{expense.description}</span>{" "}
          by{" "}
          <span className="text-primary font-semibold">
            {expense.paidBy.name}
          </span>
        </p>
      </div>
      <div className="text-sm font-bold text-red-600 sm:text-base">
        ₹{expense.amount}
      </div>
    </li>
  );
};

export default ExpenseItem;
