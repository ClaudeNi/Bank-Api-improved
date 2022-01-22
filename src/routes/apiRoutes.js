const express = require("express");
const {
    getUser,
    addUser,
    getAllUsers,
    withdraw,
    deposit,
    transfer,
} = require("../controllers/userControllers");

const apiRouter = express.Router();
//!GET Methods
apiRouter.get("/users/:id", getUser);
apiRouter.get("/users", getAllUsers);
//!POST Methods
apiRouter.post("/users", addUser);
//!PATCH Methods
apiRouter.patch("/users/withdraw", withdraw);
apiRouter.patch("/users/deposit", deposit);
apiRouter.patch("/users/transfer", transfer);

module.exports = apiRouter;
