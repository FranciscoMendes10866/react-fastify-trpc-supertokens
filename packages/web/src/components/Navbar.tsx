import {
  Box,
  Button,
  Container,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useCallback } from "react";
import Session from "supertokens-web-js/recipe/session";
import { useNavigate } from "react-router-dom";

import { emitter } from "../utils/emitter";

export const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = useCallback(async () => {
    await Session.signOut();
    emitter.emit("sign-out-evt");
    navigate("/");
  }, []);

  return (
    <Box as="section">
      <Box as="nav" bg="bg-surface" boxShadow={{ sm: "sm", md: "sm-dark" }}>
        <Container py={{ base: "4", lg: "5" }} maxW="6xl">
          <Flex justify="space-between" flex="1">
            <Text>Dashboard</Text>
            <Button variant="solid" onClick={logoutHandler}>
              Logout
            </Button>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};
