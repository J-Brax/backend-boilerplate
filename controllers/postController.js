import Post from '../models/postModel.js';
import cloudinary from '../configs/cloudinary.js';
const create = async (req, res) => {
  try {
    const { title, content } = req.body;
    const files = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = `data:${file.mimetype};base64,${b64}`;
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'posts',
          resource_type: 'auto',
        });
        files.push({
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
        });
      }
    }
    const post = await Post.create({
      title,
      content,
      files,
    });
    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export { create };
