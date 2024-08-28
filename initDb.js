const db = require("./config/db");

const initDb = async () => {
  try {
    await db.query(`
      CREATE TYPE user_type AS ENUM ('customer', 'admin');

      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        type user_type
      );

      CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        type VARCHAR(50),
        venue VARCHAR(255),
        status VARCHAR(50),
        price DECIMAL,
        priority VARCHAR(50),
        dueDate TIMESTAMP,
        createdBy INTEGER REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS ticket_assignments (
        id SERIAL PRIMARY KEY,
        ticketId INTEGER REFERENCES tickets(id),
        userId INTEGER REFERENCES users(id)
      );
    `);
    console.log("Database initialized");
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Something went wrong !!!" });
  }
};

initDb();

// node initDb.js