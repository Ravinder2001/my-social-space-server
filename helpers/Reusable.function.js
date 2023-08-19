const sharp = require("sharp");
const { Image_Link } = require("../s3_bucket.config");
const { default: axios } = require("axios");

const getImageUrls = async (data) => {
  const imagePromises = data.map(async (item) => {
    const profile_url = await Image_Link(item.profile_picture);
    item.profile_picture = profile_url;

    if (item.images.length) {
      const imageUrls = await Promise.all(
        item.images.map(async (image) => {
          const url = await Image_Link(image.image_url);
          const dimensions = await getImageDimensions(url);

          delete image.image_url;
          image.src = url;
          image.width = +(dimensions.width / dimensions.height).toFixed(2);
          image.height = +(dimensions.height / dimensions.width).toFixed(2);

          return image;
        })
      );
      item.images = imageUrls;
    }

    return item;
  });

  return Promise.all(imagePromises);
};
const getImageDimensions = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const imageBuffer = Buffer.from(response.data);
    const imageInfo = await sharp(imageBuffer).metadata();
    const { width, height } = imageInfo;

    const aspectRatio = width / height;

    return { width, height, aspectRatio };
  } catch (error) {
    // Handle error if the image dimensions cannot be retrieved
    console.error("Failed to retrieve image dimensions:", error);
    throw error;
  }
};

module.exports = { getImageUrls, getImageDimensions };
