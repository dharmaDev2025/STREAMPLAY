import express from 'express'
import { logincontroller, registercontroller,getMe } from '../controllers/UserController.js';
import auth from '../middleware/auth.js';

const userrouter=express.Router();

userrouter.post('/register',registercontroller)
userrouter.post('/login',logincontroller)
userrouter.get("/me", auth, getMe);
export default userrouter;