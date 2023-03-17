const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "duzvm6old",
  api_key: "159565764129248",
  api_secret: "EF17w-S4x6Ac_jiCNiKdudPMoJQ",
});

const uploadToCloudinary = (path, folder) => {
  return cloudinary.v2.uploader
    .upload(path, {
      folder,
    })
    .then((data) => {
      return {
        url: data.url,
        public_id: data.public_id,
      };
    })
    .catch((err) => {
      console.log(err);
    });
};

const removeFromCloudinary = async (public_id) => {
  await cloudinary.v2.uploader.destroy(public_id, (err, result) => {
    console.log(result, err);
  });
};

module.exports = {
    uploadToCloudinary,removeFromCloudinary
}