import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";


const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:2000/api/auth", {
        withCredentials: true,
      })
      .then(() => {
        setIsAuth(true);
      })
      .catch(() => {
        setIsAuth(false);
      });
  }, []);

  if (isAuth === null) {
    return <p>Loading...</p>;
  }

  return isAuth ? <Navigate to="/profile" replace /> : children;
};

export default GuestRoute;