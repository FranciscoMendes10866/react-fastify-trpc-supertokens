import { useCallback } from "react";
import Session from "supertokens-web-js/recipe/session";
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react'

export const Dashboard = () => {
  const navigate = useNavigate();

  const logoutHandler = useCallback(async () => {
    await Session.signOut();
    navigate("/");
  }, []);

  return (
    <div>
      Dashboard Page
      <Button variant="solid" onClick={logoutHandler}>Logout</Button>
    </div>
  );
};
