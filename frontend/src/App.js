import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

import DashbordPage from "./pages/DashbordPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AddUserPage from "./pages/AddUserPage";
import EditUserPage from "./pages/EditUserPage";

function App() {
  const token = localStorage.getItem("token");
  const admintoken = localStorage.getItem("admintoken");

  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/"
          element={token ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit"
          element={token ? <EditProfilePage /> : <Navigate to="/login" />}
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={admintoken ? <DashbordPage /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/admin-login"
          element={admintoken ? <Navigate to="/admin" /> : <AdminLoginPage />}
        />
        <Route
          path="/add-user"
          element={admintoken ? <AddUserPage /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/edit-user"
          element={admintoken ? <EditUserPage /> : <Navigate to="/admin-login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
