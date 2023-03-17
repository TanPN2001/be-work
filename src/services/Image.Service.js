const Image = require("../models/Image.model");
const { uploadToCloudinary } = require("./cloudinary");
const  UploadImg = async (file) => {
  try {
    const data = await uploadToCloudinary(file.path, "photos");
    const image = new Image({
      name: "tan",
      data: data.url,
      publicId: data.public_id,
    });

    await image.save()
    return image;
  } catch (error) {
    return error;
  }
}

module.exports = UploadImg;
