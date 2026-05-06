// src/hooks/useAutoLogout.js
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "./useAxiosSecure";

const useAutoLogout = () => {
  const timer = useRef(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axiosSecure.get("/logout", { withCredentials: true });
      localStorage.removeItem("access-token");
      navigate("/login");
    } catch (err) {
      console.error("Auto logout failed:", err);
    }
  };

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(logoutUser, 60 * 1000); // 1 minute
  };

  useEffect(() => {
    const events = ["mousemove", "mousedown", "click", "scroll", "keypress"];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // Initial timer start

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
};

export default useAutoLogout;
