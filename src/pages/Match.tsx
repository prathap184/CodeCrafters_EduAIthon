import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  uid: string;
  name: string;
  skillsHave: string[];
  skillsWant: string[];
  email: string;
}

const Match = () => {
  const [matches, setMatches] = useState<UserProfile[]>([]);
  const [authUser, setAuthUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const findMatches = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const userSnap = await getDocs(collection(db, "users"));
      const users: UserProfile[] = [];

      userSnap.forEach((doc) => {
        const data = doc.data() as UserProfile;
        users.push(data);
      });

      const me = users.find((u) => u.uid === currentUser.uid);
      if (!me) return;

      setAuthUser(me);

      const potentialMatches = users.filter((u) => {
        if (u.uid === me.uid) return false;

        const theyTeachWhatIWannaLearn = u.skillsHave.some((skill) =>
          me.skillsWant.includes(skill)
        );

        const iTeachWhatTheyWannaLearn = me.skillsHave.some((skill) =>
          u.skillsWant.includes(skill)
        );

        return theyTeachWhatIWannaLearn && iTeachWhatTheyWannaLearn;
      });

      setMatches(potentialMatches);
      setLoading(false);
    };

    findMatches();
  }, []);

  const handleStartSession = async (matchedUser: UserProfile) => {
    const me = auth.currentUser;
    if (!me || !authUser) return;

    const commonSkill = matchedUser.skillsHave.find((skill) =>
      authUser.skillsWant.includes(skill)
    );

    if (!commonSkill) {
      alert("No common skill to start session.");
      return;
    }

    try {
      const roomName = `skillswap-${me.uid}-${matchedUser.uid}`; 

await addDoc(collection(db, "sessions"), {
  from: me.uid,
  to: matchedUser.uid,
  skill: commonSkill,
  status: "pending",
  roomName, 
  createdAt: serverTimestamp(),
});
      alert("Session request sent!");
    } catch (err) {
      console.error("Error creating session:", err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Matched Users</h2>
      {loading ? (
        <p>Loading matches...</p>
      ) : matches.length === 0 ? (
        <p>No matches found yet. Try updating your skills!</p>
      ) : (
        <ul>
          {matches.map((user) => {
            const roomName = `${authUser?.uid}_${user.uid}`;

            return (
              <li key={user.uid}>
                <strong>{user.name}</strong> ({user.email})<br />
                Can teach: {user.skillsHave.join(", ")}<br />
                Wants to learn: {user.skillsWant.join(", ")}<br /><br />

                <button onClick={() => handleStartSession(user)}>
                  Send Session Request
                </button>{" "}

                <button onClick={() => navigate(`/video/${roomName}`)}>
                  Join Video Call
                </button>

                <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Match;
