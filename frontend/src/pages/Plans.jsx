import { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import axios from "axios";

const Plans = () => {

  const [loadingIndex, setLoadingIndex] = useState(null);
  const [activePlan, setActivePlan] = useState(null);

  const plans = [
    { name:"7 Days", price:"₹49", duration:"7 days", type:"basic" },
    { name:"1 Month", price:"₹149", duration:"30 days", type:"standard" },
    { name:"1 Year", price:"₹999", duration:"365 days", type:"premium" },
  ];

  // ================= LOAD USER =================
  const loadUser = async()=>{

    try{

      const token = localStorage.getItem("token");
      if(!token) return;

      const res = await axios.get(
        "http://localhost:5000/api/user/me",
        { headers:{ Authorization:`Bearer ${token}` } }
      );

      const user = res.data.user;

      // AUTO RESET IF EXPIRED
      if(user?.subscription){

        const expiry = new Date(user.subscription.expireDate);

        if(expiry > new Date()){
          setActivePlan(user.subscription.plan);
        }else{
          setActivePlan(null);
        }

      }

    }catch(err){
      console.log(err);
    }

  };

  // ================= PAGE LOAD =================
  useEffect(()=>{

    const params = new URLSearchParams(window.location.search);

    if(params.get("success")){
      alert("✅ Payment successful!");
      window.history.replaceState({}, document.title, "/plans");
    }

    if(params.get("cancel")){
      alert("❌ Payment cancelled");
      window.history.replaceState({}, document.title, "/plans");
    }

    loadUser();

  },[]);


  // ================= BUY =================
  const buyPlan = async (plan,index)=>{

    try{

      setLoadingIndex(index);

      const token = localStorage.getItem("token");

      if(!token){
        alert("Login first");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/subscription/buy",
        { plan: plan.type },
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      if(res.data.success){

        if(res.data.url){
          window.location.href = res.data.url;
        }

      }else{
        alert(res.data.msg);
      }

    }catch(err){
      alert("Server error");
      console.log(err);
    }

    finally{
      setLoadingIndex(null);
    }

  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900">

      <UserNavbar/>

      <div className="p-8">

        <h1 className="text-3xl font-bold text-white mb-10 text-center">
          Choose Your Subscription Plan
        </h1>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {plans.map((p,i)=>{

            const isActive = activePlan === p.type;

            return(

              <div key={i}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl
                ${isActive ? "ring-4 ring-green-400" : "hover:scale-105"}`}>

                <h2 className="text-2xl font-bold text-white mb-4">{p.name}</h2>

                <p className="text-4xl font-extrabold text-yellow-400 mb-4">{p.price}</p>

                <p className="text-gray-200 mb-6">Valid for {p.duration}</p>

                <button
                  onClick={()=>buyPlan(p,i)}
                  disabled={isActive || loadingIndex===i}
                  className={`px-6 py-3 rounded-lg font-bold w-full
                  ${isActive
                    ? "bg-green-500 text-white"
                    : "bg-yellow-400 text-black hover:bg-yellow-300"}`}
                >
                  {isActive
                    ? "Active Plan ✅"
                    : loadingIndex===i
                      ? "Processing..."
                      : "Buy Plan"}
                </button>

              </div>

            );

          })}

        </div>

      </div>
    </div>
  );
};

export default Plans;