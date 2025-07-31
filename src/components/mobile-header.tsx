import DrawerBTN from "./drawer";
import { ModeToggle } from "./mode-toggle";
import NotificationBell from "./notification";



const MobileHeader: React.FC = () => {
 
  return (
    <div
      className="w-full md:hidden bg-secondary/30 backdrop-blur-sm border-b
         border-secondary/20 shadow-md py-2 flex items-center justify-between px-4"
    >
      <h2 className="font-bold text-primary text-2xl">Karnival Kings</h2>
      <div className="flex gap-8">
       
        <div className="flex gap-4 items-center">
            <NotificationBell/>
            <ModeToggle />
          </div>
        <DrawerBTN />
      </div>
    </div>
  );
};

export default MobileHeader;
