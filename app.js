const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const getConnection = require("./db");
app.use(express.json());
const axios = require("axios");

app.get("/db-access", async (req, res) => {
  try {
    const client = await getConnection();
    const result = await client.query("SELECT NOW()");
    console.log("Current time:", result.rows[0].now);
    res.json({ mesg: "Connected to the database", data: result.rows[0].now });
  } catch (err) {
    console.error("Error in access_db endpoint =>", err);
    res.json({ message: "Database connection failure.", error: err.message });
  }
});

app.get("/fake-data", async (req, res) => {
  try {
   const data = await getFakeData();
    res.json({ mesg: "data received", data: data });
  } catch (err) {
    console.error("Error in access_db endpoint =>", err);
    res.json({ message: "Database connection failure.", error: err.message });
  }
});
async function getFakeData() {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    console.log(`Fake json data =>`, response.data.products[0].title);
    return response.data;
  } catch (error) {
    console.error("Error fetching fake data:", error);
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
