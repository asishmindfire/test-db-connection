const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const getConnection = require("./db");
app.use(express.json());

app.get("/db-access", async (req, res) => {
  try {
    const client = await getConnection();
    const result = await client.query("SELECT NOW()");
    console.log("Current time:", result.rows[0].now);
    res.json({ mesg: "Connected to the database", data: result.rows[0].now });
  } catch (err) {
    console.error("Error in access_db endpoint =>", err);
    res.json({ message: "Database connection failed.", error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
