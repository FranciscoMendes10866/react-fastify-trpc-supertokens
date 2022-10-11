import ReactDOM from "react-dom/client";
import SuperTokens from "supertokens-web-js";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import Session from "supertokens-web-js/recipe/session";
import { ChakraProvider } from "@chakra-ui/react";

import { App } from "./App";
import "./index.css";

SuperTokens.init({
  appInfo: {
    appName: "monorepo-auth",
    apiDomain: "http://localhost:3333",
    apiBasePath: "/api/auth",
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
