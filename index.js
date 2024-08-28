const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

app.use("/api", require("./routes/route"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});