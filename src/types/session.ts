export type Player = {
  id: string;
  name: string;
  profilePic?: string | null;
  email: string;
  isApproved: boolean;
  
};

export type Refund = {
  id: string;
  amount: number;
  type: "MATCHDAY" | "EQUIPMENT"; // Type enum
  player: Player;
  playerId: string;
  status: "PENDING" | "PAID" | "DECLINED"; // Status enum
  date: string;
  sessionId: string;
};



export type ExpenseSession = {
  id: string;
  title: string;
  type: "MATCHDAY" | "EQUIPMENT";
  settles: boolean;
  players: Player[];
  expenses: Expense[];
  contributions: Contribution[];
  refunds: Refund[]; // Add this
  createdAt: Date;
};


// export interface Contribution {
//   id: string;
//   amount: number;
//   status: "PENDING" | "PAID";
//   type: string;
//   session: {
//     title: string;
//   };
//   playerId: string;
// }

export type Expense = {
  id: string;
  amount: number;
  description: string;
  date: string;
  playerId: string;
  paidBy: Player;
};

export type Contribution = {
  id: string;
  amount: number;
  type: "MATCHDAY" | "EQUIPMENT";
  player: Player;
  playerId: string;
  status: "PENDING" | "PAID" | "DECLINED";
  date: string;
  session: {
    id: string;
    title: string;
  };
  sessionId: string;
};