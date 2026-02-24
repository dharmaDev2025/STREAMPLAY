import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";

const API = "http://localhost:5000/api/video";

const WatchVideo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/watch/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.data.success) {
        setVideo(res.data.video);
      } else {
        if (res.data.premiumRequired) {
          alert(res.data.msg || "This video requires a premium plan");
          navigate("/plans");
        } else {
          alert(res.data.msg || "Cannot open video");
          navigate("/user-home");
        }
      }
    } catch (err) {
      console.log(err);
      navigate("/plans");
    }
  };

  if (!video) {
    return (
      <div className="text-white p-10 text-center text-xl">
        Loading video...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      <UserNavbar />

      {/* CLOSE BUTTON */}
      <button
        onClick={() => navigate(-1)} // Go back to previous page
        className="absolute top-4 right-4 z-50 text-white bg-black/50 hover:bg-black/80 rounded-full p-3 text-xl font-bold transition"
      >
        ✕
      </button>

      <div className="flex justify-center p-6">
        <div className="w-full max-w-5xl relative">
          <h1 className="text-white text-2xl font-bold mb-4">{video.title}</h1>
          <video
            controls
            autoPlay
            className="w-full rounded-lg shadow-2xl"
            src={`http://localhost:5000/uploads/videos/${video.videoUrl}`}
          />
          <p className="text-gray-300 mt-2">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;