import { Card } from "@/components/ui/card";
import ContributionItem from "./ContributionItem";

type Contribution = {
  id: string;
  amount: number;
  type: "MATCHDAY" | "EQUIPMENT";
  status: "PENDING" | "PAID" | "DECLINED";
  player: {
    id: string;
    name: string;
  };
  playerId: string;
};

type Props = {
  contributions: Contribution[];
  markAsPaid: (contributionId: string, playerId: string) => Promise<void>;
};

const ContributionList: React.FC<Props> = ({ contributions, markAsPaid }) => {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-2">Contributions</h2>
      {contributions.length > 0 ? (
        <ul className="divide-y">
          {contributions.map((c) => (
            <ContributionItem
              key={c.id}
              contribution={c}
              markAsPaid={markAsPaid}
            />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">
          No contributions recorded.
        </p>
      )}
    </Card>
  );
};

export default ContributionList;
