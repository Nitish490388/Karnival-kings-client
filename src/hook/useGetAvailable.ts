import axiosClient from "@/utils/axiosClient";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { availableFundAtom } from "@/state/availableFundAtom";

export const useGetAvailableFund = () => {
  const setValue = useSetRecoilState(availableFundAtom);

  useEffect(() => {
    const fetchAvailableFund = async () => {
      try {
        const { data } = await axiosClient.get("/api/v1/app/availableFund");
        const { matchdayBalance, equipmentBalance } = data.result;

        setValue({ matchdayBalance, equipmentBalance });
      } catch (error) {
        console.error("Failed to fetch available fund:", error);
      }
    };

    fetchAvailableFund();
  }, []);

  return;
};
