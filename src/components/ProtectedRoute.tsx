import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/authContext";

interface IProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({children}: IProtectedRouteProps) => {
   const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" />
  } 
  return children;
}

export default ProtectedRoute