//Declare required connections
const router = require("express").Router();
const User = require("../models/User.model");
const Game = require("../models/Game.model");

const { isLoggedIn } = require("../middleware/route-guards");

//spades (♤), diamonds (♢), clubs (♧) and hearts (♡) --useful for card suits

//GET route for create-game
router.get("/create-game", isLoggedIn, (req, res, next) => {
  User.findById(req.session.user)
    .then((returnedUser) => {
      res.render("game/create-game", { user: returnedUser });
    })
    .catch((err) =>
      console.log(`Err while displaying create game page: ${err}`)
    );
});

//POST route for create game
router.post("/create-game", (req, res, next) => {
  const {
    gameName,
    numberOfPlayers,
    numberOfDecks,
    instructions,
    rules,
    createdBy,
  } = req.body;

  if (
    !gameName ||
    !numberOfPlayers ||
    !numberOfDecks ||
    !instructions ||
    !rules ||
    !createdBy
  ) {
    res.render("game/create-game", {
      errorMessage:
        "Please make sure you complete all fields before submitting your game",
    });
    return;
  }

  Game.create({
    gameName,
    numberOfPlayers,
    numberOfDecks,
    instructions,
    rules,
    createdBy,
  })
    .then((newGame) => {
      User.findByIdAndUpdate(createdBy, { $push: { games: newGame._id } });
      res.redirect(`/game-details/${newGame._id}`);
    })
    .catch((err) => console.log(`Err while creating game: ${err}`));
});

//GET route for game details
router.get("/game-details/:gameId", (req, res, next) => {
  const { gameId } = req.params;
  const  author = 1;

  Game.findById(gameId)
    .populate("comments") //this part is to return both the comments and username of the commentor
    .populate({
      path: "comments",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .then((gameDetails) => {
      const gId = gameDetails.createdBy._id.toString();
            
      if(!req.session.user || gId !== req.session.user._id) { //provide test for edit and delete buttons for author only
        res.render("game/game-details", { game: gameDetails})
       } else {
        res.render("game/game-details", { game: gameDetails, author: author })   
       }
    })
    .catch((err) => console.log(`Err while creating game: ${err}`));
});

//GET route for update game details
router.get("/update-game/:gameId", isLoggedIn, (req, res, next) => {
  const { gameId } = req.params;
    
  Game.findById(gameId)
    .then((gameDetails) => {
        res.render("game/update-game", { game: gameDetails })   
       })
    .catch((err) =>
      console.log(`Err while rendering update-game page: ${err}`)
    );
});


//POST route for editing game details
router.post("/update-game/:gameId", isLoggedIn, (req, res, next) => {
  console.log(req.params);
  const { gameId } = req.params;
  const { gameName, numberOfPlayers, numberOfDecks, instructions, rules } =
    req.body;

  Game.findByIdAndUpdate(
    gameId,
    { gameName, numberOfPlayers, numberOfDecks, instructions, rules },
    { new: true }
  )
    .then((gameDetails) => res.redirect(`/game-details/${gameDetails._id}`))
    .catch((err) => console.log(`Err while updating game: ${err}`));
});

//POST route for deleting a game
router.post("/delete-game/:gameId", isLoggedIn, (req, res, next) => {
  const { gameId } = req.params;
  
  Game.findByIdAndRemove(gameId)
    .then(() => res.redirect("/game-library"))
    .catch((err) => console.log(`Err while removing game: ${err}`));
});

//GET route for Games Library Page
router.get("/game-library", (req, res, next) => {
  let page;
  if (req.query.page) {
    page = req.query.page;
  } else {
    page = 1;
  } //?page= parameter from URL

  const pages = [];

  let length;
  Game.find().then((gamesFromDB) => {
    length = Math.ceil(gamesFromDB.length / 6);
    for (let i = 0; i < length; i++) {
      pages.push(i + 1);
    }
    return pages;
  });
  Game.find()
    .populate("createdBy")
    .skip((page - 1) * 6)
    .limit(6)
    .sort("-createdAt")
    .then((gamesFromDB) => {
      console.log(length);
      res.render("game/game-library", { games: gamesFromDB, pages, page });
    })
    .catch((err) =>
      console.log(`Error while getting the movies from the DB: ${err}`)
    );
});

//GET route for Games Library - My Games (user)
router.get("/game-library/:id/my-games", (req, res, next) => {
    const { id } = req.params;
    let page;
    if (req.query.page) {
      page = req.query.page;
    } else {
      page = 1;
    } //?page= parameter from URL
  
    const pages = [];
  
    let length;
    Game.find({ createdBy: id })
    .then((gamesFromDB) => {
      if(gamesFromDB){
          length = Math.ceil(gamesFromDB.length / 6);
      for (let i = 0; i < length; i++) {
        pages.push(i + 1);
      }
      return pages;
    }
    })
    .catch((err) =>
        console.log(`Error while getting the movies from the DB: ${err}`)
      );

      Game.find({ createdBy: id })
      .populate("createdBy")
      .skip((page - 1) * 6)
      .limit(6)
      .sort("-createdAt")
      .then((gamesFromDB) => {
        console.log(length);
        res.render("game/my-games", { games: gamesFromDB, pages, page });
      })
      .catch((err) =>
        console.log(`Error while getting the movies from the DB: ${err}`)
      );
  });

//GET route for voting for game
router.get("/game/:gameId/vote", isLoggedIn, (req, res, next) => {
  const { gameId } = req.params;

  Game.findByIdAndUpdate(gameId, { $inc: { numberOfVotes: 1 } }, { new: true }) //increment by one vote each time it is pressed
    .then(() => res.redirect(`/game-details/${gameId}`))
    .catch((err) => console.log(`Err while updating votes: ${err}`));
});

//GET route for add to favourites
router.get("/game/:gameId/add-to-favourites", isLoggedIn, (req, res, next) => {
  const { gameId } = req.params;

  User.findByIdAndUpdate(req.session.user._id, {
    $push: { favourites: gameId },
  })
    .then(() => res.redirect(`/game-details/${gameId}`))
    .catch((err) => console.log(`Err while adding game to favourites: ${err}`));
});


//GET route for random game
router.get("/random-game", (req,res,next) => {
  let randomNumber = 0;

  Game.countDocuments()
  .then(numberOfGames => {
    randomNumber = Math.floor(Math.random() * numberOfGames)
  })
  .then(() => {
    Game.findOne().skip(randomNumber).exec(
      function (err, randomGame) {
        res.redirect(`/game-details/${randomGame._id}`);
      });
  })
  .catch((err) => console.log(`Err while finding random game: ${err}`));
})


//GET route for ranked games by votes
router.get("/ranked-by-votes", (req,res,next) => {
  let page;
  if (req.query.page) {
    page = req.query.page;
  } else {
    page = 1;
  } //?page= parameter from URL

  const pages = [];

  let length;
  Game.find().then((gamesFromDB) => {
    length = Math.ceil(gamesFromDB.length / 6);
    for (let i = 0; i < length; i++) {
      pages.push(i + 1);
    }
    return pages;
  });
  Game.find()
    .populate("createdBy")
    .skip((page - 1) * 6)
    .limit(6)
    .sort({"numberOfVotes": -1})
    .then((gamesFromDB) => {
      console.log(length);
      res.render("game/game-library", { games: gamesFromDB, pages, page });
    })
    .catch((err) =>
      console.log(`Error while getting the movies from the DB: ${err}`)
    );
})



/*//temp store in case needed
//GET route for 'My favourites'
router.get("/my-favourites", (req,res,next) => {
  let page;
  if (req.query.page) {
    page = req.query.page;
  } else {
    page = 1;
  } //?page= parameter from URL

  const pages = [];

  let length;
  User.findById("62026e332c16bd8fb8f4b0a3").then((userFromDB) => {
    length = Math.ceil(userFromDB.favourites.length / 6);
    for (let i = 0; i < length; i++) {
      pages.push(i + 1);
    }
    return pages;
  });

  User.findById("62026e332c16bd8fb8f4b0a3")
    .populate("favourites")
    .skip((page - 1) * 6)
    .limit(6)
    .sort({"createdAt": -1})
    .then((gamesFromDB) => {
      console.log(length);
      console.log(gamesFromDB.favourites)
      res.render("game/game-library", { games: gamesFromDB, pages, page });
    })
    .catch((err) =>
      console.log(`Error while getting the movies from the DB: ${err}`)
    );
})
*/





module.exports = router;
