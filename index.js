const express = require("express");
const app = express();
require("dotenv").config();


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());

app.use("/api/dropservicing/", require("./routes/dropservicing/webinarjam"));

app.use((err, req, res, next) => {
  res.status(500).json({ status: "error", message: err.message, err });
});
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "404 route not found" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
