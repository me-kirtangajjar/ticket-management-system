const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("../config/jwt");

const register = async (req, res) => {
  try {
    const { name, email, type, password } = req.body;

    const isUserExist = await User.findByEmail(email);
    if (isUserExist) {
      return res
        .status(400)
        .send({ msg: "Email is already registered, Try to login" });
    }

    const user = await User.createUser({ name, email, password, type });
    return res
      .status(201)
      .send({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findByEmail(email);
    if (!isUserExist) {
      return res.status(400).send({ msg: "Account not found, Register first" });
    }

    if (isUserExist && (await bcrypt.compare(password, isUserExist.password))) {
      const jwtPayload = { id: isUserExist.id, type: isUserExist.type };
      const token = jwt.generateToken(jwtPayload);
      return res.status(200).send({msg:"Logged in successfully", token });
    } else {
      return res.status(400).send({ msg: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Something went wrong !!!" });
  }
};

module.exports = { register, login };