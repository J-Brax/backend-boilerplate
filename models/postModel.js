import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  files: [
    {
      url: String,
      publicId: String,
      format: String,
    },
  ],
});
const Post = mongoose.model("post", schema);
export default Post;
