export type Player = {
  id: string;
  name: string;
  profilePic?: string | null;
  email: string;
  isApproved: boolean;
  
};

export type ExpenseSession = {
  id: string;
  title: string;
  type: "MATCHDAY" | "EQUIPMENT";
  settles: boolean;
  players: Player[];
};
