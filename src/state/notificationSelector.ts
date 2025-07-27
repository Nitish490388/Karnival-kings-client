import { selector } from "recoil";
import axiosClient from "@/utils/axiosClient";
import { Contribution } from "@/types/session";

export const notificationSelector = selector({
  key: "notificationSelector",
  get: async () => {
    try {
      const response = await axiosClient.get("/api/v1/contributions/pendings");
      const pending: Contribution[] = response.data.result.pendingContributions;
      return pending.length;
    } catch (error) {
      console.error("Error fetching players:", error);
      return 0; 
    }
  },
});
