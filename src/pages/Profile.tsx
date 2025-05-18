import { useState } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [skillsHave, setSkillsHave] = useState("");
  const [skillsWant, setSkillsWant] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name,
        skillsHave: skillsHave.split(",").map((s) => s.trim().toLowerCase()),
        skillsWant: skillsWant.split(",").map((s) => s.trim().toLowerCase()),
      });
      navigate("/match"); // redirect to next screen
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="Skills You Can Teach (comma separated)"
          value={skillsHave}
          onChange={(e) => setSkillsHave(e.target.value)}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="Skills You Want to Learn (comma separated)"
          value={skillsWant}
          onChange={(e) => setSkillsWant(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Save</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Profile;
