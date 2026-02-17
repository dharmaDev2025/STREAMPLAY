import express from 'express';
import { upload } from "../config/multer.js";
const videorouter=express.Router();



videorouter.post(
 "/upload",
 upload.fields([
   {name:"video",maxCount:1},
   {name:"thumbnail",maxCount:1}
 ]),
 uploadVideo
);
