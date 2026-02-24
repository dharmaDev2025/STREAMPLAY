import { BrowserRouter, Routes, Route } from "react-router-dom";

// ====== COMMON ======
import Choice from "./pages/Choice";

// ====== USER ======
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";
import Plans from "./pages/Plans";

// ⭐ WATCH PAGE
import WatchVideo from "./pages/WatchVideo";

// ====== ADMIN ======
import AdminLogin from "./pages/AdminLogin";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import UploadVideo from "./pages/UploadVideo";
import AllVideos from "./pages/Allvideos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* FIRST PAGE */}
        <Route path="/" element={<Choice />} />

        {/* USER AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER HOME */}
        <Route path="/user-home" element={<UserHome />} />

        {/* SUBSCRIPTION */}
        <Route path="/plans" element={<Plans />} />

        {/* ⭐ WATCH VIDEO PAGE */}
        <Route path="/watch/:id" element={<WatchVideo />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ADMIN PANEL */}
        <Route path="/admin" element={<Sidebar />}>
          <Route path="users" element={<Dashboard />} />
          <Route path="add-video" element={<UploadVideo />} />
          <Route path="videos" element={<AllVideos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;