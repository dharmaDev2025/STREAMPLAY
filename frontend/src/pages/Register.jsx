import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = (e)=>{
    e.preventDefault();

    if(!name || !email || !password){
      alert("Fill all fields");
      return;
    }

    // save user locally
    const user = { name,email,password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("✅ Registered successfully");

    // ✅ send email/password to login page
    navigate("/login",{
      state:{
        email,
        password
      }
    });
  };

  return(
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          User Register
        </h2>

        <input
          placeholder="Name"
          className="w-full border p-3 mb-3 rounded"
          value={name}
          onChange={e=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border p-3 mb-3 rounded"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full py-3 rounded hover:bg-gray-800">
          Register
        </button>

        <p className="mt-4 text-center">
          Already have account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Register;