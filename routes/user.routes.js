const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");

const bcrypt = require("bcrypt");

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
      password:hashPassword,
    });
    res.json(newUser);
  }
);

module.exports = router;
