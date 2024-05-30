import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import SignInForm from "./SignInForm";

interface AuthContextProps {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
}

interface AuthWrapperProps {
  children: ReactNode;
  initialToken?: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthWrapperProps {
  /*...*/
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  initialToken,
}) => {
  const [token, setToken] = useState<string | undefined>(
    initialToken || Cookies.get("token")
  );
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div>Loading...</div>; // Replace this with your actual loading state
  }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {token ? children : <SignInForm />}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
