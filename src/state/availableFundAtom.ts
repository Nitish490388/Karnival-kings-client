import { atom } from 'recoil';

type availableFundAtomType = {
  matchdayBalance: number,
  equipmentBalance: number
}

export const availableFundAtom = atom<availableFundAtomType>({
  key: 'availableFund', 
  default: {
    matchdayBalance: 0,
    equipmentBalance: 0
  },           
});