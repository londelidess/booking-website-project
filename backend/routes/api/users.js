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
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username")
    .not()
    .isEmail()
    .withMessage("Username cannot be an email."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a provide a first name."),
  check("firstName")
    .not()
    .isEmail()
    .withMessage("A first name cannot be an email."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a provide a last name."),
  check("lastName")
    .not()
    .isEmail()
    .withMessage("A last name cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("", validateSignup, async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email,
    password,
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