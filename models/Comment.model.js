const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const commentSchema = new Schema(
  {
    content: String,
    author: [{ type: Schema.Types.ObjectId, ref: "User" }],
    game: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("Comment", commentSchema);

module.exports = Comment;
