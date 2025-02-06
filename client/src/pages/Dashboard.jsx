import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome, {user?.username}!</h1>
      <button onClick={logoutUser} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
