const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 3 }),

  async (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res
        .status(400)
        .json({ err: err.array(), message: "Invalid Data" });
    }

    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    res.json(newUser);
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 3 }),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({
        err: err.array(),
        message: "invalid Data",
      });
    }

    const { username, password } = req.body;
    const user = await userModel.findOne({
      username: username
    });

    if (!user) {
      return res.status(400).json({
        message: "Username or password is wrong",
      });
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({
            message:"username or password is incorrect"
        })
    }


    const token = jwt.sign({
        userId : user._id,
        email : user.email,
        username : user.username
    },process.env.JWT_SECRET)

    res.cookie('token',token);
    res.send('Logged in successfully');
}
);

module.exports = router;
