import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API="http://localhost:5000/api/admin";

const AdminLogin=()=>{

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate=useNavigate();

  const handleSubmit=async(e)=>{

    e.preventDefault();

    const res=await axios.post(`${API}/login`,{email,password});

    if(res.data.success){

      localStorage.setItem("adminToken",res.data.token);

      navigate("/admin/users");   // ADMIN DASHBOARD

    }else alert("Wrong admin login");

  };

  return(

    <div className="min-h-screen flex items-center justify-center bg-black">

      <form onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          placeholder="Email"
          className="w-full border p-3 mb-3"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-3"
          onChange={e=>setPassword(e.target.value)}
        />

        <button className="bg-red-500 text-white w-full py-3 rounded">
          Login
        </button>

      </form>

    </div>
  );
};

export default AdminLogin;