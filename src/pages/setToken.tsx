import { setItem } from "@/utils/localStorageManager";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SetToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      setItem(token);

      // Clean up URL
      window.history.replaceState({}, document.title, "/setToken");
      navigate("/cashflow");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <p>Setting up your account...</p>;
}
