import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()

    const savedUser = JSON.parse(localStorage.getItem("user"))

    if (
      savedUser &&
      savedUser.email === loginData.email &&
      savedUser.password === loginData.password
    ) {

      localStorage.setItem("isLoggedIn", "true")

      window.location.href = "/"
    } else {
      alert("Invalid Credentials")
    }
  }

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "auto",
        marginTop: "60px",
        background: "#ffffff",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button style={buttonStyle}>
          Login
        </button>

      </form>

      <p style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <Link to="/signup">Signup</Link>
      </p>
    </div>
  )
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "15px"
}

const buttonStyle = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background: "#16a34a",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer"
}

export default Login