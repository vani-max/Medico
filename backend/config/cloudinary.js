import { v2 as cloudinary } from "cloudinary";

const connect = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.COUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRETKEY,
  });
};

export default connect;