import React, { useState } from "react";

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

// Styles
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

export default FeedbackForm;