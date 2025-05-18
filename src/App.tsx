import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Match from "./pages/Match";
import Sessions from "./pages/Sessions";
import VideoCall from "./pages/VideoCall";
import VoiceChatBot from "./components/VoiceChatBot";
import JoinHome from "./pages/JoinHome";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Quiz from "./pages/Quiz";
import UserDashboard from "./components/UserDashboard";
function App() {
  useEffect(() => {
    const scriptId = "elevenlabs-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.type = "text/javascript";
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        
        <Routes>
        <Route path="/" element={<LandingPage />} /> {/* 👈 new default page */}
          <Route path="/register" element={<Register />} />
          <Route path="/assistant" element={<VoiceChatBot />} />
          <Route path="/match" element={<Match />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/video/:roomName" element={<VideoCall />} />
          <Route path="/home" element={<JoinHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>

      {/* ElevenLabs AI Assistant Widget (Global) */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<elevenlabs-convai agent-id="agent_01jvey5p2yec7a0ce7pbygedt9"></elevenlabs-convai>`,
        }}
      />
    </>
  );
}

export default App;
