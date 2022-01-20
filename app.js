const express = require("express");
require("./src/db/mongoose");
const apiRouter = require("./src/routes/apiRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

app.use(express.json());
app.use("/api", apiRouter);

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "client/build");

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});
