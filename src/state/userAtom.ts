import { atom } from "recoil";
import { Player } from "@/types/session";

export const userAtom = atom<Player | null>({
  key: "profileAtom",
  default: null, 
});