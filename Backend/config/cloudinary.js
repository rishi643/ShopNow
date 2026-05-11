import {v2 as cloudinary} from "cloudinary";

const connectCloudinary = async ()=>{
cloudinary.config({
    cloud_name:process.env.CLOUNARY_NAME,
    api_key:process.env.CLOUDNARY_API_KEY ,
    api_secret:process.env.CLOUNARY_SECRET_KEY
});
}

export default connectCloudinary;