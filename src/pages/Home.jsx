import { useState } from "react"
import { TypeAnimation } from "react-type-animation"
import Particles from "@tsparticles/react"
import { loadFull } from "tsparticles"

const nutritionData = {
  rice: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  dal: { calories: 116, protein: 9, carbs: 20, fat: 0.4 },
  roti: { calories: 120, protein: 3, carbs: 22, fat: 2 },
  apple: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  banana: { calories: 96, protein: 1.3, carbs: 27, fat: 0.3 },
  pizza: { calories: 266, protein: 11, carbs: 33, fat: 10 },
  burger: { calories: 295, protein: 17, carbs: 30, fat: 12 }
}

// Approx gram conversion for 1 piece
const pieceToGram = {
  roti: 40,
  apple: 150,
  banana: 120,
  burger: 200,
  pizza: 180
}

const Home = () => {
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [detections, setDetections] = useState([])
  const [loading, setLoading] = useState(false)
  const [inputs, setInputs] = useState({})
  const [totals, setTotals] = useState(null)
  const [manualFood, setManualFood] = useState("")

  const particlesInit = async (main) => {
    await loadFull(main)
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setDetections([])
      setTotals(null)
    }
  }

  const handleAnalyze = async () => {
    if (!file) return alert("Please select an image first.")

    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)

    try {
      const response = await fetch(
        "https://akg-247-ai-nutrition-backend.hf.space/detect",
        {
          method: "POST",
          body: formData,
        }
      )

      const data = await response.json()
      setDetections(data.detections || [])
    } catch (error) {
      alert("Error connecting to AI server.")
    }

    setLoading(false)
  }

  const handleInputChange = (food, field, value) => {
    setInputs({
      ...inputs,
      [food]: {
        ...inputs[food],
        [field]: value
      }
    })
  }

  const calculateNutrition = () => {
    let totalCalories = 0
    let totalProtein = 0
    let totalCarbs = 0
    let totalFat = 0

    detections.forEach(item => {
      const name = item.class.toLowerCase()
      const data = nutritionData[name]
      const entry = inputs[name]

      if (!data || !entry) return

      let grams = 0

      if (entry.unit === "gm") {
        grams = entry.quantity
      } else if (entry.unit === "piece") {
        grams = entry.quantity * (pieceToGram[name] || 100)
      } else if (entry.unit === "ml") {
        grams = entry.quantity // assume 1ml ≈ 1g
      }

      const factor = grams / 100

      totalCalories += data.calories * factor
      totalProtein += data.protein * factor
      totalCarbs += data.carbs * factor
      totalFat += data.fat * factor
    })

    setTotals({
      calories: totalCalories.toFixed(1),
      protein: totalProtein.toFixed(1),
      carbs: totalCarbs.toFixed(1),
      fat: totalFat.toFixed(1)
    })
  }

  const saveMeal = () => {
  if (!totals) return alert("Please calculate nutrition first")

  const now = new Date()

  const meal = {
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    foods: detections.map(d => d.class),
    calories: totals.calories,
    protein: totals.protein,
    carbs: totals.carbs,
    fat: totals.fat
  }

  const existing = JSON.parse(localStorage.getItem("meals")) || []

  existing.push(meal)

  localStorage.setItem("meals", JSON.stringify(existing))

  alert("Meal Saved Successfully!")
}

  return (
    <div style={{ textAlign: "center", position: "relative", paddingBottom: "100px" }}>

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

      <div style={{ fontSize: "20px", marginBottom: "40px" }}>
        <TypeAnimation
          sequence={[
            "Upload your meal image...",
            2000,
            "Detect food using AI...",
            2000,
            "Calculate calories instantly...",
            2000
          ]}
          speed={50}
          repeat={Infinity}
        />
      </div>

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
        <input type="file" onChange={handleFileChange} style={{ marginBottom: "20px" }} />

        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              borderRadius: "10px",
              marginBottom: "20px"
            }}
          />
        )}

        <button
          onClick={handleAnalyze}
          style={{
            padding: "12px 30px",
            borderRadius: "25px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            background: "linear-gradient(90deg,#00f5ff,#00ff88)",
            color: "#000"
          }}
        >
          {loading ? "Analyzing..." : "Analyze with AI"}
        </button>
      </div>

      {detections.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h3>Detected Items</h3>

          

          {detections.map((item, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <strong>{item.class}</strong>

              <div>
                <input
                  type="number"
                  placeholder="Quantity"
                  onChange={(e) =>
                    handleInputChange(item.class.toLowerCase(), "quantity", Number(e.target.value))
                  }
                  style={{ marginRight: "10px" }}
                />

                <select
                  onChange={(e) =>
                    handleInputChange(item.class.toLowerCase(), "unit", e.target.value)
                  }
                >
                  <option value="gm">Gram (gm)</option>
                  <option value="piece">Piece</option>
                  <option value="ml">Milliliter (ml)</option>
                </select>
              </div>
            </div>
          ))}


          <div style={{ marginTop: "20px" }}>
    <input
    type="text"
    placeholder="Add missing food manually"
    value={manualFood}
    onChange={(e) => setManualFood(e.target.value)}
    style={{ marginRight: "10px" }}
  />

  <button
    onClick={() => {
      if (manualFood.trim()) {
        setDetections([
          ...detections,
          { class: manualFood, confidence: 1 }
        ])
        setManualFood("")
      }
    }}
  >
    Add Food
  </button>
</div>
          <button
            onClick={calculateNutrition}
            style={{
              marginTop: "20px",
              padding: "10px 25px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background: "#00ff88",
              fontWeight: "bold"
            }}
          >
            Calculate Nutrition
          </button>
        </div>
      )}

      {totals && (
  <div style={{ marginTop: "30px" }}>
    <h3>Total Nutrition</h3>
    <p>Calories: {totals.calories} kcal</p>
    <p>Protein: {totals.protein} g</p>
    <p>Carbs: {totals.carbs} g</p>
    <p>Fat: {totals.fat} g</p>

    {/* ✅ ADD THIS BUTTON */}
    <button
      onClick={saveMeal}
      style={{
        marginTop: "20px",
        padding: "10px 25px",
        borderRadius: "20px",
        border: "none",
        background: "#00ff88",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      Save Meal
    </button>
  </div>
)}
    </div>
  )
}

export default Home