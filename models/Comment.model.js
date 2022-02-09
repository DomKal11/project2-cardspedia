const { Schema, model } = require("mongoose");

//declare commentSchema
const commentSchema = new Schema(
  {
    content: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
