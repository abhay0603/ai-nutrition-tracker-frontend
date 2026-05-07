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

    if (!file) {
      return alert("Please select an image first.")
    }

    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)

    try {

      const response = await fetch(
        "https://akg-247-ai-nutrition-backend.hf.space/detect",
        {
          method: "POST",
          body: formData
        }
      )

      const data = await response.json()

      setDetections(data.detections || [])

    }
    catch (error) {

      alert("Error connecting to AI server.")

    }

    setLoading(false)

  }

  const handleInputChange = (
    food,
    field,
    value
  ) => {

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
      }
      else if (entry.unit === "piece") {
        grams =
          entry.quantity *
          (pieceToGram[name] || 100)
      }
      else if (entry.unit === "ml") {
        grams = entry.quantity
      }

      const factor = grams / 100

      totalCalories +=
        data.calories * factor

      totalProtein +=
        data.protein * factor

      totalCarbs +=
        data.carbs * factor

      totalFat +=
        data.fat * factor

    })

    setTotals({
      calories: totalCalories.toFixed(1),
      protein: totalProtein.toFixed(1),
      carbs: totalCarbs.toFixed(1),
      fat: totalFat.toFixed(1)
    })

  }

  const saveMeal = () => {

    if (!totals) {
      return alert(
        "Please calculate nutrition first"
      )
    }

    const user =
      JSON.parse(localStorage.getItem("user"))

    if (!user) {
      return alert("User not found")
    }

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

    const mealKey = `meals_${user.email}`

    const existingMeals =
      JSON.parse(localStorage.getItem(mealKey)) || []

    existingMeals.push(meal)

    localStorage.setItem(
      mealKey,
      JSON.stringify(existingMeals)
    )

    alert("Meal Saved Successfully!")

  }

  return (

    <div
      style={{
        textAlign: "center",
        position: "relative",
        paddingBottom: "100px",
        minHeight: "100vh",
        overflow: "hidden",
        background:
          "linear-gradient(to bottom right,#fff5f5,#ffffff,#fef2f2)"
      }}
    >

      {/* Particles */}
      <Particles
        init={particlesInit}
        options={{
          background: {
            color: { value: "transparent" }
          },
          particles: {
            number: { value: 40 },
            size: { value: 3 },
            move: { speed: 1 },
            opacity: { value: 0.4 },
            color: { value: "#ef4444" }
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0
        }}
      />

      {/* Hero */}
      <h1
        style={{
          fontSize: "64px",
          fontWeight: "800",
          lineHeight: "1.1",
          marginBottom: "20px",
          marginTop: "60px",
          color: "#0f172a"
        }}
      >

        AI Powered
        <br />

        <span
          style={{
            background:
              "linear-gradient(90deg,#ef4444,#f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Nutrition Intelligence
        </span>

      </h1>

      {/* Type Animation */}
      <div
        style={{
          fontSize: "22px",
          marginBottom: "50px",
          color: "#475569",
          fontWeight: "500"
        }}
      >

        <TypeAnimation
          sequence={[
            "Upload meal images instantly...",
            2000,
            "AI-powered food detection...",
            2000,
            "Smart calorie & macro analysis...",
            2000,
            "Track nutrition with intelligence...",
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
          width: "500px",
          padding: "45px",
          borderRadius: "32px",
          background:
            "rgba(255,255,255,0.65)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow:
            "0 8px 40px rgba(239,68,68,0.08)",
          border:
            "1px solid rgba(255,255,255,0.4)"
        }}
      >

        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginBottom: "20px" }}
        />

        {
          preview && (

            <img
              src={preview}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: "18px",
                marginBottom: "20px"
              }}
            />

          )
        }

        <button
          onClick={handleAnalyze}
          style={{
            padding: "14px 34px",
            borderRadius: "16px",
            border: "none",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "16px",
            background:
              "linear-gradient(90deg,#ef4444,#f97316)",
            color: "#ffffff",
            boxShadow:
              "0 8px 20px rgba(239,68,68,0.2)"
          }}
        >

          {
            loading
              ? "Analyzing..."
              : "Analyze with AI"
          }

        </button>

      </div>

      {/* Feature Cards */}
      <div
        style={{
          marginTop: "70px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",
          gap: "25px"
        }}
      >

        <FeatureCard
          title="AI Food Detection"
          desc="YOLOv8 powered real-time meal recognition system."
        />

        <FeatureCard
          title="Nutrition Analytics"
          desc="Smart calorie, protein, carbs and fat analysis."
        />

        <FeatureCard
          title="Personalized Health"
          desc="Dynamic recommendations based on profile and BMI."
        />

      </div>

      {/* Detections */}
      {
        detections.length > 0 && (

          <div style={{ marginTop: "60px" }}>

            <h2
              style={{
                marginBottom: "30px",
                color: "#0f172a"
              }}
            >
              Detected Food Items
            </h2>

            {
              detections.map((item, index) => (

                <div
                  key={index}
                  style={{
                    margin: "auto",
                    marginBottom: "20px",
                    maxWidth: "500px",
                    background:
                      "rgba(255,255,255,0.6)",
                    padding: "25px",
                    borderRadius: "20px",
                    backdropFilter: "blur(14px)",
                    boxShadow:
                      "0 8px 20px rgba(0,0,0,0.05)"
                  }}
                >

                  <h3>
                    {item.class}
                  </h3>

                  <div
                    style={{
                      marginTop: "15px"
                    }}
                  >

                    <input
                      type="number"
                      placeholder="Quantity"
                      onChange={(e) =>
                        handleInputChange(
                          item.class.toLowerCase(),
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        border:
                          "1px solid #e2e8f0",
                        marginRight: "10px"
                      }}
                    />

                    <select
                      onChange={(e) =>
                        handleInputChange(
                          item.class.toLowerCase(),
                          "unit",
                          e.target.value
                        )
                      }
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        border:
                          "1px solid #e2e8f0"
                      }}
                    >

                      <option value="gm">
                        Gram (gm)
                      </option>

                      <option value="piece">
                        Piece
                      </option>

                      <option value="ml">
                        Milliliter (ml)
                      </option>

                    </select>

                  </div>

                </div>

              ))
            }

            {/* Manual Food */}
            <div style={{ marginTop: "20px" }}>

              <input
                type="text"
                placeholder="Add missing food manually"
                value={manualFood}
                onChange={(e) =>
                  setManualFood(e.target.value)
                }
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border:
                    "1px solid #e2e8f0",
                  marginRight: "10px"
                }}
              />

              <button
                onClick={() => {

                  if (manualFood.trim()) {

                    setDetections([
                      ...detections,
                      {
                        class: manualFood,
                        confidence: 1
                      }
                    ])

                    setManualFood("")

                  }

                }}
                style={{
                  padding: "12px 24px",
                  borderRadius: "12px",
                  border: "none",
                  background:
                    "linear-gradient(90deg,#ef4444,#f97316)",
                  color: "#ffffff",
                  fontWeight: "600"
                }}
              >
                Add Food
              </button>

            </div>

            {/* Nutrition Button */}
            <button
              onClick={calculateNutrition}
              style={{
                marginTop: "30px",
                padding: "14px 30px",
                borderRadius: "16px",
                border: "none",
                background:
                  "linear-gradient(90deg,#ef4444,#f97316)",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Calculate Nutrition
            </button>

          </div>

        )
      }

      {/* Nutrition Results */}
      {
        totals && (

          <div
            style={{
              marginTop: "50px",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px"
            }}
          >

            <NutritionCard
              title="Calories"
              value={`${totals.calories} kcal`}
            />

            <NutritionCard
              title="Protein"
              value={`${totals.protein} g`}
            />

            <NutritionCard
              title="Carbs"
              value={`${totals.carbs} g`}
            />

            <NutritionCard
              title="Fat"
              value={`${totals.fat} g`}
            />

          </div>

        )
      }

      {/* Save Button */}
      {
        totals && (

          <button
            onClick={saveMeal}
            style={{
              marginTop: "40px",
              padding: "16px 36px",
              borderRadius: "18px",
              border: "none",
              background:
                "linear-gradient(90deg,#ef4444,#f97316)",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow:
                "0 8px 20px rgba(239,68,68,0.2)"
            }}
          >
            Save Meal
          </button>

        )
      }

    </div>

  )
}

const FeatureCard = ({
  title,
  desc
}) => (

  <div
    style={{
      background:
        "rgba(255,255,255,0.6)",
      padding: "30px",
      borderRadius: "24px",
      backdropFilter: "blur(14px)",
      boxShadow:
        "0 8px 30px rgba(0,0,0,0.05)",
      border:
        "1px solid rgba(255,255,255,0.4)"
    }}
  >

    <h2
      style={{
        marginBottom: "12px",
        color: "#0f172a"
      }}
    >
      {title}
    </h2>

    <p
      style={{
        color: "#64748b",
        lineHeight: "1.8"
      }}
    >
      {desc}
    </p>

  </div>

)

const NutritionCard = ({
  title,
  value
}) => (

  <div
    style={{
      background:
        "rgba(255,255,255,0.65)",
      padding: "28px",
      borderRadius: "24px",
      backdropFilter: "blur(16px)",
      boxShadow:
        "0 8px 30px rgba(0,0,0,0.05)"
    }}
  >

    <h3
      style={{
        color: "#64748b",
        marginBottom: "12px"
      }}
    >
      {title}
    </h3>

    <h1
      style={{
        color: "#0f172a"
      }}
    >
      {value}
    </h1>

  </div>

)

export default Home