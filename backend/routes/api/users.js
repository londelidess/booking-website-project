const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();
//sign up

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("username is required"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("firstName is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("lastName is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("password is required"),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res,next) => {
  const { firstName, lastName, email, username , password} = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) {
    const err = new Error("User already exists");
    err.status = 500;
    err.errors = { email: "User with that email already exists" };
    return next(err);
  }

   const existingUsername = await User.findOne({ where: { username } });
   if (existingUsername) {
     const err = new Error("User already exists");
     err.status = 500;
     err.errors = { username: "User with that username already exists" };
     return next(err);
   }

  const user = await User.create({
    email,
    hashedPassword,///
    firstName,
    lastName,
    username,
  });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

module.exports = router;
