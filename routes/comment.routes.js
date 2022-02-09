const router = require("express").Router();
const User = require("../models/User.model");
const Game = require("../models/Game.model");
const Comment = require("../models/Comment.model");

const {isLoggedIn} = require("../middleware/route-guards");

//POST route for adding comments to games
router.post("/comment/:gameId/add", (req, res, next) => {
    const {gameId} = req.params;
    let userId = req.session.user._id;
    const {content} = req.body;

    let newComment = new Comment({content, author: userId});

    newComment.save()
    .then(savedComment => {
        Game.findByIdAndUpdate(gameId, { $push: {comments: savedComment._id} })
        .then(res.redirect(`/game-details/${gameId}`));
    })
    .catch(err => {
        console.log(`Error while creating comment: ${err}`);
        next(err);
    })
});


module.exports = router;