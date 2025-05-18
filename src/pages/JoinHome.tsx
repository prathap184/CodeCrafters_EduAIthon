import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserDashboard from "../components/UserDashboard";

const JoinHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const existingScript = document.getElementById("elevenlabs-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.type = "text/javascript";
      script.id = "elevenlabs-script";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#f9f9f9",
      fontFamily: "Arial, sans-serif",
      padding: "40px",
      justifyContent: "space-between"
    }}>
      <UserDashboard />
      {/* Create Profile Card */}
      <div style={cardStyle}>
        <h2>🎥 SkillSwap Live Session</h2>
        <p>Before joining a session, complete your profile to get matched.</p>
        <button onClick={() => navigate("/profile")} style={buttonStyle}>
          Complete Your Profile
        </button>
      </div>

      {/* Quiz Self-Evaluation Card */}
      <div style={cardStyle}>
        <h2>📝 Evaluate Yourself</h2>
        <p>Take a quick quiz to assess your skill level before joining a session.</p>
        <button onClick={() => navigate("/quiz")} style={{ ...buttonStyle, backgroundColor: "#ffc107" }}>
          Take Quiz
        </button>
      </div>

      {/* AI Assistant Card */}
      <div style={{ ...cardStyle, backgroundColor: "#f0f4ff" }}>
        <h2>🤖 SkillSwap AI Assistant</h2>
        <p>Ask questions about skills and get instant guidance from AI.</p>
        <button onClick={() => navigate("/assistant")} style={{ ...buttonStyle, backgroundColor: "#28a745" }}>
          Open Chatbot
        </button>
        <div style={{ marginTop: "30px" }}>
          {React.createElement("elevenlabs-convai", {
            "agent-id": "agent_01jvey5p2yec7a0ce7pbygedt9",
          })}
        </div>
      </div>
    </div>
  );
};

// Reusable styles
const cardStyle: React.CSSProperties = {
  flex: 1,
  margin: "0 10px",
  background: "#fff",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 20px",
  marginTop: "20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer"
};

export default JoinHome;
