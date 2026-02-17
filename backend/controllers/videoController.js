import Video from "../models/Video.js";



//upload video
export const uploadVideo=async(req,res)=>{
    try {
         const videoFile = req.files.video[0].filename;
        const thumb = req.files.thumbnail[0].filename;
        const video=await Video.create({
        title:req.body.title,
      description:req.body.description,
      subscription:req.body.subscription,
      videoUrl:videoFile,
      thumbnail:thumb
        });


          res.json({success:true,video});


        
    } catch (error) {
        res.json({success:false,msg:error.message})
        
    }

}

//get all videos
export const getallVideo=async(req,res)=>{

    try {
           const videos = await Video.find().sort({createdAt:-1});
             res.json({success:true,videos});
        
    } catch (error) {
          res.json({success:false,msg:error.message});
        
    }
}

//search video 
export const searchVideo = async(req,res)=>{

 try{

   const keyword = req.query.q || "";

   const videos = await Video.find({
     title:{$regex:keyword,$options:"i"}
   });

   res.json({success:true,videos});

 }catch(err){
   res.json({success:false,msg:error.message});
 }

};


//watch video
export const watchVideo = async(req,res)=>{

 try{

   const video = await Video.findById(req.params.id);

   if(!video)
     return res.json({success:false,msg:"Video not found"});

   if(video.subscription==="premium" && req.user.plan!=="premium"){
      return res.json({success:false,msg:"Buy premium to watch"});
   }

   res.json({success:true,video});

 }catch(err){
   res.json({success:false,msg:error.message});
 }

};