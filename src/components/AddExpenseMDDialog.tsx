
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
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { expenseInputTypes } from "@/types/types";
import axiosClient from "@/utils/axiosClient";
import { ErrorMessage } from "./errorMsg";

export function AddExpenseMDDialog() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMSG, setErrorMSG] = useState<string | null>(null);
  const [expenseType, setExpenseType] = useState<"MATCHDAY" | "EQUIPMENT">("MATCHDAY");

  const handleSubmit = async () => {
    const expenseData = {
      description,
      amount: parseInt(amount),
      expenseType
    };
    const { success,data, error } = expenseInputTypes.safeParse(expenseData);
    if (!success) {
      setErrorMSG(error.issues[0]?.message);
    }
    console.log(data);
    if(!error){
      try {
        const response = await axiosClient.post("/api/v1/expence/add", data);
        console.log(response);
        
      } catch (error) {
        console.log(error);
        setErrorMSG("Something went wrong!!");
      }
    }
    setDescription("");
    setAmount("");
    
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Expense</Button>
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
                setDescription(e.target.value)
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
                setAmount(e.target.value)
                setErrorMSG(null);
              }}
              placeholder="e.g. 250"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select value={expenseType} onValueChange={(val) => setExpenseType(val as "MATCHDAY" | "EQUIPMENT")}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MATCHDAY">Matchday</SelectItem>
                <SelectItem value="EQUIPMENT">Equipment</SelectItem>
              </SelectContent>
            </Select>
          </div> 
          {errorMSG ? (
              <>
                <ErrorMessage message={errorMSG} />
              </>
            ) : (
              <></>
            )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Expense</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
