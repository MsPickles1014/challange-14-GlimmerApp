import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  return (
    <nav className="bg-[#d4b890] text-[#5a3e2b] py-3 px-6 shadow-lg border-b-4 border-[#8b5a2b] font-serif flex justify-between items-center">
      {/* Title with Historical Aesthetic */}
      <h1 className="text-2xl font-bold tracking-wider">📜 📜📜Let's Travel Back to A Glimmer in Time📜📜📜</h1>

      {/* Navigation Buttons */}
      <div>
        {!loginCheck ? (
          <Link
            to="/login"
            className="px-4 py-2 bg-[#8b5a2b] text-white rounded-lg shadow-md hover:bg-[#6d4321] transition"
          >
            Enter Archives
          </Link>
        ) : (
          <button
            onClick={() => auth.logout()}
            className="px-4 py-2 bg-[#8b5a2b] text-white rounded-lg shadow-md hover:bg-[#6d4321] transition"
          >
            Leave Archives
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
