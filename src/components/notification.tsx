import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import axiosClient from "@/utils/axiosClient";
import { Link } from "react-router-dom";

const NotificationBell = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosClient.get("/api/v1/contributions/pendings");
        setCount(response.data.result.pendingContributions.length || 0);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Link to="/checklist">
    <div className="relative cursor-pointer">
      <Bell className="w-6 h-6 text-muted-foreground"/>
      {count > 0 && (
        <span
          className={cn(
            "absolute -top-1 -right-1 bg-red-600 text-white text-xs",
            "rounded-full px-1.5 py-0.5 min-w-[18px] text-center"
          )}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </div>
    </Link>
  );
};

export default NotificationBell;
