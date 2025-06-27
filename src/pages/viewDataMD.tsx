import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { useRecoilValue } from "recoil";
import { fromDateAtom, toDateAtom } from "@/state/dateRangeAtom";
import axiosClient from "@/utils/axiosClient";

// import { useRecoilValue } from 'recoil';
// import {availableFundAtom} from "@/state/availableFundAtom";

type EquipmentData = {
  availableFund: number;
  contributions: any[];
  expenses: any[];
};

export default function ViewdataMD() {
  const [data, setData] = useState<EquipmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const fromDate = useRecoilValue(fromDateAtom);
  const toDate = useRecoilValue(toDateAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/api/v1/matchday/getdata", {
          params: {
            fromDate,
            toDate,
          },
        });
        console.log(response);
        const json = response.data;
        if (json.statusCode === 201) {
          setData(json.result);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err: any) {
        setError(err.message);
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

  const fallbackAvatar =
    "https://ui-avatars.com/api/?name=Unknown&background=ddd&color=555";

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Available Fund</CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={`text-2xl font-bold ${
              (data?.availableFund ?? 0) < 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            ₹ {data?.availableFund ?? 0}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contributions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data?.contributions?.length ? (
            data.contributions.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 border rounded-md shadow-sm"
              >
                <img
                  src={item.player?.profilePic || fallbackAvatar}
                  alt={item.player?.name || "User"}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-medium truncate">
                    {item.player?.name || "Unknown"}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {new Date(item.date).toLocaleString()}
                  </p>
                </div>
                <div className="text-sm sm:text-base font-semibold text-green-600 whitespace-nowrap">
                  ₹ {item.amount}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No contributions found.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data?.expenses?.length ? (
            data.expenses.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 border rounded-md shadow-sm"
              >
                <img
                  src={item.player?.profilePic || fallbackAvatar}
                  alt={item.player?.name || "User"}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-medium truncate">
                    {item.player?.name || "Unknown"}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {new Date(item.date).toLocaleString()}
                  </p>
                </div>
                <div className="text-sm sm:text-base font-semibold text-red-600 whitespace-nowrap">
                  ₹ {item.amount}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No expenses found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
