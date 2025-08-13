import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { availableFundAtom } from "../state/availableFundAtom";

export const useCashSocketListener = () => {
  const setAvailableFund = useSetRecoilState(availableFundAtom);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("wss://karnival-kings-server.onrender.com");
    socketRef.current = ws;

    ws.onopen = () => console.log("✅ WebSocket connected");
    ws.onmessage = (e) => {
      try {
        console.log("msg arrived from server:", e.data);
        const message = JSON.parse(e.data);
        if (message.type === "CASH_UPDATED") {
          setAvailableFund((prev) => ({
            ...prev,
            ...(message.expenseType === "MATCHDAY"
              ? { matchdayBalance: message.amount }
              : { equipmentBalance: message.amount }),
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    ws.onclose = () => console.log("❌ WebSocket disconnected");
    ws.onerror = (e) => console.error("🔥 WebSocket error", e);

    return () => {
      ws.close();
    };
  });
};
