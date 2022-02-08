//Declare required connections
const router = require("express").Router();
const User = require("../models/User.model");
const Game = require("../models/Game.model");

const {isLoggedIn} = require("../middleware/route-guards")

//GET route for create-game
//router.get('/create-game', isLoggedIn, (req,res,next) => {
router.get('/create-game', (req,res,next) => {
    User.findById(req.session.user.id)
    .then((returnedUser) => {
        res.render("game/create-game", {user: returnedUser});
    })
    .catch((err) => console.log(`Err while displaying create game page: ${err}`));
});

//POST route for create game
router.post('/create-game', (req,res,next) => {
    const { gameName, numberOfPlayers, numberOfDecks, instructions, rules, createdBy } = req.body;

    Game.create({gameName, numberOfPlayers, numberOfDecks, instructions, rules }) //need to add created by once user CRUD setup
    .then((newGame) => {
       return User.findByIdAndUpdate(createdBy, { $push: {games: newGame.createdBy} });
    })
    //.then((newGame) => res.redirect(`/game-details/${newGame._id}`))
    .then(() => res.redirect('/game-details'))
    .catch((err) => console.log(`Err while creating game: ${err}`));
});

//GET route for game details
router.get('/game-details', (req,res,next) => {
    res.render('game/game-details');
})

module.exports = router;