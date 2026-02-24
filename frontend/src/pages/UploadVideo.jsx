import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api";

const UploadVideo = () => {
  const navigate = useNavigate();
  const { fetchVideos } = useAppContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subscription, setSubscription] = useState("free");
  const [video, setVideo] = useState(null);
  const [thumb, setThumb] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video || !thumb) {
      alert("Select video & thumbnail");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("subscription", subscription);
      formData.append("video", video);
      formData.append("thumbnail", thumb);

      const res = await axios.post(`${API}/video/upload`, formData);

      if (res.data.success) {
        alert("✅ Video Uploaded");

        // refresh videos instantly
        await fetchVideos();

        // clear form
        setTitle("");
        setDescription("");
        setVideo(null);
        setThumb(null);

        // redirect to all videos page
        navigate("/admin/videos");
      }
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upload Video</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded max-w-lg"
      >
        <input
          value={title}
          placeholder="Title"
          className="w-full border p-3 mb-3"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={description}
          placeholder="Description"
          className="w-full border p-3 mb-3"
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={subscription}
          className="w-full border p-3 mb-3"
          onChange={(e) => setSubscription(e.target.value)}
        >
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>

        {/* VIDEO FILE INPUT */}
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          className="mb-3"
        />

        {/* VIDEO PREVIEW */}
        {video && (
          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-1">Video Preview:</p>
            <video
              src={URL.createObjectURL(video)}
              controls
              className="w-full h-40 object-cover rounded"
            />
          </div>
        )}

        {/* THUMBNAIL FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumb(e.target.files[0])}
          className="mb-3"
        />

        {/* THUMBNAIL PREVIEW */}
        {thumb && (
          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-1">Thumbnail Preview:</p>
            <img
              src={URL.createObjectURL(thumb)}
              alt="Thumbnail Preview"
              className="w-full h-40 object-cover rounded"
            />
          </div>
        )}

        <button
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded w-full"
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
