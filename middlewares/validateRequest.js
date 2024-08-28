const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ msg: result.array()[0].msg });
  }
  next();
};

module.exports = { validateRequest };