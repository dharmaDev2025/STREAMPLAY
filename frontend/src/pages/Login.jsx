import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API="http://localhost:5000/api/user";

const Login = ()=>{

  const [isRegister,setIsRegister]=useState(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(!email || !password || (isRegister && !name)){
      alert("Fill all fields");
      return;
    }

    try{
      setLoading(true);

      const url=isRegister?`${API}/register`:`${API}/login`;
      const payload=isRegister?{name,email,password}:{email,password};

      const res=await axios.post(url,payload);

      if(res.data.success){

        if(isRegister){
          alert("Registered successfully. Now login.");
          setIsRegister(false);
          return;
        }

        // ⭐⭐⭐ SAVE TOKEN + USER
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("user",JSON.stringify(res.data.user));
        localStorage.setItem("name",res.data.user.name);

        navigate("/user-home");

      }else alert(res.data.msg);

    }catch{
      alert("Server error");
    }
    finally{ setLoading(false); }
  };

  return(
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister?"Register":"Login"}
        </h2>

        {isRegister &&
          <input value={name} placeholder="Name"
            className="w-full border p-3 mb-3 rounded"
            onChange={e=>setName(e.target.value)} />
        }

        <input value={email} placeholder="Email"
          className="w-full border p-3 mb-3 rounded"
          onChange={e=>setEmail(e.target.value)} />

        <input value={password} type="password"
          placeholder="Password"
          className="w-full border p-3 mb-3 rounded"
          onChange={e=>setPassword(e.target.value)} />

        <button disabled={loading}
          className="bg-black text-white w-full py-3 rounded">
          {loading?"Please wait...":isRegister?"Register":"Login"}
        </button>

        <p className="mt-4 text-center">
          {isRegister?"Already user?":"New user?"}
          <span onClick={()=>setIsRegister(!isRegister)}
            className="text-blue-600 cursor-pointer ml-2 font-semibold">
            {isRegister?"Login":"Register"}
          </span>
        </p>

      </form>
    </div>
  );
};

export default Login;