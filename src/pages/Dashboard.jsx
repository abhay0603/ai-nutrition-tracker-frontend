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

  const donutData = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#16a34a", "#3b82f6", "#f59e0b"]
      }
    ]
  }

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Calories",
        data: [1800, 2000, 1700, 2200, 1900, 2100, 1600],
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

      {/* Top Section */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>

        <Card title="Calories Today" value="1850 kcal" />
        <Card title="Protein Intake" value="95 g" />
        <Card title="Goal Completion" value="78%" />

      </div>

      {/* Charts Section */}
      <div style={{ display: "flex", gap: "30px", marginBottom: "40px" }}>

        <div style={chartBox}>
          <h3>Macro Distribution</h3>
          <Doughnut data={donutData} />
        </div>

        <div style={chartBox}>
          <h3>Weekly Calories</h3>
          <Line data={lineData} />
        </div>

      </div>

      {/* Advertisement Area */}
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