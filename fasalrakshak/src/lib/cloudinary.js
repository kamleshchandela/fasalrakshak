const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Uploads a compressed image (File or Blob) to Cloudinary
 * using unsigned upload.
 * 
 * @param {File|Blob} file 
 * @returns {Promise<{ imageUrl: string, thumbnailUrl: string }>}
 */
export const uploadToCloudinary = async (file) => {
  if (!CLOUD_NAME || CLOUD_NAME === 'your_cloud_name') {
    throw new Error("Missing Cloudinary Cloud Name in .env");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET || "fasalrakshak_scans");

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to upload image");
    }

    // The data contains secure_url.
    // Cloudinary can generate on-the-fly thumbnails by appending transformations 
    // to the URL path. Example: /upload/w_200,h_200,c_fill/v1234/file.jpg
    const imageUrl = data.secure_url;
    
    // Auto generate thumbnail URL
    const uploadIndex = imageUrl.indexOf('/upload/') + 8;
    const thumbnailUrl = imageUrl.substring(0, uploadIndex) + 'w_200,h_200,c_thumb/' + imageUrl.substring(uploadIndex);

    return {
      imageUrl,
      thumbnailUrl
    };

  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Image upload failed: " + error.message);
  }
};
