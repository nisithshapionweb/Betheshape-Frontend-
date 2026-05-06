import { Navigate, useLocation } from "react-router-dom";
import CustomLoading from "../components/Loading/CustomLoading";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  // useAutoLogout();

  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <CustomLoading/>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

