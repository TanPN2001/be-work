const Image = require("../models/Image.model");
const { uploadToCloudinary } = require("./cloudinary");
const  UploadImg = async (file) => {
  try {
    const data = await uploadToCloudinary(file.path, "photos");
    
    return data.url;
  } catch (error) {
    return error;
  }
}

module.exports = UploadImg;
