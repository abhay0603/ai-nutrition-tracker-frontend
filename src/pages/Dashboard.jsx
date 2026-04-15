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

  // Load saved meals
  const meals = JSON.parse(localStorage.getItem("meals")) || []

  const today = new Date().toLocaleDateString()

  const todayMeals = meals.filter(m => m.date === today)

  // Today's totals
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

  // Group by date for graph
  const groupedData = {}

  meals.forEach(meal => {
    if (!groupedData[meal.date]) {
      groupedData[meal.date] = 0
    }
    groupedData[meal.date] += Number(meal.calories)
  })

  const sortedDates = Object.keys(groupedData).sort(
    (a, b) => new Date(a) - new Date(b)
  )

  const filteredDates = sortedDates.slice(-range)

  const chartLabels = filteredDates
  const chartValues = filteredDates.map(date => groupedData[date])

  // Donut chart (macros)
  const donutData = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [totalProtein || 1, totalCarbs || 1, totalFat || 1],
        backgroundColor: ["#16a34a", "#3b82f6", "#f59e0b"]
      }
    ]
  }

  // Line chart (calories)
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

      <h1 style={{ marginBottom: "30px" }}>Dashboard Overview</h1>

      {/* Top Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <Card title="Calories Today" value={`${totalCalories.toFixed(0)} kcal`} />
        <Card title="Protein Intake" value={`${totalProtein.toFixed(1)} g`} />
        <Card title="Meals Logged" value={todayMeals.length} />
      </div>

      {/* Range Selector */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Range: </label>

        <select value={range} onChange={(e) => setRange(Number(e.target.value))}>
          <option value={7}>Last 7 Days</option>
          <option value={20}>Last 20 Days</option>
          <option value={30}>Last 30 Days</option>
          <option value={365}>Last 12 Months</option>
        </select>
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: "30px", marginBottom: "40px" }}>

        <div style={chartBox}>
          <h3>Macro Distribution</h3>
          <Doughnut data={donutData} />
        </div>

        <div style={chartBox}>
          <h3>Calorie Trend</h3>
          <Line data={lineData} />
        </div>

      </div>

      {/* Timeline */}
      <div style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        marginBottom: "40px"
      }}>
        <h3>Meal Timeline</h3>

        {meals.length === 0 && <p>No meals saved yet</p>}

        {meals.map((meal, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <strong>{meal.date} | {meal.time}</strong>
            <p>Foods: {meal.foods.join(", ")}</p>
            <p>Calories: {meal.calories} kcal</p>
            <hr />
          </div>
        ))}
      </div>

      {/* Advertisement */}
      <div style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}>
        <h3>Sponsored</h3>
        <p style={{ color: "#64748b" }}>
          Promote healthy protein supplements here.
        </p>
      </div>

    </div>
  )
}

const Card = ({ title, value }) => (
  <div style={{
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    minWidth: "200px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  }}>
    <h4 style={{ color: "#64748b" }}>{title}</h4>
    <h2>{value}</h2>
  </div>
)

const chartBox = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "12px",
  flex: 1,
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
}

export default Dashboard