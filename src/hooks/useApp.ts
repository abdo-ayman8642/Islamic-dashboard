import { useLocation, useNavigate } from "react-router-dom";

const useApp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    currentRoute: location.pathname,
    push: (payload: string) => navigate(payload),
  };
};

export default useApp;
