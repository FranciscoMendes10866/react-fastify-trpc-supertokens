import { useCallback, useLayoutEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Session from "supertokens-web-js/recipe/session";
import { Spinner, Box } from "@chakra-ui/react";

export const RequireAuth = () => {
  const [hasSession, setHasSession] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();

  const verifySession = useCallback(async () => {
    try {
      setIsLoading(true);
      const doesSessionExist = await Session.doesSessionExist();
      setHasSession(doesSessionExist);
    } catch {
      setHasSession(false);
    } finally {
      setIsLoading(false);
    }
  }, [setHasSession, setIsLoading]);

  useLayoutEffect(() => {
    verifySession();
  }, [location.pathname]);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" h="100vh" w="full">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!hasSession) {
    return <Navigate to={{ pathname: "/" }} state={{ location }} replace />;
  }

  return <Outlet />;
};
