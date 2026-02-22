import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import About from "./pages/About"

function App() {
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

        <SidebarLink to="/" text="Home" />
        <SidebarLink to="/dashboard" text="Dashboard" />
        <SidebarLink to="/login" text="Login" />
        <SidebarLink to="/about" text="About" />
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "40px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
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