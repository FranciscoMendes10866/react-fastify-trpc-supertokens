import { useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createNanoEvents } from "nanoevents";

import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";

import { RequireAuth } from "./components/RequireAuth";
import { trpc } from "./utils/trpc";

export const emitter = createNanoEvents();

export const App = () => {
  const queryClient = useMemo(() => new QueryClient(), []);

  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: "http://localhost:3333/trpc",
          }),
        ],
      }),
    []
  );

  useEffect(() => {
    return emitter.on("sign-out-evt", () => {
      queryClient.clear();
    });
  }, [queryClient]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
