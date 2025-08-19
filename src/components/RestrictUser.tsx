import { getItem, removeItem } from '@/utils/localStorageManager';
import { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  exp: number; // expiration time in seconds
  iat: number; // issued at (optional)
  id?: string;
  email?: string;
}

const RestrictUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem();

    if (!token) {
      navigate("/auth");
      return;
    }

    try {
      const decoded: JwtPayload = jwtDecode(token);

      // check if expired
      if (decoded.exp * 1000 < Date.now()) {
        removeItem();
        navigate("/auth");
      }
    } catch (err) {
      console.error("Invalid token:", err);
      removeItem();
      navigate("/auth");
    }
  }, [navigate]);

  return <Outlet />;
};

export default RestrictUser;
