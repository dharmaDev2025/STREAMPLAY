import { useNavigate } from "react-router-dom";

const Choice = () => {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen flex flex-col items-center justify-center 
    bg-gradient-to-br from-black via-gray-900 to-black px-6">

      {/* TITLE */}
      <h1 className="text-white text-4xl md:text-5xl font-bold mb-14 text-center">
        STREAM PLAY
      </h1>

      {/* BOX CONTAINER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* ================= USER ================= */}
        <div
          onClick={()=>navigate("/login")}
          className="
          group backdrop-blur-lg bg-white/10 border border-white/20
          cursor-pointer p-12 rounded-3xl shadow-2xl
          hover:scale-105 hover:bg-white/20
          transition duration-300 text-center
          w-full max-w-xs
          "
        >

          {/* ICON */}
          <div className="text-5xl mb-5 group-hover:scale-110 transition">
            👤
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            User Login
          </h2>

          <p className="text-gray-300 text-sm">
            Login or create account
          </p>

        </div>


        {/* ================= ADMIN ================= */}
        <div
          onClick={()=>navigate("/admin-login")}
          className="
          group cursor-pointer p-12 rounded-3xl shadow-2xl
          bg-red-600 hover:bg-red-700
          hover:scale-105 transition duration-300
          text-center w-full max-w-xs
          "
        >

          {/* ICON */}
          <div className="text-5xl mb-5 group-hover:scale-110 transition">
            🛡️
          </div>

          <h2 className="text-2xl font-bold mb-2 text-white">
            Admin Panel
          </h2>

          <p className="text-red-100 text-sm">
            Secure administrator login
          </p>

        </div>

      </div>

    </div>

  );
};

export default Choice;