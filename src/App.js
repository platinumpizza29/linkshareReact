import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./services/verifyToken";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
