import stripe from "../config/stripe.js";
import User from "../models/User.js";
import { sendEmail } from "../config/nodemailer.js";

// ================= BUY SUBSCRIPTION =================
export const buySubscription = async (req, res) => {

  try {

    console.log("🔥 BUY API HIT");

    // ================= SAFE TOKEN USER =================
    if(!req.user || !req.user._id){
      return res.status(401).json({
        success:false,
        msg:"Unauthorized"
      });
    }

    const { plan } = req.body;
    const userId = req.user._id;

    if (!plan){
      return res.status(400).json({
        success:false,
        msg:"Plan required"
      });
    }

    // ================= PRICE =================
    let price = 0;

    if (plan === "basic") price = 4900;
    else if (plan === "standard") price = 14900;
    else if (plan === "premium") price = 99900;
    else return res.json({success:false,msg:"Invalid plan"});

    // ================= GET USER =================
    const user = await User.findById(userId);

    if (!user){
      return res.status(404).json({
        success:false,
        msg:"User not found"
      });
    }

    console.log("👤 USER:", user.email);

    // ====================================================
    // BLOCK IF ACTIVE SUBSCRIPTION
    // ====================================================
    if(
      user.subscription?.status === "active" &&
      new Date(user.subscription.expireDate) > new Date()
    ){
      return res.json({
        success:false,
        msg:`Active ${user.subscription.plan} plan until ${new Date(user.subscription.expireDate).toDateString()}`
      });
    }

    // ================= CREATE STRIPE SESSION =================
    const session = await stripe.checkout.sessions.create({

      payment_method_types:["card"],

      line_items:[
        {
          price_data:{
            currency:"inr",
            product_data:{ name:`${plan} subscription` },
            unit_amount:price,
          },
          quantity:1,
        },
      ],

      mode:"payment",

      success_url:`http://localhost:5173/plans?success=true&plan=${plan}`,
      cancel_url:`http://localhost:5173/plans?cancel=true`,

      metadata:{
        userId:userId.toString(),
        subscriptionType:plan,
        userEmail:user.email
      }

    });

    console.log("✅ STRIPE SESSION:", session.url);

    // ====================================================
    // ⭐ TEMP LOCAL AUTO ACTIVATE (FOR TESTING ONLY)
    // remove this later when using webhook
    // ====================================================

    const startDate = new Date();
    const expireDate = new Date();

    if (plan === "premium")
      expireDate.setFullYear(expireDate.getFullYear()+1);
    else if (plan === "basic")
      expireDate.setDate(expireDate.getDate()+7);
    else
      expireDate.setMonth(expireDate.getMonth()+1);

    await User.findByIdAndUpdate(
      userId,
      {
        subscription:{
          plan,
          startDate,
          expireDate,
          status:"active"
        }
      }
    );

    console.log("🟢 DB UPDATED");

    // ================= EMAIL =================
    await sendEmail(
      user.email,
      "STREAMPLAY Subscription Activated ✅",
      `Hello ${user.name},

Your subscription is ACTIVE

Plan: ${plan}
Expiry: ${expireDate.toDateString()}

Enjoy streaming!`
    );

    res.json({
      success:true,
      url:session.url
    });

  }
  catch(err){

    console.log("❌ BUY ERROR:", err);

    res.status(500).json({
      success:false,
      msg:err.message
    });

  }
};