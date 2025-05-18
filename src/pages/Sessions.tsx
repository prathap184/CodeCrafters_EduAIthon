import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

interface Session {
  id: string;
  from: string;
  to: string;
  skill: string;
  status: string;
  roomName: string; // ✅ Add this
}


const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;
      const sessionsRef = collection(db, "sessions");

      const q = query(
        sessionsRef,
        where("from", "==", user.uid)
      );

      const q2 = query(
        sessionsRef,
        where("to", "==", user.uid)
      );

      const results = await Promise.all([
        getDocs(q),
        getDocs(q2),
      ]);

      const sessionList: Session[] = [];

      results.forEach((snap) => {
        snap.forEach((doc) => {
          sessionList.push({
            id: doc.id,
            ...(doc.data() as Omit<Session, "id">),
          });
        });
      });

      setSessions(sessionList);
      setLoading(false);
    };

    fetchSessions();
  }, [user]);

  const handleAccept = async (sessionId: string) => {
    const sessionRef = doc(db, "sessions", sessionId);
    await updateDoc(sessionRef, { status: "accepted" });
    alert("Session accepted!");
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, status: "accepted" } : s
      )
    );
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Sessions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : sessions.length === 0 ? (
        <p>No sessions yet.</p>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>
              <strong>Skill:</strong> {session.skill} <br />
              <strong>Status:</strong> {session.status} <br />
              {session.to === user?.uid && session.status === "pending" && (
                <button onClick={() => handleAccept(session.id)}>
                  Accept Session
                </button>
              )}
              {session.status === "accepted" && (
  <a
    href={`/video/${session.roomName}`} // 👈 uses the roomName from Firebase
    target="_blank"
    rel="noopener noreferrer"
  >
    Join Session
  </a>
)}

              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sessions;
