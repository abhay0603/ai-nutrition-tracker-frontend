import { useEffect, useState } from "react"

const Profile = () => {

  const savedUser = JSON.parse(localStorage.getItem("user"))

  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    gender: "",
    dob: "",
    weight: "",
    height: "",
    country: "",
    goal: "",
    activity: ""
  })

  const [editing, setEditing] = useState(false)

  useEffect(() => {

    const savedProfile = JSON.parse(localStorage.getItem("profile"))

    if (savedProfile) {

      setProfile(savedProfile)

    } else if (savedUser) {

      setProfile({
        name: savedUser.name || "",
        username: savedUser.username || "",
        email: savedUser.email || "",
        gender: savedUser.gender || "",
        dob: savedUser.dob || "",
        weight: savedUser.weight || "",
        height: savedUser.height || "",
        country: savedUser.country || "",
        goal: savedUser.goal || "",
        activity: savedUser.activity || ""
      })

    }

  }, [])

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {

    localStorage.setItem("profile", JSON.stringify(profile))

    alert("Profile Saved")

    setEditing(false)
  }

  // BMI
  const bmi =
    profile.height && profile.weight
      ? (
          profile.weight /
          ((profile.height / 100) * (profile.height / 100))
        ).toFixed(1)
      : "--"

  // Age Calculation
  const calculateAge = (dob) => {

    if (!dob) return "--"

    const birthDate = new Date(dob)
    const today = new Date()

    let age = today.getFullYear() - birthDate.getFullYear()

    const monthDiff =
      today.getMonth() - birthDate.getMonth()

    if (
      monthDiff < 0 ||
      (
        monthDiff === 0 &&
        today.getDate() < birthDate.getDate()
      )
    ) {
      age--
    }

    return age
  }

  const age = calculateAge(profile.dob)

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden"
      }}
    >

      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "rgba(255,0,0,0.08)",
          borderRadius: "50%",
          top: "-100px",
          left: "-100px",
          filter: "blur(80px)"
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "rgba(255,255,255,0.25)",
          borderRadius: "50%",
          bottom: "-100px",
          right: "-100px",
          filter: "blur(80px)"
        }}
      />

      {/* Main Card */}
      <div
        style={{
          position: "relative",
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          padding: "40px",
          borderRadius: "30px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          border: "1px solid rgba(255,255,255,0.3)"
        }}
      >

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px"
          }}
        >

          <div>

            <h1
              style={{
                marginBottom: "10px",
                fontSize: "38px",
                color: "#0f172a"
              }}
            >
              {profile.name || "User Profile"}
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "16px"
              }}
            >
              @{profile.username}
            </p>

          </div>

          <button
            onClick={() =>
              editing ? handleSave() : setEditing(true)
            }
            style={{
              padding: "14px 24px",
              border: "none",
              borderRadius: "14px",
              background: "#f51010",
              color: "#ffffff",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(236, 7, 7, 0.25)"
            }}
          >
            {editing ? "Save Profile" : "Edit Profile"}
          </button>

        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "22px"
          }}
        >

          <ProfileInput
            label="Full Name"
            name="name"
            value={profile.name}
            editing={editing}
            onChange={handleChange}
          />

          <ProfileInput
            label="Email"
            name="email"
            value={profile.email}
            editing={editing}
            onChange={handleChange}
          />

          <ProfileInput
            label="Gender"
            name="gender"
            value={profile.gender}
            editing={editing}
            onChange={handleChange}
          />

          <ProfileInput
            label="Age"
            name="age"
            value={age}
            editing={false}
          />

          <ProfileInput
            label="Weight (kg)"
            name="weight"
            value={profile.weight}
            editing={editing}
            onChange={handleChange}
          />

          <ProfileInput
            label="Height (cm)"
            name="height"
            value={profile.height}
            editing={editing}
            onChange={handleChange}
          />

          <ProfileInput
            label="Country"
            name="country"
            value={profile.country}
            editing={editing}
            onChange={handleChange}
          />

          <ProfileInput
            label="Fitness Goal"
            name="goal"
            value={profile.goal}
            editing={editing}
            onChange={handleChange}
          />

          <ProfileInput
            label="Activity Level"
            name="activity"
            value={profile.activity}
            editing={editing}
            onChange={handleChange}
          />

        </div>

        {/* Advanced BMI Section */}
        <div
          style={{
            marginTop: "40px",
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(14px)",
            padding: "35px",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.35)"
          }}
        >

          <h2
            style={{
              marginBottom: "12px",
              color: "#0f172a"
            }}
          >
            BMI Health Analysis
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: "30px"
            }}
          >
            Personalized BMI indicator based on your profile.
          </p>

          {/* BMI Value */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "30px"
            }}
          >

            <h1
              style={{
                fontSize: "58px",
                color:
                  bmi < 18.5
                    ? "#ef4444"
                    : bmi < 25
                    ? "#16a34a"
                    : "#f59e0b",
                margin: 0
              }}
            >
              {bmi}
            </h1>

            <div>

              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#0f172a",
                  marginBottom: "6px"
                }}
              >
                {
                  bmi < 18.5
                    ? "Underweight"
                    : bmi < 25
                    ? "Healthy"
                    : bmi < 30
                    ? "Overweight"
                    : "Obese"
                }
              </p>

              <p
                style={{
                  color: "#64748b"
                }}
              >
                Age: {age} yrs • {profile.gender}
              </p>

            </div>

          </div>

          {/* BMI Scale */}
          <div
            style={{
              position: "relative",
              marginTop: "20px"
            }}
          >

            {/* Gradient Bar */}
            <div
              style={{
                height: "18px",
                borderRadius: "999px",
                background:
                  "linear-gradient(to right, rgba(239,68,68,0.7), rgba(255,255,255,0.95), rgba(34,197,94,0.8))",
                position: "relative",
                overflow: "hidden"
              }}
            />

            {/* Marker */}
            <div
              style={{
                position: "absolute",
                top: "-8px",
                left: `${Math.min((bmi / 40) * 100, 100)}%`,
                transform: "translateX(-50%)",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "#0f172a",
                border: "4px solid white",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
              }}
            />

          </div>

          {/* Labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "12px",
              fontSize: "13px",
              color: "#64748b"
            }}
          >

            <span>Underweight</span>
            <span>Healthy</span>
            <span>Overweight</span>

          </div>

        </div>

      </div>

    </div>
  )
}

const ProfileInput = ({
  label,
  name,
  value,
  editing,
  onChange
}) => (

  <div>

    <p
      style={{
        marginBottom: "10px",
        color: "#64748b",
        fontSize: "14px",
        fontWeight: "500"
      }}
    >
      {label}
    </p>

    {editing ? (

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "92%",
          padding: "14px",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,0.4)",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(10px)",
          fontSize: "15px"
        }}
      />

    ) : (

      <div
        style={{
          padding: "14px",
          background: "rgba(255,255,255,0.4)",
          borderRadius: "14px",
          minHeight: "22px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.3)"
        }}
      >
        {value || "--"}
      </div>

    )}

  </div>
)

export default Profile