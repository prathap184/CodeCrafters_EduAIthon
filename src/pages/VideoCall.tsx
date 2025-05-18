import React, { useState } from "react";

// 👇 Feedback form component
const FeedbackForm = ({ onSubmit }: { onSubmit: (rating: number, comment: string) => void }) => {
const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
onSubmit(rating, comment);
setRating(0);
setComment("");
};

return (
<div style={containerStyle}>
<h3 style={headingStyle}>⭐ Rate Your Session</h3>
<div style={starContainerStyle}>
{[1, 2, 3, 4, 5].map((star) => (
<span
key={star}
style={{ ...starStyle, color: rating >= star ? "#facc15" : "#e5e7eb" }}
onClick={() => setRating(star)}
>
★
</span>
))}
</div>
<textarea
style={textareaStyle}
value={comment}
onChange={(e) => setComment(e.target.value)}
placeholder="Leave a comment..."
/>
<button style={buttonStyle} onClick={handleSubmit}>
Submit Feedback
</button>
</div>
);
};

// 👉 Style definitions
const containerStyle: React.CSSProperties = {
background: "#ffffff",
padding: "20px",
borderRadius: "12px",
boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
maxWidth: "400px",
margin: "20px auto",
textAlign: "center",
};

const headingStyle: React.CSSProperties = {
marginBottom: "12px",
color: "#1f2937",
};

const starContainerStyle: React.CSSProperties = {
display: "flex",
justifyContent: "center",
marginBottom: "12px",
cursor: "pointer",
};

const starStyle: React.CSSProperties = {
fontSize: "24px",
margin: "0 5px",
};

const textareaStyle: React.CSSProperties = {
width: "100%",
minHeight: "80px",
marginBottom: "12px",
padding: "10px",
borderRadius: "8px",
border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
backgroundColor: "#3b82f6",
color: "#fff",
padding: "10px 20px",
borderRadius: "8px",
border: "none",
cursor: "pointer",
};

const VideoCall = () => {
const [sessionEnded, setSessionEnded] = useState(false);
const roomName = "skillswap-test-room";

const handleEndCall = () => {
setSessionEnded(true);
};

const handleFeedbackSubmit = (rating: number, comment: string) => {
console.log("Feedback received:", { rating, comment });
alert("Thank you for your feedback!");
setSessionEnded(false); // optional: go back or route
};

return (
<div style={{ height: "100vh" }}>
<h2 style={{ textAlign: "center" }}>SkillSwap Live Video Session</h2>

php-template
Copy code
  {!sessionEnded ? (
    <>
      {roomName ? (
        <>
          <iframe
            src={`https://meet.jit.si/${roomName}`}
            allow="camera; microphone; fullscreen; display-capture"
            style={{ width: "100%", height: "80vh", border: "none" }}
            title="SkillSwap Video Call"
          />
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
              onClick={handleEndCall}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              End Call & Give Feedback
            </button>
          </div>
        </>
      ) : (
        <p>Loading room...</p>
      )}
    </>
  ) : (
    <FeedbackForm onSubmit={handleFeedbackSubmit} />
  )}
</div>
);
};

export default VideoCall;