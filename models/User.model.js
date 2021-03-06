const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    birthdate: Date,
    about: String,
    admin: {
      type: Boolean,
      default: false,
    },
    password: String,
    games: [{ type: Schema.Types.ObjectId, ref: "Game" }],
    favourites: [{ type: Schema.Types.ObjectId, ref: "Game" }],
    picture: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
