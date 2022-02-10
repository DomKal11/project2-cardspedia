const router = require("express").Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");

const fileUploader = require("../config/cloudinary.config");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guards.js");

router.get("/userProfile", isLoggedIn, (req, res) => {
  const userId = req.session.user._id;
  User.findById(userId)
    .then((userInSession) => res.render("user/profile", { userInSession }))
    .catch((error) =>
      console.log(`Error while getting a single movie for edit: ${error}`)
    );
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => res.render("user/detail", { user }))
    .catch((error) =>
      console.log(`Error while getting a single movie for edit: ${error}`)
    );
});

router.get("/changeUserPic", isLoggedIn, (req, res) => {
  const userId = req.session.user._id;
  User.findById(userId)
    .then((userInSession) =>
      res.render("user/change-picture", { userInSession })
    )
    .catch((error) =>
      console.log(`Error while getting a single movie for edit: ${error}`)
    );
});

router.post(
  "/changeUserPic/:id",
  isLoggedIn,
  fileUploader.single("profile-pic"),
  (req, res) => {
    const { id } = req.params;
    User.findByIdAndUpdate(id, { picture: req.file.path }, { new: true })
      .then(() => res.redirect(`/userProfile`))
      .catch((error) =>
        console.log(`Error while updating a single movie: ${error}`)
      );
  }
);

router.get("/users", (req, res) => {
  let page;
  if (req.query.page) {
    page = req.query.page;
    console.log(page);
  } else {
    page = 1;
  } //?page= parameter from URL

  const pages = [];

  let length;
  User.find().then((usersFromDB) => {
    length = Math.ceil(usersFromDB.length / 6);
    for (let i = 0; i < length; i++) {
      pages.push(i + 1);
    }
    return pages;
  });

  User.find()
    .skip((page - 1) * 6)
    .limit(6)
    .sort("-createdAt")
    .then((usersFromDB) => {
      let admin = req.session.user.admin;
      console.log(admin)
      res.render("user/list.hbs", { users: usersFromDB, pages, page, admin });
    })
    .catch((err) =>
      console.log(`Error while getting the movies from the DB: ${err}`)
    );
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

router.post("/user/:id/delete", isLoggedIn, (req, res, next) => {
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
