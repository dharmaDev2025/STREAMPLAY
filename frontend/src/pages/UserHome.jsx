import { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/video";

const UserHome = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(API + "/all");
      if (res.data.success) {
        setVideos(res.data.videos);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = videos.filter(v =>
    v.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = (video) => {
    // Always navigate to /watch/:id
    navigate("/watch/" + video._id);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,0,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,0,0,0.15),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(255,0,0,0.10),transparent_40%)]"></div>
      <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
      <div className="relative z-10">
        <UserNavbar onSearch={setSearch} />
        <div className="p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">Latest Videos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map(v => (
              <div
                key={v._id}
                onClick={() => handleClick(v)}
                className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={`http://localhost:5000/uploads/thumbnails/${v.thumbnail}`}
                    className="h-44 w-full object-cover"
                    alt={v.title}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 p-4 rounded-full hover:bg-black/80 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white text-lg">{v.title || "Untitled"}</h3>
                  <p className={`font-semibold mt-1 ${v.subscription==="premium" ? "text-red-400" : "text-green-400"}`}>
                    {v.subscription==="premium" ? "Premium" : "Free"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;