

import { Routes, Route, Link, Navigate } from "react-router-dom"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import About from "./pages/About"
import Signup from "./pages/Signup"
import ProtectedRoute from "./pages/ProtectedRoute"
import Profile from "./pages/Profile"

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif", background: "#f8fafc" }}>

      {/* Sidebar */}
      <div style={{
        width: "240px",
        background: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        padding: "30px 20px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <img src="/logo.png" alt="logo" style={{ width: "70px" }} />
          <h3 style={{ marginTop: "10px", color: "#16a34a" }}>AI Nutrition</h3>
        </div>

        {isLoggedIn ? (
  <>
    <SidebarLink to="/" text="Home" />
    <SidebarLink to="/dashboard" text="Dashboard" />
    <SidebarLink to="/profile" text="Profile" />
    <SidebarLink to="/about" text="About" />

    <button
      onClick={() => {
        localStorage.removeItem("isLoggedIn")
        window.location.href = "/login"
      }}
      style={{
        marginTop: "20px",
        padding: "10px 16px",
        border: "none",
        borderRadius: "10px",
        background: "#ef4444",
        color: "#fff",
        cursor: "pointer"
      }}
    >
      Logout
    </button>
  </>
) : (
  <>
    <SidebarLink to="/login" text="Login" />
    <SidebarLink to="/signup" text="Signup" />
  </>
)}
      </div>


      {/* Main */}
      <div style={{ flex: 1, padding: "40px" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route
          path="/"
          element={
          <ProtectedRoute>
            <Home />
            </ProtectedRoute>
            }
            />
            <Route
            path="/dashboard"
            element={
            <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>
              }
              />
              <Route
              path="/about"
              element={
              <ProtectedRoute>
                <About />
                </ProtectedRoute>
                }
                />
                {/* Redirect */}
                <Route path="*" element={<Navigate to="/" />} />

                <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
                </Routes>
                </div>

    </div>
  )
}

const SidebarLink = ({ to, text }) => (
  <div style={{ marginBottom: "20px" }}>
    <Link to={to} style={{ textDecoration: "none", color: "#334155", fontSize: "14px" }}>
      {text}
    </Link>
  </div>
)

export default App