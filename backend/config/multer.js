import multer from "multer";
import fs from "fs";

// create folders automatically if not exist
const videoDir = "uploads/videos";
const thumbDir = "uploads/thumbnails";

if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir,{recursive:true});
if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir,{recursive:true});


// storage setup
const storage = multer.diskStorage({

 destination:(req,file,cb)=>{

   if(file.mimetype.startsWith("video")){
      cb(null,videoDir);
   }else{
      cb(null,thumbDir);
   }

 },

 filename:(req,file,cb)=>{
   cb(null, Date.now()+"-"+file.originalname);
 }

});

export const upload = multer({storage});
