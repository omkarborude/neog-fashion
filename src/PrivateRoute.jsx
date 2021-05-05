import { Navigate, Route } from "react-router-dom";
import { useAuth } from "./Context/AuthContext/AuthProvider";

export const PrivateRoute = ({ path, ...props }) => {
  const { isUserloggedIn } = useAuth();

  return isUserloggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
