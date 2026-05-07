import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const genderOptions = [
  "Male",
  "Female",
  "Other"
]

const activityOptions = [
  "Sedentary",
  "Lightly Active",
  "Moderately Active",
  "Very Active"
]

const goalOptions = [
  "Weight Loss",
  "Maintain Weight",
  "Muscle Gain"
]

const Signup = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    weight: "",
    height: "",
    country: "",
    activity: "",
    goal: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignup = (e) => {

    e.preventDefault()

    localStorage.setItem("user", JSON.stringify(formData))

    alert("Signup Successful")

    window.location.href = "/login"
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        marginTop: "40px",
        background: "#ffffff",
        padding: "40px",
        borderRadius: "24px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
      }}
    >

      <h1
        style={{
          marginBottom: "10px",
          color: "#0f172a"
        }}
      >
        Create Your Health Profile
      </h1>

      <p
        style={{
          marginBottom: "30px",
          color: "#64748b"
        }}
      >
        Setup your personalized nutrition tracking account
      </p>

      <form onSubmit={handleSignup}>

        <div style={gridStyle}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
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

          {/* Gender */}
          <select
            name="gender"
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">
              Select Gender
            </option>

            {genderOptions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          {/* DOB */}
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* Weight */}
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* Height */}
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* Country */}
          <select
            name="country"
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">
              Select Country
            </option>

            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
          </select>

          {/* Activity Level */}
          <select
            name="activity"
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">
              Activity Level
            </option>

            {activityOptions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          {/* Goal */}
          <select
            name="goal"
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">
              Fitness Goal
            </option>

            {goalOptions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

        </div>

        <button style={buttonStyle}>
          Create Account
        </button>

      </form>

      <p
        style={{
          marginTop: "20px",
          color: "#64748b"
        }}
      >
        Already have an account?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>

    </div>
  )
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginBottom: "30px"
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  background: "#ffffff"
}

const buttonStyle = {
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "14px",
  background: "#16a34a",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer"
}

export default Signup