import { useEffect, useState, useLayoutEffect } from "react"
import auth from "../utils/auth";

import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";

import ErrorPage from "./ErrorPage";
import UserList from "../components/Users";

  const Home = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
 
    useEffect(() => {
      if (loginCheck) {
          fetchUsers();
      }
  }, [loginCheck]);

  useLayoutEffect(() => {
      checkLogin();
  }, []);


  useLayoutEffect(() => {
    checkLogin();
  }, []);

const checkLogin = () => {
  if (auth.loggedIn()) {
    setLoginCheck(true);
  }
};

const fetchUsers = async () => {
  try {
      const data = await
      retrieveUsers();
      setUsers(data)
  } catch (err) {
    console.error('Failed to retrieve User:',err);
    setError(true);
  }
}

if (error) {
  return <ErrorPage/>
}

return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f1e4] text-[#5a3e2b] px-4">
    {/* Title Banner */}
    <div className="bg-[#d4b890] text-center w-full py-4 border-b-4 border-double border-gray-700 shadow-md">
      <h1 className="text-3xl font-bold font-serif tracking-widest">
        📜 The Book of Historical Events 📜
      </h1>
    </div>

    {!loginCheck ? (
      <div className="bg-[#e0c9a6] shadow-lg rounded-lg p-6 md:p-8 text-center max-w-lg mt-10 border-4 border-[#5a3e2b]">
        <h1 className="text-2xl font-bold font-serif">
          Access the Archives
        </h1>
        <p className="text-[#6b4f34] mt-2">
          Sign in to unlock historical records and view notable events from the past.
        </p>
        <button className="mt-4 px-6 py-2 bg-[#8b5a2b] text-white rounded-lg shadow-md hover:bg-[#6d4321] transition">
          Enter the Archives
        </button>
      </div>
    ) : (
      <div className="w-full max-w-4xl mt-6 bg-[#f1e3c3] p-6 rounded-lg shadow-lg border-4 border-[#5a3e2b]">
        <h2 className="text-2xl font-bold font-serif border-b-2 border-[#5a3e2b] pb-2">
          📖 Recorded Histories
        </h2>
        <div className="mt-4 overflow-y-auto max-h-[60vh] p-4 bg-[#f8f1e4] shadow-inner border border-[#5a3e2b] rounded-md">
          <UserList users={users} />
        </div>
      </div>
    )}
  </div>
);
};

export default Home;