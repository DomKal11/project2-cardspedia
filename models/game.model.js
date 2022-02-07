const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const gameSchema = new Schema(
  {
    gameName: String,
    numberOfPlayers: number,
    numberOfDecks: number,
    instructions: String,
    rules: String,
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