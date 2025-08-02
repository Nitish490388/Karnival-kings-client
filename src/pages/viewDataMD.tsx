import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useRecoilValue } from "recoil";
import { fromDateAtom, toDateAtom } from "@/state/dateRangeAtom";
import axiosClient from "@/utils/axiosClient";

type Session = {
  id: string;
  title: string;
  createdAt: string;
  contributions: any[];
  expenses: any[];
  availableFund: number;
};

type EquipmentData = {
  availableFund: number;
  sessions: Session[];
};

export default function ViewdataMD() {
  const [data, setData] = useState<EquipmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const fromDate = useRecoilValue(fromDateAtom);
  const toDate = useRecoilValue(toDateAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/api/v1/matchday/getdata", {
          params: {
            fromDate,
            toDate,
          },
        });
        const json = response.data;
        if (json.statusCode === 201) {
          setData(json.result);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toDate, fromDate]);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (fromDate) {
      newParams.set("from", format(fromDate, "dd-MM-yyyy"));
    } else {
      newParams.delete("from");
    }

    if (toDate) {
      newParams.set("to", format(toDate, "dd-MM-yyyy"));
    } else {
      newParams.delete("to");
    }

    setSearchParams(newParams);
  }, [fromDate, toDate]);

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Matchday Sessions</h1>

      {data?.sessions.length === 0 ? (
        <p className="text-gray-500">No sessions found for the selected date range.</p>
      ) : (
        data?.sessions.map((session) => (
          <Card
            key={session.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/session/${session.id}`)}
          >
            <CardHeader>
              <CardTitle className="text-xl">{session.title}</CardTitle>
              <p className="text-sm text-gray-500">
                Created on {format(new Date(session.createdAt), "dd MMM yyyy")}
              </p>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-1">
              <p>🪙 Available Fund: ₹{session.availableFund}</p>
              <p>👥 Contributions: {session.contributions.length}</p>
              <p>💸 Expenses: {session.expenses.length}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
