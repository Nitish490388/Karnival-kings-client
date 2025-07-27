// hooks/useProfile.ts
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/state/userAtom";
import axiosClient from "@/utils/axiosClient";

export const useFetchProfile = () => {
  const setProfile = useSetRecoilState(userAtom);

  const fetchProfile = async () => {
    try {
      const res = await axiosClient.get("/api/v1/app/profile");
      if (res.data.statusCode === 201) {
        setProfile(res.data.result.player);
      } else { 
        setProfile(null);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setProfile(null);
    }
  };

  return fetchProfile;
};
