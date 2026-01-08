import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Resume from "./components/Resume";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "./context/AuthContext";

function App() {
  // Initialize Firebase
  const { user, auth } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </>
  );
}

export default App;
