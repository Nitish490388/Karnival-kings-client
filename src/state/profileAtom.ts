import { selector } from "recoil";
import axiosClient from "@/utils/axiosClient";

export const profileSelector = selector({
  key: "profileSelector",
  get: async () => {
    try {
      const response = await axiosClient.get("/api/v1/app/profile");

      if (response.data.statusCode !== 201 || !response.data.result?.player) {
        throw new Error("Invalid profile data");
      }

      return response.data.result.player;
    } catch (error) {
      console.error("Error fetching profile data:", error);
      return null; 
    }
  },
});
