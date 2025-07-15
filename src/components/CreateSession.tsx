import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRecoilValueLoadable } from "recoil";
import { allPlayersSelector } from "@/state/playersAtom";
import axiosClient from "@/utils/axiosClient";
import { Input } from "./ui/input";



interface playerType {
  id:   string;
  name: string
}


export default function CreateSession() {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const playerLoadable = useRecoilValueLoadable(allPlayersSelector);

  const playersList: playerType[] = playerLoadable.contents;
  

  const togglePlayer = (id: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleCreateSession = async () => {
    const response = await axiosClient.post("/api/v1/matchday/createMatchdaySession", {selectedPlayers, title});
    console.log(response);
  };

  if (playerLoadable.state === "loading") {
    return (
      <p className="text-center text-muted-foreground">Loading players...</p>
    );
  }

  if (playerLoadable.state === "hasError") {
    return <p className="text-center text-red-500">Failed to load players.</p>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button className="mt-12 flex items-center" variant="secondary">Create A MatchDay Expense Session</Button> */}
        <Button>Create a Match Day Session</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          
          <DialogTitle className="mb-3">Select Players for the Session</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-80 overflow-scroll p-6 ">
          {playersList.map((player) => (
            <div key={player.id} className="flex items-center space-x-2 ">
              <Checkbox
                id={player.id}
                checked={selectedPlayers.includes(player.id)}
                onCheckedChange={() => togglePlayer(player.id)}
              />
              <Label htmlFor={player.id}>{player.name}</Label>
            </div>
          ))}
        </div>
          <Input type="text" placeholder="Enter title" onChange={(e) => {
            setTitle(e.target.value);
          }}/>
        <DialogFooter>
          <Button onClick={handleCreateSession}>Create Session</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
