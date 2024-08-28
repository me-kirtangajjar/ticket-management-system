const db = require("../config/db");
const bcrypt = require("bcrypt");

const User = {
  async createUser({ name, email, type, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO users (name, email, type, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email, type",
      [name, email, type, hashedPassword]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },
};

module.exports = User;