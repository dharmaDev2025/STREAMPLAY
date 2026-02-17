import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({

  title:String,
  description:String,
  videoUrl:String,
  thumbnail:String,

  subscription:{
    type:String,
    default:"free"
  }

},{timestamps:true});

export default mongoose.model("Video", videoSchema);
