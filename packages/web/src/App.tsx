import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";

import { RequireAuth } from "./components/RequireAuth";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
