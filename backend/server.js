import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import "dotenv/config"
import { connectDB } from './config/db.js';
import userrouter from './routes/userRoute.js';


const app=express();
app.use(cors());
app.use(express.json());
//data base connectiobn
connectDB();
app.get("/", (req,res)=>{
    res.send("API Running");
});
//routes
app.use('/api/user',userrouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
