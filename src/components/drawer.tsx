import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";

const DrawerBTN: React.FC = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <Menu className="text-primary font-bold cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="w-[100px]">
        <DrawerHeader>
          <DrawerTitle>Hello Nitish! Have a Good day</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div></div>
        <div
          className="flex flex-col items-center gap-3 text-primary
            font-bold [&>span]:cursor-pointer [&>span]:transition-colors [&>span]:duration-200
            [&>span:hover]:text-primary/50 divide-y divide-gray-300"
        >
          <span className="py-2 w-full text-center">Home</span>
          <span className="py-2 w-full text-center">Team</span>
          <span className="py-2 w-full text-center">Gallery</span>
          <span className="py-2 w-full text-center">Cashflow</span>
        </div>

        <DrawerFooter>
          <DrawerClose>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerBTN;
