import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="text-lg font-bold">History App</Link>
      <div>
        <Link to="/events" className="mr-4">Discover Events</Link>
        <Link to="/favorites" className="mr-4">My Favorites ⭐</Link>
      </div>
    </nav>
  );
};

export default Navbar;
