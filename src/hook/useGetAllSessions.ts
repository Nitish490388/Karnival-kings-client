import { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient";
import { ExpenseSession } from "@/types/session";

export const useGetAllSessions = () => {

    const [data, setData] = useState<ExpenseSession[] | null>(null);
    useEffect(() => {
        const getData = async () => {
            const response = await axiosClient.get("/api/v1/matchday/getAllSessions");
            setData(response.data.result.sessions);
        }

        getData();
    },[]);

    return data;
}