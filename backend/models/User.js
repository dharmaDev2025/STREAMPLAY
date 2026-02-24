import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true
  },

  subscription: {
    plan: { type: String, default: "free" }, // free, premium
    startDate: { type: Date },
    expireDate: { type: Date },
    status: { type: String, default: "inactive" } // active, inactive
},

  expiryDate:{
    type:Date
  }

},{timestamps:true});

export default mongoose.model("User",userSchema);