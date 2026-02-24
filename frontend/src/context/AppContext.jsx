import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();
const API = "http://localhost:5000/api";

export const AppContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);

  // ================= LOAD USERS =================
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // admin token
      const res = await axios.get(`${API}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) setUsers(res.data.users);
      else console.log("Failed to fetch users:", res.data.msg);

    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  // ================= LOAD VIDEOS =================
  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API}/video/all`);
      if (res.data.success) {
        setVideos(res.data.videos);
        console.log("Fetched Videos:", res.data.videos);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  // DELETE VIDEO
  const deleteVideo = async (id) => {
    try {
      const res = await axios.delete(`${API}/video/${id}`);
      if (res.data.success) {
        setVideos((prev) => prev.filter((v) => v._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE VIDEO
  const updateVideo = async (id, data) => {
    try {
      const res = await axios.put(`${API}/video/${id}`, data);
      if (res.data.success) {
        fetchVideos();
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchVideos();
  }, []);

  return (
    <AppContext.Provider
      value={{
        users,
        videos,
        fetchUsers,
        fetchVideos,
        deleteVideo,
        updateVideo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);