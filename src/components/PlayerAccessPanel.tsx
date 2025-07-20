import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import axiosClient from "@/utils/axiosClient";
import { Player } from "@/types/session";

export function PlayerAccessPanel() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axiosClient.get("/api/v1/player/getNotApprovedAllPlayers");
        setPlayers(res.data.result.players);
        (res.data.result);
      } catch (err) {
        console.error("Failed to fetch players", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  const handleToggle = async (id: string, approved: boolean) => {
    try {
      await axiosClient.patch("/api/v1/player/", { isApproved: approved, id });

      // Remove the player from the list if approved (since we're only showing unapproved players)
      if (approved) {
        setPlayers((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to update player access", err);
    }
  };

  if (loading) {
    return <p className="p-4">Loading players...</p>;
  }

  return (
    <div className="p-4 max-w-[600px] space-y-4 mx-auto">
      <h2 className="text-xl font-semibold">Allow players to be part of our team</h2>
      {players.length > 0 ? (
        players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-2 border rounded-lg"
          >
            <div>
              <p className="font-medium">{player.name}</p>
              <p className="text-sm text-muted-foreground">{player.email}</p>
            </div>
            <Switch
              defaultChecked={player.isApproved}
              onCheckedChange={(val) => handleToggle(player.id, val)}
            />
          </div>
        ))
      ) : (
        <p className="text-muted-foreground">No unapproved players found.</p>
      )}
    </div>
  );
}
