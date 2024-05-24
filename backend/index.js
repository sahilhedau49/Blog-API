const express = require("express");
const cors = require("cors");
const router = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Welcome to blogs API.");
});

app.use("/posts", router);

app.listen(PORT, () => {
  console.log("Connected to backend");
});
