import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaVideo, FaFilm, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // Active link checker
  const isActive = (path) => location.pathname === path;

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.clear();     // remove login
    navigate("/");            // go to Choice.jsx
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-6 flex flex-col justify-between">

        {/* TOP AREA */}
        <div>

          {/* PROFILE */}
          <div className="mb-10 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-500 flex items-center justify-center mb-3 shadow-lg">
              <span className="text-white text-3xl font-bold">S</span>
            </div>
            <h1 className="text-xl font-bold text-white">STREAM ADMIN</h1>
          </div>

          {/* NAV LINKS */}
          <div className="flex flex-col gap-3">

            <Link
              to="/admin/users"
              className={`flex items-center gap-3 p-3 rounded transition hover:bg-gray-800 ${
                isActive("/admin/users") ? "bg-gray-800" : ""
              }`}
            >
              <FaUser className="text-red-500" />
              <span className="font-semibold">Users</span>
            </Link>

            <Link
              to="/admin/add-video"
              className={`flex items-center gap-3 p-3 rounded transition hover:bg-gray-800 ${
                isActive("/admin/add-video") ? "bg-gray-800" : ""
              }`}
            >
              <FaVideo className="text-red-500" />
              <span className="font-semibold">Upload Video</span>
            </Link>

            <Link
              to="/admin/videos"
              className={`flex items-center gap-3 p-3 rounded transition hover:bg-gray-800 ${
                isActive("/admin/videos") ? "bg-gray-800" : ""
              }`}
            >
              <FaFilm className="text-red-500" />
              <span className="font-semibold">All Videos</span>
            </Link>

          </div>

        </div>

        {/* BOTTOM AREA */}
        <div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full bg-red-600 hover:bg-red-700 transition p-3 rounded-lg font-semibold mb-4 justify-center"
          >
            <FaSignOutAlt />
            Logout
          </button>

          {/* FOOTER */}
          <p className="text-gray-400 text-sm text-center">
            © 2026 StreamPlay
          </p>

        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 md:p-8 overflow-auto bg-gray-100">
        <Outlet />
      </div>

    </div>
  );
};

export default Sidebar;