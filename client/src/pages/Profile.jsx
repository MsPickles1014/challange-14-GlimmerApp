import { useEffect, useState } from "react";
import { getUserProfile, updatePassword } from "../services/userService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setUser(response.data);
    } catch (err) {
      setMessage("Failed to load profile.");
    }
  };

  const handlePasswordChange = async () => {
    try {
      await updatePassword(newPassword);
      setMessage("Password updated successfully!");
      setNewPassword("");
    } catch (err) {
      setMessage("Failed to update password.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">User Profile</h1>

      {message && <p className="text-green-500">{message}</p>}

      {user ? (
        <div className="border p-4 rounded-lg">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Saved Events:</strong> {user.favoriteCount}</p>

          <div className="mt-4">
            <h2 className="font-bold mb-2">Change Password</h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <button onClick={handlePasswordChange} className="bg-blue-500 text-white px-3 py-1 rounded">Update Password</button>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
