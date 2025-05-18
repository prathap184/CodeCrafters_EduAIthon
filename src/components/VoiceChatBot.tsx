import React, { useEffect } from "react";

const VoiceChatBot = () => {
  useEffect(() => {
    // Check if script is already added
    if (!document.getElementById("chtl-script")) {
      // Set config
      const configScript = document.createElement("script");
      configScript.innerHTML = `window.chtlConfig = { chatbotId: "7392872691", display: "fullscreen" };`;
      document.body.appendChild(configScript);

      // Add widget script
      const script = document.createElement("script");
      script.src = "https://chatling.ai/js/embed.js";
      script.async = true;
      script.id = "chtl-script";
      script.setAttribute("data-id", "7392872691");
      script.setAttribute("data-display", "fullscreen");
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

  return null; // No UI needed, widget handles everything
};

export default VoiceChatBot;
