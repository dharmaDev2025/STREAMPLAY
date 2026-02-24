import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const UserNavbar = ({ onSearch }) => {

  const navigate = useNavigate();
  const [search,setSearch]=useState("");

const userName = JSON.parse(localStorage.getItem("user"))?.name || "User";

  const logout=()=>{
    localStorage.clear();
    navigate("/");
  };

  const handleSearch=(e)=>{
    const value=e.target.value;
    setSearch(value);
    if(onSearch) onSearch(value);
  };

  return (

    <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-700
                    px-8 py-4 flex items-center justify-between shadow-xl text-white">

      {/* LEFT */}
      <div className="flex items-center gap-8">

        {/* PROFILE */}
        <div className="relative group">

          <div className="w-10 h-10 rounded-full bg-white text-indigo-700 
                          flex items-center justify-center cursor-pointer font-bold shadow">
            {userName.charAt(0).toUpperCase()}
          </div>

          {/* HOVER CARD */}
          <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-2xl
                          opacity-0 group-hover:opacity-100
                          invisible group-hover:visible
                          transition duration-200 z-50">

            <div className="p-4 border-b font-semibold">
              {userName}
            </div>

            <button
              onClick={logout}
              className="w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              Logout
            </button>

          </div>

        </div>


        {/* LINKS */}
        <button
          onClick={()=>navigate("/user-home")}
          className="font-semibold hover:text-yellow-300 transition"
        >
          Home
        </button>

        <button
          onClick={()=>navigate("/plans")}
          className="font-semibold hover:text-yellow-300 transition"
        >
          Plans
        </button>

      </div>


      {/* SEARCH */}
      <div className="relative">

        <FaSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          value={search}
          onChange={handleSearch}
          placeholder="Search here..."
          className="pl-10 pr-4 py-2 rounded-full border w-72
                     text-black
                     focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

      </div>

    </div>

  );
};

export default UserNavbar;