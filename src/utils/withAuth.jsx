import { getSession } from "next-auth/react";
import React from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
      const checkAuth = async () => {
        const session = await getSession();
        if (!session) {
          window.location.href = "/login"; // Redirige al inicio de sesión
        } else {
          setIsAuthenticated(true);
        }
      };
      checkAuth();
    }, []);

    if (!isAuthenticated) return null; // O un spinner de carga

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;