import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { expenseInputTypes } from "@/types/types";
import axiosClient from "@/utils/axiosClient";
import { ErrorMessage } from "./errorMsg";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function AddExpenseMDDialog({
  disabled,
  sessionId,
}: {
  disabled: boolean;
  sessionId: string;
}) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMSG, setErrorMSG] = useState<string | null>(null);
  const [expenseType, setExpenseType] = useState<"MATCHDAY" | "EQUIPMENT">(
    "MATCHDAY"
  );
  const [open, setOpen] = useState(false); // ✅ manage dialog open state

  const handleSubmit = async () => {
    const expenseData = {
      description,
      amount: parseInt(amount),
      expenseType,
      sessionId,
    };

    const { success, data, error } = expenseInputTypes.safeParse(expenseData);
    if (!success) {
      setErrorMSG(error.issues[0]?.message);
      return;
    }

    try {
      await axiosClient.post("/api/v1/expence/add", data);
      toast.success("Expense added successfully!");

      // Reset fields
      setDescription("");
      setAmount("");
      setErrorMSG(null);

      // ✅ Close the dialog
      setOpen(false);
    } catch (error) {
      console.error(error);
      setErrorMSG("Something went wrong!!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1" disabled={disabled}>
          <Plus className="w-4 h-4" /> Add Expense
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              value={description}
              onChange={(e) => {
                setErrorMSG(null);
                setDescription(e.target.value);
              }}
              placeholder="e.g. Matchday snacks"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              className="col-span-3"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setErrorMSG(null);
              }}
              placeholder="e.g. 250"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select
              value={expenseType}
              onValueChange={(val) =>
                setExpenseType(val as "MATCHDAY" | "EQUIPMENT")
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MATCHDAY">Matchday</SelectItem>
                <SelectItem value="EQUIPMENT">Equipment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {errorMSG && <ErrorMessage message={errorMSG} />}
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Save Expense</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
