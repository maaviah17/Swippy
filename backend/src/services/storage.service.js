const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

async function uploadVideo(fileBuffer, fileName) {
  try {
    const result = await imagekit.upload({
      file: fileBuffer,       
      fileName: fileName,
      folder: "/foods",
    });
    return result;
  } catch (error) {
    throw new Error("File upload failed: " + error.message);
  }
}

module.exports = { uploadVideo };