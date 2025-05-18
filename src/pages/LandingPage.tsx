import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
const navigate = useNavigate();

const handleGetStarted = () => {
navigate("/register");
};

return (
<div style={wrapperStyle}>
<div style={heroStyle}>
<h1 style={titleStyle}>👋 Welcome to SkillSwap</h1>
<p style={subtitleStyle}>
Connect. Share. Learn. Swap skills with amazing people from all around the world.
</p>
<button style={buttonStyle} onClick={handleGetStarted}>
Get Started
</button>
</div>
</div>
);
};

// Styling with better color contrast
const wrapperStyle: React.CSSProperties = {
height: "100vh",
background: "linear-gradient(to right, #1e3a8a, #0f766e)", // deep blue to teal
display: "flex",
alignItems: "center",
justifyContent: "center",
color: "#f9fafb", // light gray text for better readability
fontFamily: "Segoe UI, sans-serif",
padding: "0 20px",
textAlign: "center" as const,
};

const heroStyle: React.CSSProperties = {
maxWidth: "600px",
};

const titleStyle: React.CSSProperties = {
fontSize: "3rem",
marginBottom: "20px",
fontWeight: "bold",
};

const subtitleStyle: React.CSSProperties = {
fontSize: "1.25rem",
marginBottom: "40px",
lineHeight: 1.5,
};

const buttonStyle: React.CSSProperties = {
padding: "14px 28px",
fontSize: "16px",
backgroundColor: "#ffffff",
color: "#1e3a8a", // deep blue for contrast
fontWeight: 600,
border: "none",
borderRadius: "10px",
cursor: "pointer",
transition: "transform 0.2s",
};

export default LandingPage;