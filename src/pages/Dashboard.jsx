import { useState } from "react"
import { Doughnut, Line } from "react-chartjs-2"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
)

const Dashboard = () => {

  const [range, setRange] = useState(7)

  // Current User
  const user = JSON.parse(localStorage.getItem("user"))

  // User-specific meal key
  const mealKey = user
    ? `meals_${user.email}`
    : "meals"

  // Load meals
  const meals =
    JSON.parse(localStorage.getItem(mealKey)) || []

  // Age
  const age = user?.dob
    ? new Date().getFullYear() -
      new Date(user.dob).getFullYear()
    : 0

  // BMI
  const bmi =
    user?.height && user?.weight
      ? (
          user.weight /
          ((user.height / 100) * (user.height / 100))
        ).toFixed(1)
      : 0

  // Calorie Target
  let calorieTarget = 2200

  if (user?.goal === "Weight Loss") {
    calorieTarget = 1800
  }
  else if (user?.goal === "Muscle Gain") {
    calorieTarget = 2600
  }

  // Protein Target
  const proteinTarget =
    user?.weight
      ? Math.round(user.weight * 1.6)
      : 80

  // BMI Status
  let bmiStatus = "Healthy"

  if (bmi < 18.5) {
    bmiStatus = "Underweight"
  }
  else if (bmi >= 25 && bmi < 30) {
    bmiStatus = "Overweight"
  }
  else if (bmi >= 30) {
    bmiStatus = "Obese"
  }

  // Today's Meals
  const today = new Date().toLocaleDateString()

  const todayMeals =
    meals.filter(m => m.date === today)

  // Nutrition Totals
  let totalCalories = 0
  let totalProtein = 0
  let totalCarbs = 0
  let totalFat = 0

  todayMeals.forEach(m => {

    totalCalories += Number(m.calories)
    totalProtein += Number(m.protein)
    totalCarbs += Number(m.carbs)
    totalFat += Number(m.fat)

  })

  // Health Score
  let healthScore = 100

  if (bmi < 18.5 || bmi > 30) {
    healthScore -= 20
  }

  if (totalProtein < proteinTarget * 0.5) {
    healthScore -= 15
  }

  if (todayMeals.length < 2) {
    healthScore -= 10
  }

  if (totalCalories > calorieTarget * 1.3) {
    healthScore -= 15
  }

  if (healthScore < 0) {
    healthScore = 0
  }

  // Group calories by date
  const groupedData = {}

  meals.forEach(meal => {

    if (!groupedData[meal.date]) {
      groupedData[meal.date] = 0
    }

    groupedData[meal.date] += Number(meal.calories)

  })

  const sortedDates =
    Object.keys(groupedData).sort(
      (a, b) => new Date(a) - new Date(b)
    )

  const filteredDates =
    sortedDates.slice(-range)

  const chartLabels = filteredDates

  const chartValues =
    filteredDates.map(
      date => groupedData[date]
    )

  // Doughnut Chart
  const donutData = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [
          totalProtein || 1,
          totalCarbs || 1,
          totalFat || 1
        ],
        backgroundColor: [
          "#16a34a",
          "#3b82f6",
          "#f59e0b"
        ]
      }
    ]
  }

  // Line Chart
  const lineData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Calories",
        data: chartValues,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  }

  return (
    <div>

      <h1 style={{ marginBottom: "30px" }}>
        Dashboard Overview
      </h1>

      {/* Top Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}
      >

        <Card
          title="Calories Today"
          value={`${totalCalories.toFixed(0)} kcal`}
        />

        <Card
          title="Daily Goal"
          value={`${calorieTarget} kcal`}
        />

        <Card
          title="Protein Target"
          value={`${proteinTarget} g`}
        />

        <Card
          title="BMI Status"
          value={bmiStatus}
        />

        <Card
          title="Health Score"
          value={`${healthScore}/100`}
        />

        <Card
          title="Fitness Goal"
          value={user?.goal || "--"}
        />

        <Card
          title="Meals Logged"
          value={todayMeals.length}
        />

      </div>

      {/* Range Selector */}
      <div style={{ marginBottom: "20px" }}>

        <label>Select Range: </label>

        <select
          value={range}
          onChange={(e) =>
            setRange(Number(e.target.value))
          }
        >
          <option value={7}>
            Last 7 Days
          </option>

          <option value={20}>
            Last 20 Days
          </option>

          <option value={30}>
            Last 30 Days
          </option>

          <option value={365}>
            Last 12 Months
          </option>

        </select>

      </div>

      {/* Charts */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          marginBottom: "40px",
          flexWrap: "wrap"
        }}
      >

        <div style={chartBox}>
          <h3>Macro Distribution</h3>
          <Doughnut data={donutData} />
        </div>

        <div style={chartBox}>
          <h3>Calorie Trend</h3>
          <Line data={lineData} />
        </div>

      </div>

      {/* AI Insights */}
      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "18px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.05)",
          marginBottom: "40px"
        }}
      >

        <h2 style={{ marginBottom: "20px" }}>
          AI Health Insights
        </h2>

        <div style={{ lineHeight: "2" }}>

          <p>
            {
              bmi < 18.5
              ? "⚠ Your BMI indicates underweight condition. Increase balanced calorie intake."
              : bmi < 25
              ? "✅ Your BMI falls within healthy range."
              : bmi < 30
              ? "⚠ Your BMI indicates overweight range. Monitor calorie intake and maintain physical activity."
              : "⚠ Obesity risk detected. A healthier diet and regular exercise are recommended."
            }
          </p>

          <p>
            🎯 Current Goal:
            {" "}
            <strong>{user?.goal}</strong>
          </p>

          <p>
            💪 Recommended Protein Intake:
            {" "}
            <strong>{proteinTarget} g/day</strong>
          </p>

          <p>
            🔥 Daily Calorie Target:
            {" "}
            <strong>{calorieTarget} kcal</strong>
          </p>

          <p>
            👤 Age:
            {" "}
            <strong>{age} years</strong>
          </p>

          <p>
            {
              totalProtein < proteinTarget * 0.5
              ? "⚠ Protein intake is below recommended level."
              : "✅ Protein intake is within healthy range."
            }
          </p>

          <p>
            {
              totalCalories > calorieTarget
              ? "⚠ Daily calorie intake exceeded recommended target."
              : "✅ Daily calorie intake is under control."
            }
          </p>

          <p>
            {
              todayMeals.length < 2
              ? "⚠ Low meal frequency detected today."
              : "✅ Healthy meal frequency maintained."
            }
          </p>

          <p>
            {
              user?.goal === "Muscle Gain"
              ? "💪 Increase protein-rich meals for optimal muscle recovery."
              : user?.goal === "Weight Loss"
              ? "🥗 Maintain calorie deficit with balanced nutrition."
              : "⚖ Maintain balanced nutrition for healthy lifestyle."
            }
          </p>

        </div>

      </div>

      {/* Timeline */}
      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.05)",
          marginBottom: "40px"
        }}
      >

        <h3 style={{ marginBottom: "20px" }}>
          Meal Timeline
        </h3>

        {
          meals.length === 0 &&
          <p>No meals saved yet</p>
        }

        {
          meals.map((meal, index) => (

            <div
              key={index}
              style={{
                marginBottom: "20px",
                paddingBottom: "15px",
                borderBottom:
                  "1px solid #e2e8f0"
              }}
            >

              <strong>
                {meal.date} | {meal.time}
              </strong>

              <p>
                Foods:
                {" "}
                {meal.foods.join(", ")}
              </p>

              <p>
                Calories:
                {" "}
                {meal.calories} kcal
              </p>

              <p>
                Protein:
                {" "}
                {meal.protein} g
              </p>

            </div>

          ))
        }

      </div>

    </div>
  )
}

const Card = ({ title, value }) => (

  <div
    style={{
      background: "#ffffff",
      padding: "25px",
      borderRadius: "16px",
      minWidth: "200px",
      boxShadow:
        "0 4px 10px rgba(0,0,0,0.05)"
    }}
  >

    <h4 style={{ color: "#64748b" }}>
      {title}
    </h4>

    <h2 style={{ marginTop: "10px" }}>
      {value}
    </h2>

  </div>

)

const chartBox = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "16px",
  flex: 1,
  minWidth: "320px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
}

export default Dashboard