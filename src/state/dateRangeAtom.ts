import { atom } from "recoil";

export const fromDateAtom = atom<Date | undefined>({
  key: "fromDate",
  default: undefined
});

export const toDateAtom = atom<Date | undefined>({
  key: "toDate",
  default: undefined
});