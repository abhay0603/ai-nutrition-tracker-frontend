const About = () => {

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(to bottom right,#fff5f5,#ffffff,#fef2f2)"
      }}
    >

      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "60px"
        }}
      >

        <h1
          style={{
            fontSize: "56px",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "20px"
          }}
        >
          About The Project
        </h1>

        <p
          style={{
            maxWidth: "900px",
            margin: "auto",
            fontSize: "20px",
            lineHeight: "1.8",
            color: "#475569"
          }}
        >
          AI Powered Smart Health Nutrition Tracker is an
          intelligent healthcare and nutrition analysis platform
          designed to assist users in understanding their dietary
          intake using Artificial Intelligence, Computer Vision,
          and personalized analytics. The system utilizes
          YOLOv8 object detection for food recognition and
          provides calorie estimation, macro nutrient analysis,
          personalized health insights, BMI analysis, meal
          history tracking, and intelligent dashboard analytics.
        </p>

      </div>

      {/* Main Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "30px",
          marginBottom: "50px"
        }}
      >

        <SectionCard
          title="Project Vision"
          content="
          The primary vision of this project is to bridge the
          gap between Artificial Intelligence and healthcare by
          developing an accessible and intelligent nutrition
          monitoring system. The platform aims to help users
          maintain healthier lifestyles through automated food
          recognition, smart nutrition tracking, and personalized
          dietary recommendations based on user profile,
          activity level, and health metrics.
          "
        />

        <SectionCard
          title="Core Technologies"
          content="
          The project integrates multiple modern technologies
          including React.js for frontend development, YOLOv8
          for food object detection, JavaScript for dynamic
          functionalities, Chart.js for analytics visualization,
          and local storage based personalized user systems.
          The AI backend is deployed using Hugging Face Spaces,
          enabling real-time food recognition and nutrition
          analysis.
          "
        />

        <SectionCard
          title="Key Features"
          content="
          The platform includes AI-based food image detection,
          nutrition calculation, personalized dashboard
          analytics, meal timeline tracking, BMI analysis,
          calorie monitoring, protein intake analysis, user
          profile management, intelligent health insights, and
          multi-user personalized storage architecture. The
          application also provides modern glassmorphism-based
          user interface and responsive interactive design.
          "
        />

      </div>

      {/* Detailed Description */}
      <div
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(18px)",
          padding: "40px",
          borderRadius: "30px",
          boxShadow:
            "0 8px 30px rgba(0,0,0,0.06)",
          marginBottom: "50px"
        }}
      >

        <h2
          style={{
            marginBottom: "25px",
            color: "#0f172a",
            fontSize: "34px"
          }}
        >
          Project Overview
        </h2>

        <p
          style={{
            lineHeight: "2",
            color: "#475569",
            fontSize: "17px"
          }}
        >
          The increasing demand for smart healthcare and digital
          dietary monitoring systems has significantly
          accelerated the adoption of Artificial Intelligence in
          nutrition and wellness applications. Traditional
          calorie tracking systems often require manual food
          entry, making the process time-consuming and
          inefficient. This project addresses these limitations
          by introducing an AI-driven automated food recognition
          and nutrition analysis system capable of detecting food
          items directly from meal images using YOLOv8 deep
          learning architecture.
          <br /><br />

          The system allows users to upload meal images and
          receive real-time food detection results along with
          estimated calories, protein, carbohydrate, and fat
          values. Furthermore, the application maintains
          personalized user profiles containing demographic and
          health-related information such as age, gender, BMI,
          activity level, and fitness goals. Based on these
          parameters, the dashboard generates intelligent health
          insights and nutrition recommendations.
          <br /><br />

          The application architecture focuses on creating an
          intuitive and visually appealing user experience using
          modern UI concepts such as glassmorphism, gradient
          animations, responsive layouts, and interactive
          analytics dashboards. The integration of personalized
          meal history tracking and health score systems enables
          users to continuously monitor their dietary patterns
          and maintain healthier nutritional habits.
        </p>

      </div>

      {/* Developer Section */}
      <div
        style={{
          background:
            "linear-gradient(90deg,#ef4444,#f97316)",
          padding: "45px",
          borderRadius: "30px",
          color: "#ffffff",
          textAlign: "center",
          boxShadow:
            "0 10px 35px rgba(239,68,68,0.2)"
        }}
      >

        <h2
          style={{
            fontSize: "38px",
            marginBottom: "20px"
          }}
        >
          Developer Information
        </h2>

        <p
          style={{
            maxWidth: "950px",
            margin: "auto",
            lineHeight: "2",
            fontSize: "17px"
          }}
        >
          This project has been developed by
          <strong> Abhay Gupta </strong>
          as a Major Project in the domain of Artificial
          Intelligence and Machine Learning. The project reflects
          strong integration of Computer Vision, Deep Learning,
          Full Stack Development, User Experience Design, and
          Health Analytics concepts. The primary objective behind
          developing this platform was to create a practical,
          scalable, and intelligent AI-powered healthcare system
          capable of assisting users in daily nutrition tracking
          and health monitoring using advanced AI technologies.
          The system also demonstrates the real-world
          applicability of YOLOv8 object detection models in the
          healthcare and nutrition sector.
        </p>

      </div>

    </div>

  )
}

const SectionCard = ({
  title,
  content
}) => (

  <div
    style={{
      background: "rgba(255,255,255,0.65)",
      backdropFilter: "blur(16px)",
      padding: "30px",
      borderRadius: "24px",
      boxShadow:
        "0 8px 25px rgba(0,0,0,0.05)"
    }}
  >

    <h2
      style={{
        marginBottom: "20px",
        color: "#0f172a"
      }}
    >
      {title}
    </h2>

    <p
      style={{
        lineHeight: "1.9",
        color: "#475569"
      }}
    >
      {content}
    </p>

  </div>

)

export default About