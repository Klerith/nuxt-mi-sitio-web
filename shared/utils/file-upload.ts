import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

interface UploadResponse {
  success: boolean;
  result: UploadApiResponse | undefined;
}

export const fileUpload = async (fileBuffer: Buffer<ArrayBufferLike>) => {
  try {
    const uuidFileName = uuidv4();

    const uploadResult = await new Promise<UploadResponse>(
      async (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: 'image',
              public_id: uuidFileName,
              folder: 'nuxt-uploads',
            },
            (err, result) => {
              if (err) {
                console.log({ err });
                return reject({ success: false, error: err });
              }
              return resolve({ success: true, result });
            }
          )
          .end(fileBuffer);
      }
    );

    const cloudinaryPublicId = uploadResult.result!.public_id;

    if (!uploadResult.success) {
      throw new Error('Cant upload image');
    }

    const optimizeUrl = cloudinary.url(cloudinaryPublicId, {
      fetch_format: 'auto',
      quality: 'auto',
      width: 600,
      height: 400,
      crop: 'limit',
    });

    return optimizeUrl;
  } catch (error) {
    console.log({ error });
    throw new Error('Error while loading file');
  }
};
