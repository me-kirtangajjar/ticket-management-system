const { checkExact, body } = require("express-validator");

const validateUserRegistration = checkExact([
  body("name").notEmpty().withMessage("Please provide a name"),
  body("email")
    .notEmpty()
    .withMessage("Please provide a email")
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("type")
    .notEmpty()
    .withMessage("Please provide a type")
    .isIn(["customer", "admin"])
    .withMessage("Type must be either customer or admin"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter"),
]);

const validateUserLogin = checkExact([
  body("email")
    .notEmpty()
    .withMessage("Please provide a email")
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Please provide a password"),
]);

module.exports = { validateUserRegistration, validateUserLogin };