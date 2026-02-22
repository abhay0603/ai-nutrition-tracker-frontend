import { useState } from "react"
import { TypeAnimation } from "react-type-animation"
import Particles from "@tsparticles/react"
import { loadFull } from "tsparticles"

const minecraftStyle = {
  fontFamily: "'Press Start 2P', cursive",
  letterSpacing: "2px"
}


const Home = () => {
  const [preview, setPreview] = useState(null)

  const particlesInit = async (main) => {
    await loadFull(main)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div style={{ textAlign: "center", position: "relative" }}>

      {/* Particle Background */}
      <Particles
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 40 },
            size: { value: 3 },
            move: { speed: 1 },
            opacity: { value: 0.4 },
            color: { value: "#00f5ff" }
          }
        }}
        style={{ position: "absolute", top: 0, left: 0 }}
      />

      {/* Hero Title */}
      <h1
        style={{
          fontSize: "48px",
          background: "linear-gradient(90deg,#00f5ff,#00ff88)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "20px",
          marginTop: "40px"
        }}
      >
        Smart AI Meal Analysis
      </h1>

      {/* Typing Animation */}
      <div style={{ fontSize: "20px", marginBottom: "40px" }}>
        <TypeAnimation
          sequence={[
            "Upload your meal image...",
            2000,
            "Detect food using AI...",
            2000,
            "Calculate calories instantly...",
            2000,
            "Track your health smartly...",
            2000
          ]}
          speed={50}
          repeat={Infinity}
        />
      </div>

      {/* Upload Card */}
      <div
        style={{
          margin: "auto",
          width: "450px",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <p style={{ marginBottom: "20px" }}>
          Drag & Drop your image or select file
        </p>

        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginBottom: "20px" }}
        />

        {preview && (
          <div style={{ marginBottom: "20px" }}>
            <img
              src={preview}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 0 20px rgba(0,255,200,0.6)"
              }}
            />
          </div>
        )}

        <button
          style={{
            padding: "12px 30px",
            borderRadius: "25px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            background: "linear-gradient(90deg,#00f5ff,#00ff88)",
            color: "#000",
            boxShadow: "0 0 20px rgba(0,255,200,0.8)",
            transition: "0.3s"
          }}
          onMouseOver={(e) =>
            (e.target.style.boxShadow = "0 0 40px rgba(0,255,200,1)")
          }
          onMouseOut={(e) =>
            (e.target.style.boxShadow = "0 0 20px rgba(0,255,200,0.8)")
          }
        >
          Analyze with AI
        </button>
      </div>

      {/* Example Result Section */}
      <div
        style={{
          marginTop: "60px",
          padding: "30px",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.05)",
          display: "inline-block",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
        }}
      >
        <h3>Example AI Result:</h3>
        <p>🍚 Rice - 250g</p>
        <p>🥣 Dal - 150g</p>
        <p><strong>Total Calories: 540 kcal</strong></p>
      </div>

    </div>
  )
}

export default Home