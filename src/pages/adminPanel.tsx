import GalleryPostForm from "@/components/GalleryPostForm";
import { PlayerAccessPanel } from "@/components/PlayerAccessPanel";

const AdminPanel   = () => {
  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold text-primary">ADMIN CONTROL</h1>
      <GalleryPostForm/>
      <PlayerAccessPanel/>
    </div>
  )
}

export default AdminPanel;