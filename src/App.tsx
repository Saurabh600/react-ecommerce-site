import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashbord" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
