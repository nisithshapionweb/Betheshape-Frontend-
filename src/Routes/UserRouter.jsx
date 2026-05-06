import { Navigate } from "react-router-dom";
import CustomLoading from "../components/Loading/CustomLoading";
import useRole from "../hooks/useRole";

const UserRoute = ({ children }) => {
  const { role, isLoading, error } = useRole();

  if (isLoading) return <CustomLoading/>

  if (role === "user") return children;

  return <Navigate to="/login" replace />;
};

export default UserRoute;
