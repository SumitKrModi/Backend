import { useContext } from "react";
import Authcontext from "../auth.context.jsx";

const useAuth = () => {
  const context = useContext(Authcontext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
export default useAuth;
