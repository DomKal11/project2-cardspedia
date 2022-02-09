const { Schema, model } = require("mongoose");

//test-comment
// TODO: Please make sure you edit the user model to whatever makes sense in this case
const gameSchema = new Schema(
  {
    gameName: String,
    numberOfPlayers: Number,
    numberOfDecks: Number,
    instructions: String,
    rules: String,
    numberOfVotes: {type: Number, default: 0},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Game = model("Game", gameSchema);

module.exports = Game;