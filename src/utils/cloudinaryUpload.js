import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadSingleImage = async (
    localFilePath,
    folder = "hotel-management"
) => {

    try {

        if (!localFilePath) return null;

        const response =
            await cloudinary.uploader.upload(
                localFilePath,
                {
                    folder,
                    resource_type: "image"
                }
            );

        fs.unlinkSync(localFilePath);

        return {
            public_id: response.public_id,
            url: response.secure_url
        };

    } catch (error) {

        if (
            localFilePath &&
            fs.existsSync(localFilePath)
        ) {
            fs.unlinkSync(localFilePath);
        }

        throw error;
    }
};

const uploadMultipleImages = async (
    files,
    folder = "hotel-management"
) => {

    if (!files?.length) return [];

    const uploads =
        await Promise.all(
            files.map((file) =>
                uploadSingleImage(
                    file.path,
                    folder
                )
            )
        );

    return uploads;
};

const deleteImage = async (
    publicId
) => {

    if (!publicId) return;

    await cloudinary.uploader.destroy(
        publicId
    );
};

export {
    uploadSingleImage,
    uploadMultipleImages,
    deleteImage
};