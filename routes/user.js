const router = require("express").Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guards.js");

router.get("/userProfile", isLoggedIn, (req, res) => {
  const userId = req.session.user._id;
  User.findById(userId)
    .then((userInSession) => res.render("user/profile", { userInSession }))
    .catch((error) =>
      console.log(`Error while getting a single movie for edit: ${error}`)
    );
});

router.get('/users/:page', (req, res) => {
  const { page } = req.params;

  let length;
  User.find()
  .then(usersFromDB => {
    return length = usersFromDB.length;
  })
  User.find()
  .skip( (page-1)*3 )
  .limit( 3 )
  .sort( '-createdAt' )
    .then(usersFromDB => {
      console.log(length);
      res.render('user/list.hbs', { users: usersFromDB, length });
    })
    .catch(err => console.log(`Error while getting the movies from the DB: ${err}`));
});

router.get("/user/:id/edit", isLoggedIn, (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((userToEdit) => res.render("user/update", userToEdit))
    .catch((error) =>
      console.log(`Error while getting a single movie for edit: ${error}`)
    );
});

router.post("/user/:id/edit", isLoggedIn, (req, res) => {
  const { id } = req.params;
  const { username, birthdate, about } = req.body;
  User.findByIdAndUpdate(id, { username, birthdate, about }, { new: true })
    .then(() => res.redirect(`/userProfile`))
    .catch((error) =>
      console.log(`Error while updating a single movie: ${error}`)
    );
});

router.post("/user/:id/delete", (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then(() => {
      req.session.destroy((err) => {
        if (err) next(err);
        res.redirect("/");
      });
    })
    .catch((error) => next(error));
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

module.exports = router;
