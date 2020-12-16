"use strict";
import { Router } from "express";
import Users from "../models/user";
import bcrypt from "bcryptjs";

const router = Router();

/*POST for register*/
router.post("/", function (req, res) {
  //compare password and confirm password
  console.log(req.body.password);
  console.log(req.body.email);

  if (req.body.password === req.body.confirmPassword) {
    //Insert user
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      var registerUser = {
        email: req.body.email,
        password: hash,
      };
      //Check if user already exists
      Users.find({ email: registerUser.email }, function (err, user) {
        if (err) return res.send(err);
        if (user.length) return res.send("Username already exists please login.");
        const newUser = new Users(registerUser);
        newUser.save(function (err) {
          console.log("Adding User");
          if (err) return res.send(err);
          return res.send("User created successfully !");
        });
      });
    });
  } else {
    return res.send("Passwords do not match, pleas make sure they are the same.");
  }
});

module.exports = router;