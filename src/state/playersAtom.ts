import { selector } from "recoil";
import axiosClient from "@/utils/axiosClient";

export const allPlayersSelector = selector({
  key: "allPlayersSelector",
  get: async () => {
    try {
      const response = await axiosClient.get("/api/v1/player/getAllPlayers");
      if (response.data.statusCode !== 201) throw new Error("Failed to fetch players");
      return response.data.result;
    } catch (error) {
      console.error("Error fetching players:", error);
      return []; 
    }
  },
});
