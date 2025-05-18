import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setBio(docSnap.data().bio || "");
        }
      }
    };
    fetchData();
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/register");
  };

  const handleBioUpdate = async () => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, { bio });
    setIsEditing(false);
    alert("✅ Bio updated!");
  };

  return (
    <div className="absolute top-3 right-4" ref={dropdownRef}>
      {/* Profile Icon */}
      <img
        src={userData?.image || "/icon.png"}
        alt="Profile"
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full cursor-pointer border-2 border-blue-500"
      />

      {/* Dropdown Profile Card */}
      {open && (
        <div className="absolute right-0 mt-3 bg-white rounded-lg shadow-lg w-64 z-50 overflow-hidden">
          {/* Profile Header */}
          <div className="p-4 bg-gray-50 flex items-center space-x-3">
            <div>
              <h2 className="font-semibold">{userData?.name}</h2>
              <p className="text-xs text-gray-600">{userData?.email}</p>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-3 space-y-3">
            {/* Bio Section */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-medium">Bio</h3>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-blue-500 text-xs"
                  >
                    Edit
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <div>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={2}
                    className="w-full p-2 text-sm border rounded-md mb-2"
                    placeholder="Write something about yourself..."
                  />
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-2 py-1 bg-gray-200 rounded-md text-xs"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleBioUpdate}
                      className="px-2 py-1 bg-blue-500 text-white rounded-md text-xs"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-700">{bio || "No bio yet."}</p>
              )}
            </div>

            {/* Certifications Section */}
            <div>
              <h3 className="text-sm font-medium mb-1">Certifications</h3>
              {userData?.certifications && userData.certifications.length > 0 ? (
                <ul className="list-disc list-inside text-xs text-gray-700">
                  {userData.certifications.map((cert: string, index: number) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-500">No certifications yet.</p>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-3 border-t">
            <button
              onClick={handleLogout}
              className="w-full py-1.5 bg-red-50 text-red-600 rounded text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;