import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//REGISTER
export const registercontroller=async(req,res)=>{
    try {

     const{name,email,password}=req.body;
    const exist=await User.findOne({email});
    if(exist) return res.json({success:false,msg:"User exists"});
     const hashed = await bcrypt.hash(password,10);
    //create user
    const user=await User.create({name,email,password:hashed})
    res.json({success:true,user});
        
    } catch (error) {
        res.json({success:false,msg:error.message})
        
    }
    


    

}
//LOGIN
export const logincontroller=async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user=await User.findOne({email});
         if(!user) return res.json({success:false,msg:"Invalid email"});
          const match = await bcrypt.compare(password,user.password);
  if(!match) return res.json({success:false,msg:"Wrong password"});

  const token = jwt.sign(
    {id:user._id},
    process.env.JWT_SECRET,
    {expiresIn:"7d"}
  );

        res.json({success:true,token,user})
        
    } catch (error) {
        res.json({success:false,msg:error.message})
        
    }

}