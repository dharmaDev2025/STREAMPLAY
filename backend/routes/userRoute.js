import express from 'express'
import { logincontroller, registercontroller } from '../controllers/UserController.js';


const userrouter=express.Router();

userrouter.post('/register',registercontroller)
userrouter.post('/login',logincontroller)
export default userrouter;