//Declare required connections
const router = require("express").Router();
const User = require("../models/User.model");
const Game = require("../models/Game.model");

const {isLoggedIn} = require("../middleware/route-guards");


//spades (♤), diamonds (♢), clubs (♧) and hearts (♡) --useful for card suits

//GET route for create-game
router.get('/create-game', isLoggedIn, (req,res,next) => {
    User.findById(req.session.user)
    .then((returnedUser) => {
        res.render("game/create-game", {user: returnedUser});
    })
    .catch((err) => console.log(`Err while displaying create game page: ${err}`));
});

//POST route for create game
router.post('/create-game', (req,res,next) => {
    const { gameName, numberOfPlayers, numberOfDecks, instructions, rules, createdBy } = req.body;

    if (!gameName || !numberOfPlayers || !numberOfDecks || !instructions || !rules || !createdBy) {
        res.render('game/create-game', { errorMessage: "Please make sure you complete all fields before submitting your game"});
        return;
    } 

    Game.create({gameName, numberOfPlayers, numberOfDecks, instructions, rules, createdBy }) 
    .then((newGame) => {
       User.findByIdAndUpdate(createdBy, { $push: {games: newGame._id} });
       res.redirect(`/game-details/${newGame._id}`);
    })
    .catch((err) => console.log(`Err while creating game: ${err}`));
});

//GET route for game details
router.get('/game-details/:gameId', (req,res,next) => {
    const { gameId } = req.params;

    Game.findById(gameId)
    .populate('comments') //this part is to return both the comments and username of the commentor 
    .populate({
        path: 'comments',
        populate: {
            path: 'author',
            model: 'User'
        }
    })
    .then((gameDetails) => {
        res.render('game/game-details', {game: gameDetails});
    })
    .catch((err) => console.log(`Err while creating game: ${err}`));    
})


//GET route for update game details
router.get('/update-game/:gameId', isLoggedIn, (req, res, next) => {
    const { gameId } = req.params;

    Game.findById(gameId)
    .then((gameDetails) => res.render('game/update-game', {game: gameDetails}))
    .catch((err) => console.log(`Err while rendering update-game page: ${err}`));    
})

//POST route for editing game details
router.post('/update-game/:gameId', isLoggedIn, (req,res,next) => {
    console.log(req.params);
    const {gameId} = req.params;
    const {gameName, numberOfPlayers, numberOfDecks, instructions, rules} = req.body;

    Game.findByIdAndUpdate(gameId, {gameName, numberOfPlayers, numberOfDecks, instructions, rules }, { new: true })
    .then((gameDetails) => res.redirect(`/game-details/${gameDetails._id}`))
    .catch((err) => console.log(`Err while updating game: ${err}`));    
})

//POST route for deleting a game
router.post('/delete-game/:gameId', (req,res,next) => {
    const {gameId} = req.params;
    console.log('called ok');
    Game.findByIdAndRemove(gameId)
    .then(() => res.redirect('/game-library'))
    .catch((err) => console.log(`Err while removing game: ${err}`));    
})

//GET route for Games Library Page
router.get('/game-library', (req,res,next) => {
    res.render('game/game-library');
})

//GET route for voting for game
router.get("/game/:gameId/vote", isLoggedIn, (req,res,next) => {
    const {gameId} = req.params;
    
    Game.findByIdAndUpdate(gameId, { $inc: { numberOfVotes: 1 }}, {new: true}) //increment by one vote each time it is pressed
    .then(() => res.redirect(`/game-details/${gameId}`))
    .catch((err) => console.log(`Err while updating votes: ${err}`)); 
})


//GET route for add to favourites
router.get("/game/:gameId/add-to-favourites", isLoggedIn, (req,res,next) => {
    const {gameId} = req.params;
      
    User.findByIdAndUpdate(req.session.user._id, { $push: {favourites: gameId} })
    .then(() => res.redirect(`/game-details/${gameId}`))
    .catch((err) => console.log(`Err while adding game to favourites: ${err}`)); 
})




module.exports = router;