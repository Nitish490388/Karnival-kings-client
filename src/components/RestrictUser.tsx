import {useEffect} from 'react'
import { Outlet, useNavigate } from "react-router-dom";


const RestrictUser = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const getCookie = (name: string): string | null => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
          return null;
        };
      
        const token = getCookie('token');
        console.log(token);
        

        if (!token) {
            navigate("/auth");
        }
      }, []);
    return (
        <>
            <Outlet/>
        </>
    )    
}

export default RestrictUser;